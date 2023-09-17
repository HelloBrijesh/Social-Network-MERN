import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config";
import { customErrorHandler } from "../services";

const auth = async (req, res, next) => {
  // Accessing the access token from headers
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(customErrorHandler.unAuthorized("accessToken Required"));
  }
  const authAccessToken = authHeader.split(" ")[1];

  //Verifying the access token
  try {
    const { userId } = jwt.verify(authAccessToken, ACCESS_TOKEN_SECRET);

    req.userId = userId;
    next();
  } catch (error) {
    return next(customErrorHandler.unAuthorized(error.message));
  }
};

export default auth;
