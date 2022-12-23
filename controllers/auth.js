const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendGrid");

const { registration } = require("../services/users");
const User = require("../models/user");
const { SECRET } = require("../config/index");

const isValidPassword = (loggedPas, pas) => {
  return bcrypt.compareSync(loggedPas, pas);
};

const signInControllers = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    await registration(email, password);
    res.status(201).json({ email });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

const loginControllers = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User was not found",
      status: "404 Not Found",
    });
  }

  if (!isValidPassword(password, user.password)) {
    return res.status(401).json({
      message: "Email or password is wrong",
      status: "401 Unauthorized",
    });
  }

  const payload = {
    id: user._id,
    email: user.email,
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
  res.status(200).json({
    status: "200 OK",
    data: {
      token,
      user: {
        email,
      },
    },
  });
};
const logoutControllers = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    res.status(401).json({
      message: "Token is wrong",
      status: "401 Unauthorized",
    });
  }

  jwt.destroy(token, SECRET);

  return res.status(200).json({
    message: "Succsesful",
    status: "200 Succsesful",
  });
};

// Как сделать проверку на восстановление пароля?
// Нужно ли дать ключ в юзера(тру, фолс) такой как "Подтвержденный е-мейлом" или не нужно ?
// И если подтверждаем е - майлом, то делаем запись - тру и дальше выполняем код...

const forgetPasswordControllers = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User was not found",
      status: "404 Not Found",
    });
  }

  sendEmail();

  res.status(200).json({
    status: "200 OK",
    data: {
      message: "Succsesful",
    },
  });
};

module.exports = {
  signInControllers,
  loginControllers,
  logoutControllers,
  forgetPasswordControllers,
};
