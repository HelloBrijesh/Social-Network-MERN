import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  postedBy: { type: mongoose.ObjectId, required: true },
  postContent: { type: String, required: true },
  postImages: [String],
  comments: {
    commentDetail: { type: String, default: "" },
    commentedBy: { type: Number, default: "" },
  },
  likes: [Number],
  disLikes: [Number],
});

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
export const Post = mongoose.model("Post", postSchema, "posts");
