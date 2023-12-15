import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getUserById } from "../services/user.service.js";
const getUser = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await getUserById(userId);
    if (!user) {
      return next(ApiError.notFound("User not found"));
    }
    return res.status(201).json(new ApiResponse(200, user, "getUser"));
  } catch (error) {
    return next(ApiError.serverError("Something Went wrong"));
  }
};

export { getUser };
