import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  postId: { type: Number, required: true },
  postedBy: { type: Number, required: true },
  postContent: { type: String, required: true },
  postImage: { type: String },
  comments: {
    commentDetail: { type: String },
    commentedBy: { type: Number },
  },
  likes: [Number],
  disLikes: [Number],
});

export default mongoose.model("Post", postSchema, "posts");
