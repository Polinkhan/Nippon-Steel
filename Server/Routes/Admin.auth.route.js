const express = require("express");
const createError = require("http-errors");
const db = require("../DB/mySQL_init");
const { genarateOTP } = require("../Healpers/functions");
const { mailTo } = require("../NodeMailer/nodemailer");
const { signAccessToken, verifyAccessToken } = require("../JWT/jwt_auth");
const router = express.Router();

router.get("/", verifyAccessToken, async (req, res, next) => {
  const { aud } = req.payload;
  console.log(aud);
  const query = `SELECT * FROM AdminCredentials WHERE Email=?`;

  db.query(query, [aud], (err, results, fields) => {
    console.log(results);
    if (err) next(err);
    else res.send(results[0]);
  });
});

router.post("/login", async (req, res, next) => {
  const { email, pass } = req.body;
  console.log(req.body);
  let OTP, TIME, RESULT;

  const query0 = `SELECT data FROM AppSettings WHERE Name=?`;
  const query1 = `SELECT * FROM AdminCredentials WHERE Email=? and Password=?`;
  const query2 = `UPDATE AdminCredentials SET OTP=?,OTP_created=? WHERE email=?`;

  const handleQuery2 = async () => {
    const message = await mailTo(email, OTP, TIME, true);
    res.send({ OtpService: true, message, email });
  };

  const handleQuery0 = async (err, [results], fields) => {
    const { data } = results;
    if (data === "disable") {
      const accessToken = await signAccessToken(email, pass);
      res.send({ OtpService: false, accessToken, currentUser: RESULT });
    } else {
      OTP = genarateOTP();
      TIME = new Date().getTime();
      db.query(query2, [OTP, TIME, email], handleQuery2);
    }
  };

  const handleQuery1 = (err, results, fields) => {
    if (err) next(err);
    else {
      if (results.length) {
        RESULT = results[0];
        db.query(query0, ["TwoWayVerification"], handleQuery0);
      } else next(createError.BadRequest("Invalid User ID or Password"));
    }
  };

  db.query(query1, [email, pass], handleQuery1);
});

router.post("/verifyOtp", async (req, res, next) => {
  const { OTP, email, pass } = req.body;
  const query = `SELECT * FROM AdminCredentials WHERE Email=?`;

  db.query(query, [email], async (err, results, fields) => {
    if (err) next(err);
    else {
      const isMatched = results[0].OTP === OTP;
      if (isMatched) {
        const accessToken = await signAccessToken(email, pass);
        res.send({ accessToken, currentUser: results[0] });
      } else next(createError.BadRequest("OTP not matched !!"));
    }
  });
});

router.post("/createAdmin", async (req, res, next) => {
  const { accountLabel, email, fullName, pass } = req.body;
  const query =
    "INSERT INTO `AdminCredentials`(Email, FullName, Password, AccountLavel) VALUES (?,?,?,?)";
  db.query(query, [email, fullName, pass, accountLabel], async (err) => {
    if (err) next(err);
    else res.send({ message: "Account Created" });
  });
});

module.exports = router;
