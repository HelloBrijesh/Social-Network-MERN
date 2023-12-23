import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  getUserById,
  getPasswordById,
  updatePasswordByUserId,
  updateUserProfile,
  updateUserCoverImageById,
  updateUserProfileImageById,
  deleteUserCoverImageById,
  deleteUserProfileImageById,
} from "../services/user.service.js";
import { changePasswordSchema } from "../services/validation.service.js";
import { BCRYPT_COST_FACTOR } from "../constants.js";

const getUser = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await getUserById(userId);
    if (!user) {
      return next(ApiError.notFound("User not found"));
    }
    return res.status(201).json(new ApiResponse(200, user, "User Details"));
  } catch (error) {
    return next(ApiError.serverError("Something Went wrong"));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    const {
      firstName,
      lastName,
      city,
      homeTown,
      college,
      highSchool,
      workplace,
    } = req.body;
    const updatedUser = await updateUserProfile(
      userId,
      firstName,
      lastName,
      city,
      homeTown,
      college,
      highSchool,
      workplace
    );
    return res
      .status(201)
      .json(new ApiResponse(200, updatedUser, "User updated"));
  } catch (error) {
    return next(ApiError.serverError());
  }
};

const getProfile = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await getUserById(userId);
    if (!user) {
      return next(ApiError.notFound("User not found"));
    }
    return res.status(201).json(new ApiResponse(200, user, "User Details"));
  } catch (error) {
    return next(ApiError.serverError("Something Went wrong"));
  }
};

const changePassword = async (req, res, next) => {
  const userId = req.userId;
  const { error } = changePasswordSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return next(ApiError.notAuthorized("password is missing"));
  }

  try {
    const savedPassword = await getPasswordById(userId);

    if (!savedPassword) {
      return next(ApiError.notFound("User Not found"));
    }

    const verifyPassword = await bcrypt.compare(currentPassword, savedPassword);

    if (!verifyPassword) {
      return next(
        ApiError.notAuthorized("Please enter the correct current Password")
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, BCRYPT_COST_FACTOR);

    await updatePasswordByUserId(userId, hashedPassword);

    return res.status(201).json(new ApiResponse(200, "", "Password Changed"));
  } catch (error) {
    return next(ApiError.serverError("Something went Wrong"));
  }
};

const updateUserCoverImage = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { coverImageUrl } = req.body;
    const updatedUser = await updateUserCoverImageById(userId, coverImageUrl);
    return res
      .status(201)
      .json(new ApiResponse(200, updatedUser, "User Cover Image updated"));
  } catch (error) {
    return next(ApiError.serverError());
  }
};

const deleteUserCoverImage = async (req, res, next) => {
  try {
    const userId = req.userId;
    const updatedUser = await deleteUserCoverImageById(userId);
    return res
      .status(201)
      .json(new ApiResponse(200, updatedUser, "User Cover Image deleted"));
  } catch (error) {
    return next(ApiError.serverError());
  }
};

const updateUserProfileImage = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { profileImageUrl } = req.body;
    const updatedUser = await updateUserProfileImageById(
      userId,
      profileImageUrl
    );
    return res
      .status(201)
      .json(new ApiResponse(200, updatedUser, "User Profile Image Updated"));
  } catch (error) {
    return next(ApiError.serverError());
  }
};

const deleteUserProfileImage = async (req, res, next) => {
  try {
    const userId = req.userId;
    const updatedUser = await deleteUserProfileImageById(userId);
    return res
      .status(201)
      .json(new ApiResponse(200, updatedUser, "User Profile Image deleted"));
  } catch (error) {
    return next(ApiError.serverError());
  }
};

export {
  getUser,
  updateUser,
  getProfile,
  updateUserCoverImage,
  deleteUserCoverImage,
  updateUserProfileImage,
  deleteUserProfileImage,
  changePassword,
};
