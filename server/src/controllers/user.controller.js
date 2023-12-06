import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  if (error) {
    throw new ApiError(400, "password is required");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, "user", "User Created successfully"));
});

export { registerUser };
