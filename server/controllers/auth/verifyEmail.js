import { User } from "../../models/User";
import { EmailToken } from "../../models/EmailToken";
import { RefreshToken } from "../../models/RefreshToken";
import { CustomErrorHandler } from "../../services";
import {
  SERVER_URL,
  JWT_ACCESS_SECRET,
  ACCESS_TOKEN_EXIRY,
  JWT_REFRESH_SECRET,
  REFRESH_TOKEN_EXIRY,
  EMAIL_PORT,
  USER,
  PASS,
  SECURE,
  SERVICE,
} from "../../config";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const sendEmail = async (req, res, next) => {
  const email = req.body.email;

  // find user
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return next(CustomErrorHandler.notFound("User Not Found"));
    }
  } catch (error) {
    return next(error);
  }

  // create Email Verification token
  let emailVerificationToken;
  try {
    const verificationToken = jwt.sign(
      {
        userId: existingUser.id,
      },
      JWT_REFRESH_SECRET,
      REFRESH_TOKEN_EXIRY
    );

    const COST_FACTOR = 10;

    emailVerificationToken = (
      await bcrypt.hash(verificationToken, COST_FACTOR)
    ).replace(/[^a-zA-Z0-9 ]/g, "");
  } catch (error) {
    return next(error);
  }

  // send emailtoken to user email ID
  try {
    const transporter = nodemailer.createTransport({
      service: SERVICE,
      secure: SECURE,
      port: EMAIL_PORT,
      auth: {
        user: USER,
        pass: PASS,
      },
    });

    const mailConfigurations = {
      from: "techpradhyapak@gmail.com",
      to: email,
      subject: "Email Verification",
      text: `Hi! There, You have recently visited 
           our Bookstore website and entered your email.
           Please follow the given link to verify your email
           ${SERVER_URL}/api/verify/${emailVerificationToken}
           Thanks`,
    };

    transporter.sendMail(mailConfigurations, function (error, info) {
      if (error) {
        console.log(error);
      }
    });
  } catch (error) {
    return next(error);
  }

  // save emailToken to database
  const emailToken = new EmailToken({
    emailToken: emailVerificationToken,
    userId: existingUser.id,
  });

  try {
    await emailToken.save();
  } catch (error) {
    next(error);
  }

  res.json({ status: "ok" });
};

export const verifyEmail = async (req, res, next) => {
  const emailVerificationToken = req.params.emailtoken;
  let verificationDetail;

  // find token
  try {
    verificationDetail = await EmailToken.findOne({
      emailToken: emailVerificationToken,
    });

    if (!verificationDetail) {
      return next(CustomErrorHandler.notFound("Token does not exists"));
    }
  } catch (error) {
    return next(error);
  }

  // update verified status in user collections
  try {
    await User.findByIdAndUpdate(verificationDetail.userId, {
      verified: true,
    });
  } catch (error) {
    return next(error);
  }

  let access_token;
  let refresh_token;

  try {
    const existingUser = await User.findOne({
      id: verificationDetail.userId,
    });
    let userId = existingUser.id;
    console.log(userId);
    // Creating Tokens
    access_token = jwt.sign({ userId }, JWT_ACCESS_SECRET, ACCESS_TOKEN_EXIRY);
    refresh_token = jwt.sign(
      { userId },
      JWT_REFRESH_SECRET,
      REFRESH_TOKEN_EXIRY
    );

    // Adding refresh_token in Database
    await RefreshToken.create({ savedRefreshToken: refresh_token });

    await EmailToken.deleteOne({
      emailToken: verificationDetail.emailToken,
    });
  } catch (error) {
    return next(error);
  }

  res.json({ access_token, refresh_token });
};
