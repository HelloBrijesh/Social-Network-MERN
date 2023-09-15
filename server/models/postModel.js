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

export default mongoose.model("Post", postSchema, "posts");
