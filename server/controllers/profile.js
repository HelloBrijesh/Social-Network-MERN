import { User } from "../models/User";

export const getProfile = async (req, res, next) => {
  const userId = req.userId;

  let existingUser;
  let profileDetail;
  try {
    existingUser = await User.findOne({ id: userId });
    profileDetail = existingUser.about;
  } catch (error) {
    return next(error);
  }

  res.json({ profileDetail });
};

export const addProfile = async (req, res, next) => {
  const { workplace, college, highSchool, homeTown, city, contact } = req.body;

  const userId = req.userId;

  let about = {
    workplace,
    college,
    highSchool,
    homeTown,
    city,
    contact,
  };
  try {
    await User.findByIdAndUpdate(userId, {
      about: about,
    });
  } catch (error) {
    return next(error);
  }

  res.json({ status: "ok" });
};
