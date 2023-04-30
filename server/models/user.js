import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, requied: true },
  profileImage: { type: String, requied: true },
  friends: [String],
  requestReceived: [String],
  requestSent: [String],
});

export default mongoose.model("User", userSchema, "users");
