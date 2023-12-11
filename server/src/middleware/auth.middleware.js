import { verifyAccessToken } from "../services/jwt.services.js";
import { ApiError } from "../utils/ApiError.js";

const auth = async (req, res, next) => {
  let cookie = req.headers.cookie;

  if (!cookie) {
    return next(ApiError.forbidden("Invalid Access Token"));
  }
  const accessTokenInCookie = cookie.split("=")[1];

  if (!accessTokenInCookie) {
    return next(ApiError.forbidden("Invalid Access Token"));
  }

  try {
    const tokenData = await verifyAccessToken(accessTokenInCookie);
    if (
      tokenData.message === "jwt expired" ||
      tokenData.message === "jwt malformed" ||
      !tokenData.userId
    ) {
      return next(ApiError.badRequest("Invalid Access Token"));
    }

    req.userId = tokenData.userId;
    next();
  } catch (err) {
    return next(ApiError.forbidden(err.message));
  }
};

export { auth };
