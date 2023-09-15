import { UserModel } from "../../models";

const friendRequestController = {
  async createRequest(req, res, next) {
    const userId = req.user._id;
    const friendId = req.body.friendId;

    try {
      await UserModel.updateOne(
        { _id: userId },
        { $addToSet: { requestSent: [friendId] } }
      );
      await UserModel.updateOne(
        { _id: friendId },
        { $addToSet: { requestReceived: [userId] } }
      );
    } catch (error) {
      return next(error);
    }

    res.json({ status: "ok" });
  },

  async cancelRequest(req, res, next) {
    const userId = req.user._id;
    const friendId = req.body.friendId;

    try {
      await UserModel.updateOne(
        { _id: userId },
        { $pullAll: { requestSent: [friendId] } }
      );
      await UserModel.updateOne(
        { _id: friendId },
        { $pullAll: { requestReceived: [userId] } }
      );
    } catch (error) {
      return next(error);
    }

    res.json({ status: "ok" });
  },
  async addFriend(req, res, next) {
    const userId = req.user._id;
    const friendId = req.body.friendId;

    try {
      await UserModel.updateOne(
        { _id: userId },
        { $addToSet: { friends: [friendId] } }
      );
      await UserModel.updateOne(
        { _id: friendId },
        { $addToSet: { friends: [userId] } }
      );
      await UserModel.updateOne(
        { _id: userId },
        { $pullAll: { requestSent: [friendId] } }
      );
      await UserModel.updateOne(
        { _id: friendId },
        { $pullAll: { requestReceived: [userId] } }
      );
    } catch (error) {
      return next(error);
    }

    res.json({ status: "ok" });
  },
};

export default friendRequestController;
