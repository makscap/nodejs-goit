const User = require("../models/user");
const bcrypt = require("bcryptjs");

const registration = async (email, password) => {
  const maybeUser = await User.findOne({ email });
  if (maybeUser) {
    throw new Error("Такой юзер существует!");
  }

  const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  return await User.create({ email, password: encryptedPassword });
};

module.exports = { registration };
