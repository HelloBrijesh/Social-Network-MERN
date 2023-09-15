import { UserModel } from "../../models";
const aboutController = {
  async getProfileDetail(req, res, next) {
    const userId = req.user._id;

    let existingUser;
    let profileDetail;
    try {
      existingUser = await UserModel.findOne({ _id: userId });
      profileDetail = existingUser.about;
    } catch (error) {
      return next(error);
    }

    res.json({ profileDetail });
  },

  async addProfileDetails(req, res, next) {
    const { workplace, college, highSchool, homeTown, city, contact } =
      req.body;

    const userId = req.user._id;

    let about = {
      workplace,
      college,
      highSchool,
      homeTown,
      city,
      contact,
    };
    try {
      await UserModel.findByIdAndUpdate(userId, {
        about: about,
      });
    } catch (error) {
      return next(error);
    }

    res.json({ status: "ok" });
  },
};

export default aboutController;
