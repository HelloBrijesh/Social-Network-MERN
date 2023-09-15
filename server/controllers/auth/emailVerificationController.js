import { UserModel, EmailTokenModel, RefreshTokenModel } from "../../models";
import { customErrorHandler, jwtService } from "../../services";
import {
  SERVER_URL,
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

const emailVerificationController = {
  async sendEmail(req, res, next) {
    const email = req.body.email;

    // find user
    let existingUser;
    try {
      existingUser = await UserModel.findOne({ email: email });
      if (!existingUser) {
        return next(customErrorHandler.notFound("User Not Found"));
      }
    } catch (error) {
      return next(error);
    }

    // create Email Verification token
    let emailVerificationToken;
    try {
      const verificationToken = jwtService.sign(
        {
          _id: existingUser._id,
          firstName: existingUser.firstName,
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
    const emailToken = new EmailTokenModel({
      emailToken: emailVerificationToken,
      userId: existingUser._id,
    });

    try {
      await emailToken.save();
    } catch (error) {
      next(error);
    }

    res.json({ status: "ok" });
  },

  async verifyEmail(req, res, next) {
    const emailVerificationToken = req.params.emailtoken;
    let verificationDetail;

    // find token
    try {
      verificationDetail = await EmailTokenModel.findOne({
        emailToken: emailVerificationToken,
      });

      if (!verificationDetail) {
        return next(customErrorHandler.notFound("Token does not exists"));
      }
    } catch (error) {
      return next(error);
    }

    // update verified status in user collections
    try {
      await UserModel.findByIdAndUpdate(verificationDetail.userId, {
        verified: true,
      });
    } catch (error) {
      return next(error);
    }

    let access_token;
    let refresh_token;

    try {
      const { _id } = await UserModel.findOne({
        _id: verificationDetail.userId,
      });
      // Creating Tokens
      access_token = jwtService.sign({ _id });
      refresh_token = jwtService.sign(
        {
          _id,
        },
        JWT_REFRESH_SECRET,
        REFRESH_TOKEN_EXIRY
      );

      // Adding refresh_token in Database
      await RefreshTokenModel.create({ savedRefreshToken: refresh_token });

      await EmailTokenModel.deleteOne({
        emailToken: verificationDetail.emailToken,
      });
    } catch (error) {
      return next(error);
    }

    res.json({ access_token, refresh_token });
  },
};

export default emailVerificationController;
