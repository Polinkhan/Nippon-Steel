const express = require("express");
const createError = require("http-errors");
const db = require("../DB/mySQL_init");
const { genarateOTP } = require("../Healpers/functions");
const { mailTo } = require("../NodeMailer/nodemailer");
const { signAccessToken, verifyAccessToken } = require("../JWT/jwt_auth");
const router = express.Router();

router.get("/", verifyAccessToken, async (req, res, next) => {
  const { aud } = req.payload;
  const query = `SELECT * FROM AdminCredentials WHERE Email=?`;

  db.query(query, [aud], (err, results, fields) => {
    if (err) next(err);
    else {
      console.log(results);
      res.send({});
    }
  });
});

router.post("/login", async (req, res, next) => {
  const { email, pass } = req.body;
  console.log(email, pass);
  const query1 = `SELECT * FROM AdminCredentials WHERE Email=? and Password=?`;
  const query2 = `UPDATE AdminCredentials SET OTP=?,OTP_created=? WHERE email=?`;

  db.query(query1, [email, pass], (err, results, fields) => {
    if (err) next(err);
    else {
      if (results.length) {
        const OTP = genarateOTP();
        const time = new Date().getTime();
        db.query(query2, [OTP, time, email], async () => {
          const message = await mailTo(email, OTP, time, true);
          res.send({ message, email });
        });
      } else next(createError.BadRequest("Invalid User ID or Password"));
    }
  });
});

router.post("/verifyOtp", async (req, res, next) => {
  const { OTP, email, pass } = req.body;
  const query = `SELECT * FROM AdminCredentials WHERE Email=?`;
  try {
    db.query(query, [email], (err, results, fields) => {});
    const isMatched = result[0].OTP === OTP;

    if (isMatched) {
      const accessToken = await signAccessToken(email, pass);
      res.send({ accessToken, currentUser: result[0] });
    } else next(createError.BadRequest("OTP not matched !!"));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
