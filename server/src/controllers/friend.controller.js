import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  getFriendsById,
  removeFriendById,
  addFriendRequest,
  removeFriendRequest,
  approveFriendRequest,
  refuseFriendRequest,
} from "../services/friend.services.js";

const getFriends = async (req, res, next) => {
  const userId = req.userId;
  try {
    const userFriends = await getFriendsById(userId);
    return res
      .status(201)
      .json(new ApiResponse(200, userFriends, "User Details"));
  } catch (error) {
    return next(ApiError.serverError("Something Went wrong"));
  }
};
const unFriend = async (req, res, next) => {
  const userId = req.userId;
  const { userIdOfFriend } = req.body;

  try {
    const userFriends = await removeFriendById(userId, userIdOfFriend);
    return res
      .status(201)
      .json(new ApiResponse(200, userFriends, "User Details"));
  } catch (error) {
    return next(ApiError.serverError("Something Went wrong"));
  }
};

const sendFriendRequest = async (req, res, next) => {
  const userId = req.userId;
  const { userIdForFriend } = req.body;

  try {
    const userFriends = await addFriendRequest(userId, userIdForFriend);

    return res
      .status(201)
      .json(new ApiResponse(200, userFriends, "User Details"));
  } catch (error) {
    return next(ApiError.serverError("Something Went wrong"));
  }
};

const cancelFriendRequest = async (req, res, next) => {
  const userId = req.userId;
  const { userIdForFriend } = req.body;

  try {
    const userFriends = await removeFriendRequest(userId, userIdForFriend);

    return res
      .status(201)
      .json(new ApiResponse(200, userFriends, "User Details"));
  } catch (error) {
    return next(ApiError.serverError("Something Went wrong"));
  }
};

const acceptFriendRequest = async (req, res, next) => {
  const userId = req.userId;
  const { userIdForFriend } = req.body;

  try {
    const userFriends = await approveFriendRequest(userId, userIdForFriend);
    return res
      .status(201)
      .json(new ApiResponse(200, userFriends, "User Details"));
  } catch (error) {
    return next(ApiError.serverError("Something Went wrong"));
  }
};
const rejectFriendRequest = async (req, res, next) => {
  const userId = req.userId;
  const { userIdForFriend } = req.body;

  try {
    const userFriends = await refuseFriendRequest(userId, userIdForFriend);

    return res
      .status(201)
      .json(new ApiResponse(200, userFriends, "User Details"));
  } catch (error) {
    return next(ApiError.serverError("Something Went wrong"));
  }
};

export {
  getFriends,
  unFriend,
  sendFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
};
