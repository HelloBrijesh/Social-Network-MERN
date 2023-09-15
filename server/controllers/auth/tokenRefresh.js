import { RefreshToken } from "../../models/refreshToken";
import { User } from "../../models/user";
import { customErrorHandler } from "../../services";
import {
  JWT_REFRESH_SECRET,
  REFRESH_TOKEN_EXIRY,
  JWT_ACCESS_SECRET,
  ACCESS_TOKEN_EXIRY,
} from "../../config";
import jwt from "jsonwebtoken";

export const tokenRefresh = async (req, res, next) => {
  let cookieToken = req.headers.cookie;
  if (!cookieToken) {
    return next(customErrorHandler.unAuthorized("Invalid Refresh Token"));
  }
  const cookieRefreshtoken = cookieToken.split(" ")[1];

  try {
    let verifiedRefreshToken = await RefreshToken.findOne({
      savedRefreshToken: cookieRefreshtoken,
    });

    if (!verifiedRefreshToken) {
      return next(customErrorHandler.unAuthorised("Invalid Refresh Token"));
    }
  } catch (error) {
    return next(error);
  }

  let userId;
  try {
    const tokenData = jwt.verify(cookieRefreshtoken, JWT_REFRESH_SECRET);
    userId = tokenData.userId;
  } catch (error) {
    return next(customErrorHandler.unAuthorised("Invalid Refresh Token"));
  }

  // Finding the user from database
  let existingUser;
  try {
    existingUser = await User.findOne({ id: userId });
    if (!existingUser)
      return next(customErrorHandler.unAuthorized("No user found!"));
  } catch (error) {
    return next(error);
  }

  // Creating new Tokens
  let access_token;
  let refresh_token;
  try {
    access_token = jwt.sign(
      { id: userId },
      JWT_ACCESS_SECRET,
      ACCESS_TOKEN_EXIRY
    );
    refresh_token = jwt.sign(
      { id: userId },
      JWT_REFRESH_SECRET,
      REFRESH_TOKEN_EXIRY
    );

    // Adding new refresh_token in database
    await RefreshToken.create({ savedRefreshToken: refresh_token });

    // Deleting the old refresh_token from database
    await RefreshToken.deleteOne({
      savedRefreshToken: cookieRefreshtoken,
    });
  } catch (error) {
    return next(new Error("Something went wrong " + error.message));
  }

  res.json({ access_token, refresh_token });
};
