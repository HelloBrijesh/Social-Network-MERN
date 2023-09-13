import { CustomErrorHandler, JwtService } from "../services";

const auth = async (req, res, next) => {
  // Accessing the access token from headers
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorized("accessToken Required"));
  }
  const authAccessToken = authHeader.split(" ")[1];

  //Verifying the access token
  try {
    const { _id, role } = JwtService.verify(authAccessToken);
    const user = {
      _id,
      role,
    };
    req.user = user;
    next();
  } catch (err) {
    return next(CustomErrorHandler.unAuthorized(err.message));
  }
};

export default auth;
