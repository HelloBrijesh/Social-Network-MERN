import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    city: { type: String, default: "" },
    workplace: { type: String, default: "" },
    college: { type: String, default: "" },
    highSchool: { type: String, default: "" },
    homeTown: { type: String, default: "" },
    gender: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    email: { type: String, required: true },
    password: { type: String, requied: true },
    coverImage: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    requestReceived: [{ type: Schema.Types.ObjectId, ref: "User" }],
    requestSent: [{ type: Schema.Types.ObjectId, ref: "User" }],
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

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

export default mongoose.model("User", userSchema, "users");
