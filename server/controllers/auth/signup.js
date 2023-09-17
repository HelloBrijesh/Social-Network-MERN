import Joi from "joi";
import bcrypt from "bcrypt";
import { User } from "../../models/user";
import { customErrorHandler } from "../../services";

export const signup = async (req, res, next) => {
  const signupSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    gender: Joi.string().min(4).max(8).required(),
    birthDate: Joi.string().required(),
  });

  const { error } = signupSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  const { firstName, lastName, email, password, gender, birthDate } = req.body;

  try {
    const userExist = await User.exists({ email: email });
    if (userExist) {
      return next(
        customErrorHandler.alreadyExists("This email is already exists")
      );
    }
  } catch (error) {
    return next(error);
  }

  // Hashing the Password
  const COST_FACTOR = 10;
  const hasedPassword = await bcrypt.hash(password, COST_FACTOR);

  // preparing the model
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hasedPassword,
    gender,
    birthDate,
  });

  // save the user
  try {
    await newUser.save();
  } catch (error) {
    return next(error);
  }

  req.body.email = email;
  next();
};
