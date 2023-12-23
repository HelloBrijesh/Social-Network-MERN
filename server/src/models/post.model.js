import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema(
  {
    postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postContent: { type: String, required: true },
    postImage: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const virtual = postSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

postSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export default mongoose.model("Post", postSchema, "posts");
