const friendRequestController = {
  async createRequest(req, res, next) {
    const userId = req.user._Id;
    const friendId = req.friendId;

    try {
      await UserModel.update(
        { _id: userId },
        { $push: { requestSent: friendId } }
      );
      await UserModel.update(
        { _id: friendId },
        { $push: { requestReceived: userId } }
      );
    } catch (error) {
      return next(error);
    }

    res.json({ status: "ok" });
  },

  async cancelRequest(req, res, next) {},
  async addRequest(req, res, next) {},
};

export default friendRequestController;
