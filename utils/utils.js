const User = require("../models/user");

const findById = async (id) => {
  return await User.findOne({ _id: id });
};

const updateById = async (id, data) => {
  return await User.findOneAndUpdate({ _id: id }, { ...data }, { new: true });
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};
const findByVerifyToken = async (verifyToken) => {
  return await User.findOne({ verifyToken });
};

const updateVerifyToken = async (id, verify, verifyToken) => {
  return await User.updateOne({ _id: id }, { verify, verifyToken });
};

const create = async ({ name, email, password, verify, verifyToken }) => {
  const user = new User({ name, email, password, verify, verifyToken });
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateAvatar = async (id, avatar) => {
  return await User.updateOne({ _id: id }, { avatarURL: avatar });
};

const findByToken = async (token) => {
  return await User.findOne({ token });
};

module.exports = {
  updateById,
  findById,
  create,
  updateToken,
  findByEmail,
  updateAvatar,
  findByVerifyToken,
  updateVerifyToken,
  findByToken,
};
