const express = require("express");
const User = require("../../models/user");

const {
  resetLinkControllers,
  resetPasswordControllers,
} = require("../../controllers/user");

const router = express.Router();

router.get("/all", async (req, res, next) => {
  // User.findByIdAndUpdate(req.user._id)
  User.find({}, function (err, users) {
    const userMap = {};

    users.forEach(function (user) {
      userMap[user._id] = user;
    });

    res.status(200).json({
      status: "200 OK",
      data: {
        users: {
          userMap,
        },
      },
    });
  });
});

router.patch("/update", async (req, res, next) => {
  const { email, newEmail } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "User doesn't exist!",
    });
  }

  const id = user._id;
  try {
    await User.findByIdAndUpdate(
      id,
      { email: newEmail }
      // function (err, result) {
      //   if (err) {
      //     res.send(err);
      //   } else {
      //     res.send(result);
      //   }
      // }
    );
    return res.status(200).json({
      status: "200 OK",
      data: {
        users: {
          email: newEmail,
        },
      },
    });
  } catch (err) {
    console.log(err);

    return res.status(204).json({
      status: "204 No Content",
      data: {
        message: "Invalid credentials!",
      },
    });
  }
});

router.delete("/delete", async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "User doesn't exist!",
    });
  }

  const id = user._id;
  try {
    await User.deleteOne(id);
    return res.status(200).json({
      status: "200 OK",
      data: {
        users: {
          email: "",
          token: "",
        },
      },
    });
  } catch (err) {
    console.log(err);

    return res.status(204).json({
      status: "204 No Content",
      data: {
        message: "Invalid credentials!",
      },
    });
  }
});

router.post("/password-reset", resetLinkControllers);
router.post("/password-reset/:userId/:token", resetPasswordControllers);

module.exports = router;
