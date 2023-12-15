import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../services/validation.service.js";
import {
  getUserByEmail,
  getUserById,
  updateUserToVerified,
  createUser,
  updatePasswordByUserId,
} from "../services/user.service.js";
import { sendEmail } from "../services/email.service.js";
import {
  createAccessToken,
  createRefreshToken,
  deleteRefreshtoken,
  saveRefreshToken,
  verifyRefreshToken,
  getRefreshToken,
} from "../services/jwt.services.js";
import { BCRYPT_COST_FACTOR } from "../constants.js";

const signup = async (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  const { firstName, lastName, email, password, dateOfBirth, gender } =
    req.body;

  try {
    const userExist = await getUserByEmail(email);
    if (userExist) {
      return next(ApiError.conflict("User Already Exists"));
    }
  } catch (error) {
    return next(error);
  }

  const hashedPassword = await bcrypt.hash(password, BCRYPT_COST_FACTOR);

  try {
    const createdUser = await createUser(
      firstName,
      lastName,
      email,
      hashedPassword,
      dateOfBirth,
      gender
    );

    const newUser = await getUserById(createdUser.id);

    const tokenForEmail = await createRefreshToken(createdUser.id);

    const emailSubject = "Verify Email";
    const emailText = `Hi! There, You have recently visited 
    our Social Network website and entered your email.
    Please follow the given link to verify your email
    ${process.env.CLIENT_URL}/verify-email?token=${tokenForEmail}&verifiedFor=signup
    Thanks`;

    await sendEmail(email, emailSubject, emailText);

    return res
      .status(201)
      .json(new ApiResponse(200, newUser, "User Created successfully"));
  } catch (error) {
    return next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  const emailToken = req.query.token;
  let userId;

  if (!emailToken) {
    return next(ApiError.notAuthorized("Not Authorized"));
  }

  try {
    const tokenData = await verifyRefreshToken(emailToken);
    if (tokenData.message === "jwt expired") {
      return next(ApiError.notAuthorized("Invalid Refresh Token"));
    }
    userId = tokenData.userId;
    if (!userId) {
      return next(ApiError.forbidden());
    }
  } catch (error) {
    return next(ApiError.badRequest());
  }

  let existingUser;

  try {
    existingUser = await getUserById(userId);
    if (!existingUser) {
      return next(ApiError.forbidden());
    }
  } catch (error) {
    return next(ApiError.serverError());
  }

  try {
    await updateUserToVerified(existingUser.id);
  } catch (error) {
    return next(ApiError.serverError());
  }

  const accessToken = await createAccessToken(existingUser.id);
  const refreshToken = await createRefreshToken(existingUser.id);

  try {
    await saveRefreshToken(refreshToken);
  } catch (error) {
    return next(ApiError.serverError());
  }

  const loginData = { existingUser, accessToken };

  res.status(200).cookie("token", refreshToken, {
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + 900000000),
    httpOnly: true,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, loginData, "User loggedin successfully"));
};

const login = async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return next(ApiError.notAuthorized());
    }
  } catch (error) {
    return next(ApiError.serverError());
  }

  const verifiedPassword = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!verifiedPassword) {
    return next(ApiError.notAuthorized());
  }

  if (!existingUser.verified) {
    const tokenForEmail = await createRefreshToken(existingUser.id);

    const emailSubject = "Verify Email";
    const emailText = `Hi! There, You have recently visited
    our Social Network website and entered your email.
    Please follow the given link to verify your email
    ${process.env.CLIENT_URL}/verify-email?token=${tokenForEmail}&verifiedFor=signup
    Thanks`;

    await sendEmail(email, emailSubject, emailText);

    return next(ApiError.notAuthorized("Please verify your email"));
  }

  try {
    const user = await getUserById(existingUser.id);

    const accessToken = await createAccessToken(existingUser.id);
    const refreshToken = await createRefreshToken(existingUser.id);
    const loginData = { user, accessToken };

    await saveRefreshToken(refreshToken);

    res.status(200).cookie("token", refreshToken, {
      secure: true,
      sameSite: "lax",
      path: "/",
      expires: new Date(Date.now() + 900000000),
      httpOnly: true,
    });

    return res
      .status(201)
      .json(new ApiResponse(200, loginData, "User loggedin successfully"));
  } catch (error) {
    return next(ApiError.serverError());
  }
};

const logout = async (req, res, next) => {
  let cookie = req.headers.cookie;
  if (!cookie) {
    return next(ApiError.badRequest());
  }
  const refreshTokenInCookie = cookie.split("=")[1];

  if (!refreshTokenInCookie) {
    return next(ApiError.badRequest());
  }

  try {
    await deleteRefreshtoken(refreshTokenInCookie);
  } catch (error) {
    return next(ApiError.serverError());
  }
  res.status(200).clearCookie("token");

  return res
    .status(201)
    .json(new ApiResponse(200, "", "User loggedout successfully"));
};

