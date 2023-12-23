import User from "../models/user.model.js";

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select(
      "-password -verified -updatedAt"
    );
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

const getPasswordById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user.password;
  } catch (error) {
    return Promise.reject(error);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

const createUser = async (
  firstName,
  lastName,
  email,
  password,
  dateOfBirth,
  gender
) => {
  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      gender,
    });

    const createdUser = await newUser.save();
    return createdUser;
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateUserToVerified = async (userId) => {
  try {
    await User.findByIdAndUpdate(userId, {
      verified: true,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

const updatePasswordByUserId = async (userId, newPassword) => {
  try {
    await User.findByIdAndUpdate(userId, {
      password: newPassword,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateUserProfile = async (
  userId,
  firstName,
  lastName,
  city,
  homeTown,
  college,
  highSchool,
  workplace
) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName: firstName,
        lastName: lastName,
        city: city,
        homeTown: homeTown,
        college: college,
        highSchool: highSchool,
        workplace: workplace,
      },
      {
        new: true,
      }
    ).select("-password -verified -updatedAt");
    return updatedUser;
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateUserCoverImageById = async (userId, coverImageUrl) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        coverImage: coverImageUrl,
      },
      {
        new: true,
      }
    ).select("-password -verified -updatedAt");
    return updatedUser;
  } catch (error) {
    return Promise.reject(error);
  }
};

const deleteUserCoverImageById = async (userId) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        coverImage: "",
      },
      {
        new: true,
      }
    ).select("-password -verified -updatedAt");
    return updatedUser;
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateUserProfileImageById = async (userId, profileImageUrl) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profileImage: profileImageUrl,
      },
      {
        new: true,
      }
    ).select("-password -verified -updatedAt");
    return updatedUser;
  } catch (error) {
    return Promise.reject(error);
  }
};

const deleteUserProfileImageById = async (userId) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profileImage: "",
      },
      {
        new: true,
      }
    ).select("-password -verified -updatedAt");
    return updatedUser;
  } catch (error) {
    return Promise.reject(error);
  }
};

export {
  getUserById,
  getPasswordById,
  getUserByEmail,
  createUser,
  updateUserToVerified,
  updatePasswordByUserId,
  updateUserProfile,
  updateUserCoverImageById,
  updateUserProfileImageById,
  deleteUserProfileImageById,
  deleteUserCoverImageById,
};
