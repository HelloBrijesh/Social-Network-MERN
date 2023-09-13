import dotenv from "dotenv";

dotenv.config();

export const { DEV_PORT, DB_URL, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } =
  process.env;
