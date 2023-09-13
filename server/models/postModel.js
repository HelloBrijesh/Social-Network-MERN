import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  postId: { type: Number, required: true },
  postedBy: { type: Number, required: true },
  comments: {
    commentDetail: { type: String, required: true },
    commentedBy: { type: Number, required: true },
  },
  likes: [Number],
  disLikes: [Number],
});

export default mongoose.model("Post", postSchema, "posts");
