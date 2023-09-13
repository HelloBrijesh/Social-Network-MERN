import { customErrorHandler, jwtService } from "../services";

const auth = async (req, res, next) => {
  // Accessing the access token from headers
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(customErrorHandler.unAuthorized("accessToken Required"));
  }
  const authAccessToken = authHeader.split(" ")[1];

  //Verifying the access token
  try {
    const { _id, role } = jwtService.verify(authAccessToken);
    const user = {
      _id,
      role,
    };
    req.user = user;
    next();
  } catch (error) {
    return next(customErrorHandler.unAuthorized(error.message));
  }
};

export default auth;
