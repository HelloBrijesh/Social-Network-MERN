import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { loginSchema, registerSchema } from "../services/validation.service.js";
import {
  getUserByEmail,
  getUserById,
  updateUserToVerified,
  updatePasswordByUserId,
  createUser,
} from "../services/user.service.js";
import { sendEmail } from "../services/email.service.js";
import {
  createAccessToken,
  verifyAccessToken,
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

    const tokenForEmail = await createAccessToken(createdUser.id);

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
    const tokenForEmail = await createAccessToken(existingUser.id);

    const emailSubject = "Verify Email";
    const emailText = `Hi! There, You have recently visited 
    our Social Network website and entered your email.
    Please follow the given link to verify your email
    ${process.env.CLIENT_URL}/verify-email?token=${tokenForEmail}&reason=registerUser
    Thanks`;

    await sendEmail(email, emailSubject, emailText);

    return next(ApiError.notAuthorized("Please verify your email"));
  }

  const accessToken = await createAccessToken(existingUser.id);

  // Setting up the cookies
  res.status(200).cookie("token", accessToken, {
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + 900000000),
    httpOnly: true,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, existingUser, "User loggedin successfully"));
};

const logout = async (req, res, next) => {
  let cookie = req.headers.cookie;
  if (!cookie) {
    return next(ApiError.badRequest());
  }

  const refreshTokenInCookie = cookie.split("=")[1];

  // Deleting the cookies
  res.status(200).clearCookie("token");

  return res
    .status(201)
    .json(new ApiResponse(200, "", "User loggedout successfully"));
};

const forgotPassword = async (req, res, next) => {
  const email = req.body.email;

  let existingUser;

  try {
    existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return next(ApiError.notAuthorized("Email not registered"));
    }
  } catch (error) {
    return next(ApiError.serverError());
  }

  const tokenForEmail = await createAccessToken(existingUser.id);

  const emailSubject = "Reset Password";
  const emailText = `Hi! There, You have Requested to reset the password.
  Please follow the given link to reset your password
  ${process.env.CLIENT_URL}/verify-email?token=${tokenForEmail}&verifiedFor=resetPassword
  Thanks`;

  try {
    await sendEmail(email, emailSubject, emailText);
  } catch (error) {
    return next(ApiError.serverError());
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        "",
        "Instruction Sent to your email for password reset"
      )
    );
};

const resetPassword = async (req, res, next) => {
  const password = req.body.password;
  const userId = req.userId;

  try {
    const userExist = await getUserById(userId);
    if (!userExist) {
      return next(ApiError.conflict("User does not Exists"));
    }
  } catch (error) {
    return next(ApiError.serverError(error.message));
  }

  const hashedPassword = await bcrypt.hash(password, BCRYPT_COST_FACTOR);

  try {
    await updatePasswordByUserId(userId, hashedPassword);
  } catch (error) {
    return next(ApiError.serverError());
  }

  return res
    .status(201)
    .json(new ApiResponse(200, "", "Password reset successfull"));
};

const verifyEmail = async (req, res, next) => {
  const emailToken = req.query.token;
  let userId;
  try {
    const tokenData = await verifyAccessToken(emailToken);
    userId = tokenData.userId;
    if (!userId) {
      return next(ApiError.forbidden());
    }
  } catch (error) {
    return next(ApiError.badRequest());
  }

  await updateUserToVerified(userId);

  let existingUser;

  try {
    existingUser = await getUserById(userId);
    if (!existingUser) {
      return next(ApiError.forbidden());
    }
  } catch (error) {
    return next(ApiError.serverError());
  }

  const accessToken = await createAccessToken(existingUser.id);

  // Setting up the cookies
  res.status(200).cookie("token", accessToken, {
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + 900000000),
    httpOnly: true,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, existingUser, "User loggedin successfully"));
};

export { signup, login, logout, verifyEmail, forgotPassword, resetPassword };
