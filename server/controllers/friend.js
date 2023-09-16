import { User } from "../models/User";

export const createRequest = async (req, res, next) => {
  const userId = req.userId;
  const friendId = req.body.friendId;

  try {
    await User.updateOne(
      { id: userId },
      { $addToSet: { requestSent: [friendId] } }
    );
    await User.updateOne(
      { id: friendId },
      { $addToSet: { requestReceived: [userId] } }
    );
  } catch (error) {
    return next(error);
  }
  res.json({ status: "ok" });
};

export const cancelRequest = async (req, res, next) => {
  const userId = req.userId;
  const friendId = req.body.friendId;

  try {
    await User.updateOne(
      { id: userId },
      { $pullAll: { requestSent: [friendId] } }
    );
    await User.updateOne(
      { id: friendId },
      { $pullAll: { requestReceived: [userId] } }
    );
  } catch (error) {
    return next(error);
  }

  res.json({ status: "ok" });
};

export const addFriend = async (req, res, next) => {
  const userId = req.userId;
  const friendId = req.body.friendId;

  try {
    await User.updateOne(
      { id: userId },
      { $addToSet: { friends: [friendId] } }
    );
    await User.updateOne(
      { id: friendId },
      { $addToSet: { friends: [userId] } }
    );
    await User.updateOne(
      { id: userId },
      { $pullAll: { requestSent: [friendId] } }
    );
    await User.updateOne(
      { id: friendId },
      { $pullAll: { requestReceived: [userId] } }
    );
  } catch (error) {
    return next(error);
  }

  res.json({ status: "ok" });
};

export const removeFriend = async (req, res, next) => {
  const userId = req.userId;
  const friendId = req.body.friendId;

  try {
    await User.updateOne({ id: userId }, { $pullAll: { friends: [friendId] } });
    await User.updateOne({ id: friendId }, { $pullAll: { friends: [userId] } });
  } catch (error) {
    return next(error);
  }

  res.json({ status: "ok" });
};

export const friendlist = async (req, res, next) => {
  const userId = req.userId;

  let existingUser;
  let friendlist = [];
  let allFriends;
  try {
    existingUser = await User.findOne({ id: userId });
    allFriends = existingUser.friends;

    for (let friend of allFriends) {
      const f = await User.findById(friend);

      friendlist.push({
        id: f._id,
        firstName: f.firstName,
        lastName: f.lastName,
        profileImage: f.profileImage,
      });
    }
  } catch (error) {
    return next(error);
  }

  res.json({ friendlist });
};
