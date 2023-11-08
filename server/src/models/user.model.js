import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, requied: true },
    profileImage: { type: String, requied: true },
    friends: [String],
    requestReceived: [String],
    requestSent: [String],
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
