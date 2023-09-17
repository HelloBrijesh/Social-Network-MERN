import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RefreshToken } from "../../models/refreshToken";
import { User } from "../../models/user";
import { customErrorHandler } from "../../services";
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
} from "../../config";

export const login = async (req, res, next) => {
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

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    if (!existingUser) return next(customErrorHandler.wrongCredentials());
  } catch (error) {
    return next(error);
  }

  // Compare the Password

  try {
    const verifyPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!verifyPassword) return next(customErrorHandler.wrongCredentials());
    if (!existingUser.verified) return next(customErrorHandler.notVerified());
  } catch (error) {
    return next(error);
  }

  // Creating the Tokens
  let access_token;
  let refresh_token;

  try {
    access_token = jwt.sign(
      {
        userId: existingUser.id,
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );
    refresh_token = jwt.sign(
      { userId: existingUser.id },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRY }
    );

    await RefreshToken.create({ savedRefreshToken: refresh_token });
  } catch (error) {
    return next(error);
  }

  res.json({ access_token, refresh_token });
};
