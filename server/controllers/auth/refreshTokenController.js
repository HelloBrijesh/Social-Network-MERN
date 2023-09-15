import { JWT_REFRESH_SECRET, REFRESH_TOKEN_EXIRY } from "../../config";
import { RefreshTokenModel, UserModel } from "../../models";
import { customErrorHandler, jwtService } from "../../services";

const refreshTokenController = {
  async refreshToken(req, res, next) {
    let cookieToken = req.headers.cookie;
    if (!cookieToken) {
      return next(customErrorHandler.unAuthorized("Invalid Refresh Token"));
    }
    const cookieRefreshtoken = cookieToken.split(" ")[1];

    try {
      let verifiedRefreshToken = await RefreshTokenModel.findOne({
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
      const { _id } = jwtService.verify(cookieRefreshtoken, JWT_REFRESH_SECRET);
      userId = _id;
    } catch (error) {
      return next(customErrorHandler.unAuthorised("Invalid Refresh Token"));
    }

    // Finding the user from database
    let user;
    try {
      user = await UserModel.findOne({ _id: userId });
      if (!user) return next(customErrorHandler.unAuthorized("No user found!"));
    } catch (error) {
      return next(error);
    }

    // Creating new Tokens
    let access_token;
    let refresh_token;
    try {
      access_token = jwtService.sign({ _id: user._id, role: user.role });
      refresh_token = jwtService.sign(
        { _id: user._id, firstName: user.firstName },
        JWT_REFRESH_SECRET,
        REFRESH_TOKEN_EXIRY
      );

      // Adding new refresh_token in database
      await RefreshTokenModel.create({ savedRefreshToken: refresh_token });

      // Deleting the old refresh_token from database
      await RefreshTokenModel.deleteOne({
        savedRefreshToken: cookieRefreshtoken,
      });
    } catch (error) {
      return next(new Error("Something went wrong " + error.message));
    }

    res.json({ access_token, refresh_token });
  },
};

export default refreshTokenController;
