import User from "../models/user.model.js";

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select(
      "-password -verified -updatedAt -__V"
    );
    return user;
  } catch (error) {
    return error;
  }
};
const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    return error;
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
  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    gender,
  });
  try {
    const createdUser = await newUser.save();
    return createdUser;
  } catch (error) {
    return error;
  }
};

const updateUserToVerified = async (userId) => {
  try {
    await User.findByIdAndUpdate(userId, {
      verified: true,
    });
  } catch (error) {
    return error;
  }
};

const updatePasswordByUserId = async (userId, newPassword) => {
  try {
    await User.findByIdAndUpdate(userId, {
      password: newPassword,
    });
  } catch (error) {
    return error;
  }
};

export {
  getUserById,
  getUserByEmail,
  createUser,
  updateUserToVerified,
  updatePasswordByUserId,
};
