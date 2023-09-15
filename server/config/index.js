import dotenv from "dotenv";

dotenv.config();

export const {
  SERVER_URL,
  CLIENT_URL,
  DEV_PORT,
  DB_URL,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  ACCESS_TOKEN_EXIRY,
  REFRESH_TOKEN_EXIRY,
  EMAIL_PORT,
  USER,
  PASS,
  SECURE,
  SERVICE,
} = process.env;
