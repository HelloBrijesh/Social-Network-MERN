import { UserModel } from "../../models";
const aboutController = {
  async about(req, res, next) {
    const userId = req.user._Id;

    let existingUser;
    let aboutUser;
    try {
      existingUser = await UserModel.findOne({ _id: userId });
      aboutUser = existingUser.about;
    } catch (error) {
      return next(error);
    }

    res.json({ aboutUser });
  },
};

export default aboutController;
