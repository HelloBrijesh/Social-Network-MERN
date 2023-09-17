import { User } from "../../models/user";
import { EmailToken } from "../../models/emailToken";
import { RefreshToken } from "../../models/refreshToken";
import { customErrorHandler } from "../../services";
import {
  SERVER_URL,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  EMAIL_SERVICE,
  EMAIL_PORT,
  EMAIL_SECURE,
  EMAIL_USERID,
  EMAIL_PASSWORD,
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
      return next(customErrorHandler.notFound("User Not Found"));
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
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRY }
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
      service: EMAIL_SERVICE,
      secure: EMAIL_SECURE,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_USERID,
        pass: EMAIL_PASSWORD,
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
  const emailToken = req.params.emailtoken;
  let verificationDetail;

  // find token
  try {
    verificationDetail = await EmailToken.findOne({
      emailToken: emailToken,
    });

    if (!verificationDetail) {
      return next(customErrorHandler.notFound("Token does not exists"));
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
    const existingUser = await User.findById(verificationDetail.userId);
    let userId = existingUser.id;
    // Creating Tokens
    access_token = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });
    refresh_token = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });

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