const tokenRefresh = async (req, res, next) => {
  let cookie = req.headers.cookie;

  if (!cookie) {
    return next(ApiError.notAuthorized("Invalid Refresh Token"));
  }
  const refreshTokenInCookie = cookie.split("=")[1];

  if (!refreshTokenInCookie) {
    return next(ApiError.notAuthorized("Invalid Refresh Token"));
  }

  try {
    let refreshTokenExists = await getRefreshToken(refreshTokenInCookie);

    if (!refreshTokenExists) {
      res.clearCookie("token");
      return next(ApiError.notAuthorized("Invalid Refresh Token"));
    }
  } catch (error) {
    res.clearCookie("token");
    return next(ApiError.notAuthorized("Invalid Refresh Token"));
  }

  let userId;
  try {
    const tokenData = await verifyRefreshToken(refreshTokenInCookie);
    if (tokenData.message === "jwt expired") {
      await deleteRefreshtoken(refreshTokenInCookie);
      res.clearCookie("token");
      return next(ApiError.notAuthorized("Invalid Refresh Token"));
    }
    userId = tokenData.userId;
    if (!userId) {
      res.clearCookie("token");
      return next(ApiError.notAuthorized("Invalid Refresh Token"));
    }
  } catch (err) {
    res.clearCookie("token");
    return next(ApiError.notAuthorized("Invalid Refresh Token"));
  }

  let existingUser;
  try {
    existingUser = await getUserById(userId);
    if (!existingUser) {
      res.clearCookie("token");
      return next(ApiError.notAuthorized("Invalid Refresh Token"));
    }
  } catch (error) {
    res.clearCookie("token");
    return next(ApiError.notAuthorized("Invalid Refresh Token"));
  }
  try {
    const accessToken = await createAccessToken(existingUser.id);
    const refreshToken = await createRefreshToken(existingUser.id);

    await saveRefreshToken(refreshToken);
    await deleteRefreshtoken(refreshTokenInCookie);

    res.status(200).cookie("token", refreshToken, {
      sameSite: "lax",
      path: "/",
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    });

    return res
      .status(201)
      .json(new ApiResponse(200, accessToken, "Tokens refreshed"));
  } catch (error) {
    res.clearCookie("token");
    return next(ApiError.notAuthorized("Invalid Refresh Token"));
  }
};

const forgotPassword = async (req, res, next) => {
  const { error } = forgotPasswordSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  const { email } = req.body;

  if (!email) {
    return next(ApiError.notFound("Email is required"));
  }

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return next(ApiError.notFound("User does not exists"));
    }

    const tokenForEmail = await createRefreshToken(user.id);

    const emailSubject = "Reset Password";
    const emailText = `Hi! There, You have recently visited 
    our Social Network website and entered your email.
    Please follow the given link to verify your email
    ${process.env.CLIENT_URL}/reset-password?token=${tokenForEmail}&verifiedFor=resetPassword
    Thanks`;

    await sendEmail(email, emailSubject, emailText);

    return res
      .status(201)
      .json(new ApiResponse(200, "", "Verification Email has been sent"));
  } catch (error) {
    return next(ApiError.serverError("Something went wrong"));
  }
};

const resetPassword = async (req, res, next) => {
  const emailToken = req.query.token;
  if (!emailToken) {
    return next(ApiError.notAuthorized("You are not authorized"));
  }

  const { error } = resetPasswordSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  const { password } = req.body;

  if (!password) {
    return next(ApiError.notFound("Password is required"));
  }

  let userId;
  try {
    const tokenData = await verifyRefreshToken(emailToken);
    if (tokenData.message === "jwt expired") {
      return next(ApiError.notAuthorized("Not authorized"));
    }
    userId = tokenData.userId;
    if (!userId) {
      return next(ApiError.forbidden());
    }
  } catch (error) {
    return next(ApiError.badRequest());
  }

  try {
    const existingUser = await getUserById(userId);

    if (!existingUser) {
      return next(ApiError.notFound("User not found"));
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_COST_FACTOR);
    await updatePasswordByUserId(existingUser.id, hashedPassword);

    const accessToken = await createAccessToken(existingUser.id);
    const refreshToken = await createRefreshToken(existingUser.id);

    try {
      await saveRefreshToken(refreshToken);
    } catch (error) {
      return next(ApiError.serverError());
    }

    const loginData = { existingUser, accessToken };
    res.status(200).cookie("token", refreshToken, {
      secure: true,
      sameSite: "lax",
      path: "/",
      expires: new Date(Date.now() + 900000000),
      httpOnly: true,
    });

    return res
      .status(201)
      .json(new ApiResponse(200, loginData, "Password Reset Successfully"));
  } catch (error) {
    return next(ApiError.serverError("something went wrong"));
  }
};

export {
  signup,
  verifyEmail,
  login,
  logout,
  tokenRefresh,
  forgotPassword,
  resetPassword,
};
