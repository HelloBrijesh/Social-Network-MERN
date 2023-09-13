import mongoose from "mongoose";

const emailTokenSchema = new mongoose.Schema(
  {
    emailToken: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamp: true }
);

export default mongoose.model("EmailToken", emailTokenSchema, "emailTokens");
