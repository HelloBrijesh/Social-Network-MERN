import mongoose from "mongoose";

const emailTokenSchema = new mongoose.Schema(
  {
    emailToken: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamp: true }
);

const virtual = emailTokenSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
emailTokenSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const EmailToken = mongoose.model(
  "EmailToken",
  emailTokenSchema,
  "emailTokens"
);
