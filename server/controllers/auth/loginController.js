import Joi from "joi";
import bcrypt from "bcrypt";
import { RefreshTokenModel, UserModel } from "../../models";
import { customErrorHandler, jwtService } from "../../services";
import { JWT_REFRESH_SECRET, REFRESH_TOKEN_EXIRY } from "../../config";

const loginController = {
  async login(req, res, next) {
    // Validating the user Input
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { email, password } = req.body;

    // Finding the user from database

    let user;
    try {
      user = await UserModel.findOne({ email: req.body.email });
      if (!user) return next(customErrorHandler.wrongCredentials());
    } catch (error) {
      return next(error);
    }

    // Compare the Password

    try {
      const verifyPassword = await bcrypt.compare(password, user.password);
      if (!verifyPassword) return next(customErrorHandler.wrongCredentials());
      if (!user.verified) return next(customErrorHandler.notVerified());
    } catch (error) {
      return next(error);
    }

    // Creating the Tokens
    let access_token;
    let refresh_token;

    try {
      access_token = jwtService.sign({
        _id: user._id,
        firstName: user.firstName,
      });
      refresh_token = jwtService.sign(
        { _id: user._id, role: user.role },
        JWT_REFRESH_SECRET,
        REFRESH_TOKEN_EXIRY
      );

      await RefreshTokenModel.create({ savedRefreshToken: refresh_token });
    } catch (error) {
      return next(error);
    }

    res.json({ access_token, refresh_token });
  },
};

export default loginController;
