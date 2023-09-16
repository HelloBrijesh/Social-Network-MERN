import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RefreshToken } from "../../models/RefreshToken";
import { User } from "../../models/User";
import { CustomErrorHandler } from "../../services";
import {
  JWT_REFRESH_SECRET,
  JWT_ACCESS_SECRET,
  REFRESH_TOKEN_EXIRY,
  ACCESS_TOKEN_EXIRY,
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
    if (!existingUser) return next(CustomErrorHandler.wrongCredentials());
  } catch (error) {
    return next(error);
  }

  // Compare the Password

  try {
    const verifyPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!verifyPassword) return next(CustomErrorHandler.wrongCredentials());
    if (!existingUser.verified) return next(CustomErrorHandler.notVerified());
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
      JWT_ACCESS_SECRET,
      ACCESS_TOKEN_EXIRY
    );
    refresh_token = jwt.sign(
      { userId: existingUser.id },
      JWT_REFRESH_SECRET,
      REFRESH_TOKEN_EXIRY
    );

    await RefreshToken.create({ savedRefreshToken: refresh_token });
  } catch (error) {
    return next(error);
  }

  res.json({ access_token, refresh_token });
};
