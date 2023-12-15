import { verifyAccessToken } from "../services/jwt.services.js";
import { ApiError } from "../utils/ApiError.js";

const auth = async (req, res, next) => {
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) {
    return next(ApiError.notAuthorized("Invalid Access Token"));
  }
  const authAccessToken = authHeader.split(" ")[1];

  if (!authAccessToken) {
    return next(ApiError.notAuthorized("Invalid Access Token"));
  }

  //Verifying the access token
  try {
    const tokenData = await verifyAccessToken(authAccessToken);
    if (!tokenData.userId) {
      return next(ApiError.notAuthorized("Invalid Access Token"));
    }
    req.userId = tokenData.userId;
    next();
  } catch (err) {
    return next(ApiError.notAuthorized("Invalid Access Token"));
  }
};

export { auth };
