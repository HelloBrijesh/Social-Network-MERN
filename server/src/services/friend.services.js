import User from "../models/user.model.js";

const findFriends = async (userId, page, limit) => {
  try {
    const usersList = await User.find({ _id: { $ne: userId } })
      .select(
        "-friends -requestReceived -requestSent -password -verified -city -workplace -college -highSchool -homeTown -gender -dateOfBirth -email -coverImage -createdAt -updatedAt -__v"
      )
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await User.find({ _id: { $ne: userId } }).count();
    const totalPages = Math.ceil((count - 1) / limit);
    return { usersList, totalPages };
  } catch (error) {
    return Promise.reject(error);
  }
};
const getFriendsById = async (userId) => {
  try {
    const userFriends = await User.findById(userId)
      .select(
        "-id -firstName -lastName -profileImage -password -verified -city -workplace -college -highSchool -homeTown -gender -dateOfBirth -email -coverImage -createdAt -updatedAt -__v"
      )
      .populate({
        path: "friends",
        select: "firstName lastName profileImage",
      })
      .populate({
        path: "requestReceived",
        select: "firstName lastName profileImage",
      })
      .populate({
        path: "requestSent",
        select: "firstName lastName profileImage",
      });
    return userFriends;
  } catch (error) {
    return Promise.reject(error);
  }
};
const fetchFriendsOfUser = async (userId) => {
  try {
    const userFriends = await User.findById(userId)
      .select(
        "-id -firstName -lastName -requestReceived -requestSent -profileImage -password -verified -city -workplace -college -highSchool -homeTown -gender -dateOfBirth -email -coverImage -createdAt -updatedAt -__v"
      )
      .populate({
        path: "friends",
        select: "firstName lastName profileImage",
      });
    return userFriends;
  } catch (error) {
    return Promise.reject(error);
  }
};
const removeFriendById = async (userId, userIdOfFriend) => {
  try {
    const userFriends = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { friends: userIdOfFriend },
      },
      { new: true }
    )
      .select(
        "-firstName -lastName -profileImage -password -verified -city -workplace -college -highSchool -homeTown -gender -dateOfBirth -email -coverImage -createdAt -updatedAt -__v"
      )
      .populate({
        path: "friends",
        select: "firstName lastName profileImage",
      })
      .populate({
        path: "requestReceived",
        select: "firstName lastName profileImage",
      })
      .populate({
        path: "requestSent",
        select: "firstName lastName profileImage",
      });

    await User.findByIdAndUpdate(userIdOfFriend, {
      $pull: { friends: userId },
    });

    return userFriends;
  } catch (error) {
    return Promise.reject(error);
  }
};

const addFriendRequest = async (userId, userIdForFriend) => {
  try {
    const userFriends = await User.findByIdAndUpdate(
      userId,
      {
        $push: { requestSent: userIdForFriend },
      },
      { new: true }
    )
      .select(
        "-firstName -lastName -profileImage -password -verified -city -workplace -college -highSchool -homeTown -gender -dateOfBirth -email -coverImage -createdAt -updatedAt -__v"
      )
      .populate({
        path: "friends",
        select: "firstName lastName profileImage",
      })
      .populate({
        path: "requestReceived",
        select: "firstName lastName profileImage",
      })
      .populate({
        path: "requestSent",
        select: "firstName lastName profileImage",
      });

    await User.findByIdAndUpdate(userIdForFriend, {
      $push: { requestReceived: userId },
    });

    return userFriends;
  } catch (error) {
    return Promise.reject(error);
  }
};

const removeFriendRequest = async (userId, userIdForFriend) => {
  try {
    const userFriends = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { requestSent: userIdForFriend },
      },
      { new: true }
    )
      .select(
        "-firstName -lastName -profileImage -password -verified -city -workplace -college -highSchool -homeTown -gender -dateOfBirth -email -coverImage -createdAt -updatedAt -__v"
      )
      .populate({
        path: "friends",
        select: "firstName lastName profileImage",
      })
      .populate({
        path: "requestReceived",
        select: "firstName lastName profileImage",
      })
      .populate({
        path: "requestSent",
        select: "firstName lastName profileImage",
      });

    await User.findByIdAndUpdate(userIdForFriend, {
      $pull: { requestReceived: userId },
    });

    return userFriends;
  } catch (error) {
    return Promise.reject(error);
  }
};

const approveFriendRequest = async (userId, userIdForFriend) => {
  try {
    const userFriends = await User.findByIdAndUpdate(
      userId,
      {
        $push: { friends: userIdForFriend },
        $pull: { requestReceived: userIdForFriend },
      },
      { new: true }
    )
      .select(
        "-firstName -lastName -profileImage -password -verified -city -workplace -college -highSchool -homeTown -gender -dateOfBirth -email -coverImage -createdAt -updatedAt -__v"
      )
      .populate({
        path: "friends",
        select: "firstName lastName profileImage",
      })
      .populate({
        path: "requestReceived",
        select: "firstName lastName profileImage",
      })
      .populate({
        path: "requestSent",
        select: "firstName lastName profileImage",
      });

    await User.findByIdAndUpdate(userIdForFriend, {
      $push: { friends: userId },
      $pull: { requestSent: userId },
    });
    return userFriends;
  } catch (error) {
    return Promise.reject(error);
  }
};
const refuseFriendRequest = async (userId, userIdForFriend) => {
  try {
    const userFriends = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { requestReceived: userIdForFriend },
      },
      { new: true }
    )
      .select(
        "-firstName -lastName -profileImage -password -verified -city -workplace -college -highSchool -homeTown -gender -dateOfBirth -email -coverImage -createdAt -updatedAt -__v"
      )
      .populate({
        path: "friends",
        select: "firstName lastName profileImage",
      })
      .populate({
        path: "requestReceived",
        select: "firstName lastName profileImage",
      })
      .populate({
        path: "requestSent",
        select: "firstName lastName profileImage",
      });
    await User.findByIdAndUpdate(userIdForFriend, {
      $pull: { requestSent: userId },
    });
    return userFriends;
  } catch (error) {
    return Promise.reject(error);
  }
};

export {
  findFriends,
  getFriendsById,
  fetchFriendsOfUser,
  removeFriendById,
  addFriendRequest,
  removeFriendRequest,
  approveFriendRequest,
  refuseFriendRequest,
};
