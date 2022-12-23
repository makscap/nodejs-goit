const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// const { registration } = require("../services/users");
const User = require("../models/user");
const Token = require("../models/token");
const { SECRET } = require("../config/index");

// const isValidPassword = (loggedPas, pas) => {
//   return bcrypt.compareSync(loggedPas, pas);
// };

const resetLinkControllers = async (req, res, next) => {
  try {
    // const schema = Joi.object({ email: Joi.string().email().required() });
    // const { error } = schema.validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send("user with given email doesn't exist");

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        // token: jwt.sign(payload, SECRET, { expiresIn: "20m" }),
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }
    console.log("🚀 ~ file: user.js:24 ~ resetLinkControllers ~ token", token);

    const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
    await sendEmail(user.email, "Password reset", link);

    res.send("password reset link sent to your email account");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
};

const resetPasswordControllers = async (req, res, next) => {};

module.exports = {
  resetLinkControllers,
  resetPasswordControllers,
};
