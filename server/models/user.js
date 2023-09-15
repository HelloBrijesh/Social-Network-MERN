import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  birthDate: { type: Date, required: true },
  gender: { type: String, required: true },
  profileImage: { type: String, default: "" },
  about: {
    workplace: { type: String, default: "" },
    college: { type: String, default: "" },
    highSchool: { type: String, default: "" },
    homeTown: { type: String, default: "" },
    city: { type: String, default: "" },
    contact: { type: String, default: "" },
  },
  friends: [mongoose.ObjectId],
  requestReceived: [mongoose.ObjectId],
  requestSent: [mongoose.ObjectId],
  verified: { type: Boolean, default: false },
});

const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const User = mongoose.model("User", userSchema, "users");
