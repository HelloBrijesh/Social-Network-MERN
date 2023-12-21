import User from "../models/user.model.js";

const getFriendsById = async (userId) => {
  try {
    const userFriends = await User.findById(userId).select(
      "-password -verified -city -workplace -college -highSchool -homeTown -gender -dateOfBirth -email -coverImage -createdAt -updatedAt -__v"
    );
    return userFriends;
  } catch (error) {
    return Promise.reject(error);
  }
};
const removeFriendsById = async (userId, userIdOfFriend) => {
  try {
    const userFriends = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { friends: userIdOfFriend },
      },
      { new: true }
    ).select(
      "-password -verified -city -workplace -college -highSchool -homeTown -gender -dateOfBirth -email -coverImage -createdAt -updatedAt -__v"
    );

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
    ).select(
      "-password -verified -city -workplace -college -highSchool -homeTown -gender -dateOfBirth -email -coverImage -createdAt -updatedAt -__v"
    );

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
    ).select(
      "-password -verified -city -workplace -college -highSchool -homeTown -gender -dateOfBirth -email -coverImage -createdAt -updatedAt -__v"
    );

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
    const userFriends = await User.findByIdAndUpdate(userId, {
      $push: { friends: userIdForFriend },
      $pull: { requestReceived: userIdForFriend },
    }).select(
      "-password -verified -city -workplace -college -highSchool -homeTown -gender -dateOfBirth -email -coverImage -createdAt -updatedAt -__v"
    );

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
    const userFriends = await User.findByIdAndUpdate(userId, {
      $pull: { requestReceived: userIdForFriend },
    }).select(
      "-password -verified -city -workplace -college -highSchool -homeTown -gender -dateOfBirth -email -coverImage -createdAt -updatedAt -__v"
    );

    await User.findByIdAndUpdate(userIdForFriend, {
      $pull: { requestSent: userId },
    });
    return userFriends;
  } catch (error) {
    return Promise.reject(error);
  }
};

export {
  getFriendsById,
  removeFriendsById,
  addFriendRequest,
  removeFriendRequest,
  approveFriendRequest,
  refuseFriendRequest,
};
