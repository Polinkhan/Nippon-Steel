const express = require("express");
const createError = require("http-errors");
const { getAuthDetails, getUserDetails } = require("../Box/box");
const { verifyAccessToken, signAccessToken } = require("../JWT/jwt_auth");
const db = require("../DB/mySQL_init");
const { mailTo } = require("../NodeMailer/nodemailer");
const { genarateOTP } = require("../Healpers/functions");
const router = express.Router();

router.get("/", verifyAccessToken, async (req, res, next) => {
  const { id, pass } = req.payload;
  console.log({ id, pass });
  const query1 =
    "SELECT Credentials.UserID,FullName,Email,OTP,Title FROM `Credentials` join Information ON Credentials.UserID = Information.UserID WHERE Credentials.UserID = ? and Password = ? and blockStatus = ?";
  try {
    const [result] = await db.query(query1, [id, pass, "unblock"]);
    if (result.length) {
      res.send({ currentUser: result[0] });
    } else next(createError.BadRequest("Something Went Wrong !!"));
  } catch (err) {
    next(err);
  }
});

router.post("/requestOTP", async (req, res, next) => {
  const { id, pass } = req.body;

  const query1 = `SELECT * FROM Credentials WHERE UserID=? and Password=?`;
  const query2 = `UPDATE Credentials SET OTP=?,OTP_created=? WHERE UserID=?`;

  try {
    const [result] = await db.query(query1, [id, pass]);
    if (result.length) {
      if (result[0].BlockStatus === "block") {
        next(createError.BadRequest("Account is in blocklist"));
      } else {
        const OTP = genarateOTP();
        const time = new Date().getTime();
        await db.query(query2, [OTP, time, id]);
        const message = await mailTo(result[0].Email, OTP, time);
        res.send({ message, Email: result[0].Email });
      }
    } else next(createError.BadRequest("Invalid User ID or Password"));
  } catch (err) {
    next(err);
  }
});

router.post("/verifyOtp", async (req, res, next) => {
  const { id, pass, otp } = req.body;
  console.log(48, id, otp);
  const query1 =
    "SELECT Credentials.UserID,FullName,Email,OTP,Title FROM `Credentials` join Information ON Credentials.UserID = Information.UserID WHERE Credentials.UserID = ?";

  try {
    const [result] = await db.query(query1, [id]);
    console.log(result[0].OTP, otp);
    const isMatched = result[0].OTP === otp;

    if (isMatched) {
      const accessToken = await signAccessToken(id, pass);
      res.send({ accessToken, currentUser: result[0] });
    } else next(createError.BadRequest("OTP not matched !!"));
  } catch (err) {
    next(err);
  }
});

router.post("/changePassword", async (req, res, next) => {
  const { id, pass } = req.body;
  const query = `UPDATE Credentials SET Password=? WHERE UserID=?`;

  try {
    db.query(query, [pass, id]);
    const accessToken = await signAccessToken(id, pass);
    res.send({ accessToken });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
