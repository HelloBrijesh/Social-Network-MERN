import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getUser = async (req, res, next) => {
  return res.status(201).json(new ApiResponse(200, "user", "getUser"));
};

export { getUser };
