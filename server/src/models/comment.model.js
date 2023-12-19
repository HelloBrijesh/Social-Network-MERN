import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    commentContent: { type: String, required: true },
    commentedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const virtual = commentSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

commentSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export default mongoose.model("Comment", commentSchema, "comments");
