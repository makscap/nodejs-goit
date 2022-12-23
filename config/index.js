require("dotenv").config();

module.exports = {
  DB_HOST: process.env.DB_HOST,
  SECRET: process.env.SECRET,
  API_KEY_SENDGRID: process.env.API_KEY_SENDGRID,
};
