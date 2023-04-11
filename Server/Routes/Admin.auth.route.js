const express = require("express");
const createError = require("http-errors");
const db = require("../DB/mySQL_init");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.send({});
  } catch (err) {
    next(err);
  }
});

router.get("/dfsd", async (req, res, next) => {
  try {
    res.send({});
  } catch (err) {
    next(err);
  }
});

module.exports = router;
