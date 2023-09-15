import { PostModel } from "../../models";

const postController = {
  async createPost(req, res, next) {
    const userId = req.user._id;

    const { content, images } = req.body;

    try {
      const newPost = new PostModel({
        postedBy: userId,
        postContent: content,
        postImages: images,
      });

      await newPost.save();
    } catch (error) {
      return next(error);
    }

    res.json({ status: "ok" });
  },

  async deletePost(req, res, next) {
    const postId = req.body.postId;

    try {
      await PostModel.deleteOne({ _id: postId });
    } catch (error) {
      return next(error);
    }

    res.json({ status: "ok" });
  },

  async getPost(req, res, next) {
    const userId = req.user._id;

    let allPost;
    try {
      allPost = await PostModel.find({ postedBy: userId });
    } catch (error) {
      return next(error);
    }

    res.json({ allPost });
  },

  async addComment(req, res, next) {
    res.json({ status: "ok" });
  },
};

export default postController;
