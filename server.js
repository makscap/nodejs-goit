const app = require("./app");
const mongoose = require("mongoose");
const { DB_HOST } = require("./config/index");
const path = require("path");
const express = require("express");

mongoose.connect(DB_HOST).then(() => {
  app.use("/static", express.static(path.join(__dirname, "public")));

  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  });
});
