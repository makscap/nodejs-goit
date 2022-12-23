const { Schema, model } = require("mongoose");
const SCHEMA = require("../consts/schemas");

const user = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    nickname: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model(SCHEMA.USERS, user);

module.exports = User;
