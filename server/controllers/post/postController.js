import { PostModel } from "../../models";

const postController = {
  async createPost(req, res, next) {
    const userId = req.user._Id;

    const { content, imageUrl } = req.body;

    try {
      const newPost = new PostModel({
        postedBy: userId,
        postContent: content,
        postImage: imageUrl,
      });

      await newPost.save();
    } catch (error) {
      return next(error);
    }

    res.json({ status: "ok" });
  },

  async deletePost(req, res, next) {
    const postId = req.postId;

    try {
      await PostModel.deleteOne({ postId: postId });
    } catch (error) {
      return next(error);
    }

    res.json({ status: "ok" });
  },

  async addComment(req, res, next) {
    res.json({ status: "ok" });
  },
};

export default postController;
