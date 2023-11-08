import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    postId: { type: Number, required: true },
    postedBy: { type: Number, required: true },
    comments: {
      commentDetail: { type: String, required: true },
      commentedBy: { type: Number, required: true },
    },
    likes: [Number],
    disLikes: [Number],
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
