import { UserModel } from "../../models";
const friendlistController = {
  async friendlist(req, res, next) {
    const userId = req.user._id;

    let existingUser;
    let friendlist = [];
    let allFriends;
    try {
      existingUser = (await UserModel.findOne({ _id: userId })).friends;
      allFriends = existingUser.friends;

      for (let friend of allFriends) {
        const f = await UserModel.findById(friend);

        friendlist.push({
          id: f._id,
          firstName: f.firstName,
          lastName: f.lastName,
          profileImage: f.profileImage,
        });
      }

      console.log(friendlist);
    } catch (error) {
      return next(error);
    }

    res.json({ friendlist });
  },
};

export default friendlistController;
