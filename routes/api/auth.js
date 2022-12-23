const express = require("express");
const auth = require("../../services/auth/auth");

const {
  signInControllers,
  loginControllers,
  logoutControllers,
} = require("../../controllers/auth");

const router = express.Router();

router.post("/signup", signInControllers);
router.post("/login", loginControllers);
router.post("/logout", logoutControllers);

module.exports = router;
