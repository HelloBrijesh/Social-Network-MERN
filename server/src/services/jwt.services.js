import jwt from "jsonwebtoken";
import RefreshToken from "../models/refreshToken.model.js";

const createAccessToken = async (userId) => {
  try {
    const access_token = jwt.sign(
      { userId: userId },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    return access_token;
  } catch (error) {
    return error;
  }
};

const verifyAccessToken = async (token) => {
  try {
    const tokenData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return tokenData;
  } catch (error) {
    return error;
  }
};

const createRefreshToken = async (userId) => {
  try {
    const refresh_token = jwt.sign(
      { userId: userId },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
    return refresh_token;
  } catch (error) {
    return error;
  }
};

const verifyRefreshToken = async (token) => {
  try {
    const tokenData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return tokenData;
  } catch (error) {
    return error;
  }
};

export {
  createAccessToken,
  verifyAccessToken,
  createRefreshToken,
  verifyRefreshToken,
};
