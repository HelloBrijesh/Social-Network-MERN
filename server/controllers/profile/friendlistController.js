import { UserModel } from "../../models";
const friendlistController = {
  async friendlist(req, res, next) {
    const userId = req.user._Id;

    let existingUser;
    let friendlist;
    try {
      existingUser = await UserModel.findOne({ _id: userId });
      friendlist = existingUser.friends;
    } catch (error) {
      return next(error);
    }

    res.json({ friendlist });
  },
};

export default friendlistController;
