import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    city: { type: String, default: "" },
    workplace: { type: String, default: "" },
    HighSchool: { type: String, default: "" },
    homeTown: { type: String, default: "" },
    gender: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    email: { type: String, required: true },
    password: { type: String, requied: true },
    coverImage: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    friends: [String],
    requestReceived: [String],
    requestSent: [String],
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
