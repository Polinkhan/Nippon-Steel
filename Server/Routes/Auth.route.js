const express = require("express");
const createError = require("http-errors");
const { getAuthDetails, getUserDetails } = require("../Box/box");
const { verifyAccessToken, signAccessToken } = require("../JWT/jwt_auth");
const db = require("../DB/mySQL_init");
const { mailTo } = require("../NodeMailer/nodemailer");
const { genarateOTP } = require("../Healpers/functions");
const router = express.Router();

const CheckServerMaintanence = () => {
  return new Promise((resolve, reject) => {
    const query = "Select data From AppSettings WHERE Name = ?";
    db.query(query, ["Maintenance"], (err, [{ data }]) => {
      if (err) reject(err);
      resolve(data === "enable");
    });
  });
};

router.get("/", verifyAccessToken, async (req, res, next) => {
  const { id, pass } = req.payload;
  const flag = await CheckServerMaintanence();
  if (flag) {
    console.log(flag);
    next(createError.BadGateway("Server is Under maintenance"));
  } else {
    const query1 =
      "SELECT Credentials.UserID,FullName,Email,OTP,Title FROM `Credentials` join Information ON Credentials.UserID = Information.UserID WHERE Credentials.UserID = ? and Password = ? and blockStatus = ?";

    db.query(query1, [id, pass, "unblock"], (err, results, fields) => {
      if (err) next(err);
      else {
        if (results.length) {
          res.send({ currentUser: results[0] });
        } else next(createError.BadRequest("Something Went Wrong !!"));
      }
    });
  }
});

router.post("/login", async (req, res, next) => {
  const { id, pass } = req.body;
  let EMAIL, OTP, TIME;

  const query0 = `SELECT data FROM AppSettings WHERE Name=?`;
  const query1 = `SELECT * FROM Credentials WHERE UserID=? and Password=?`;
  const query2 = `UPDATE Credentials SET OTP=?,OTP_created=? WHERE UserID=?`;
  const query3 =
    "SELECT Credentials.UserID,FullName,Email,OTP,Title FROM `Credentials` join Information ON Credentials.UserID = Information.UserID WHERE Credentials.UserID = ?";

  const handleQuery3 = async (err, results, fields) => {
    console.log("handleQuery3");
    if (err) next(err);
    else {
      const accessToken = await signAccessToken(id, pass);
      res.send({
        OtpService: false,
        accessToken,
        User: results[0],
      });
    }
  };

  const handleQuery2 = async (err) => {
    console.log("handleQuery2");
    if (err) next(err);
    else {
      console.log("Mailing");
      await mailTo(EMAIL, OTP, TIME);
      res.send({ OtpService: true, Email: EMAIL });
    }
  };

  const handleQuery0 = (err, [results], fields) => {
    console.log("handleQuery0");
    const { data } = results;
    if (data === "disable") {
      db.query(query3, [id], handleQuery3);
    } else {
      OTP = genarateOTP();
      TIME = new Date().getTime();
      db.query(query2, [OTP, TIME, id], handleQuery2);
    }
  };

  const handleQuery1 = (err, results) => {
    console.log(results.length);
    if (results.length) {
      results[0].BlockStatus === "block" &&
        next(createError.BadRequest("Account is in blocklist"));
      EMAIL = results[0].Email;
      db.query(query0, ["TwoWayVerification"], handleQuery0);
    } else {
      next(createError.BadRequest("Invalid User ID or Password"));
    }
  };

  const flag = await CheckServerMaintanence();
  if (flag) next(createError.BadGateway("Server is Under maintenance"));
  else db.query(query1, [id, pass], handleQuery1);
});

router.post("/verifyOtp", async (req, res, next) => {
  const { id, pass, otp } = req.body;
  const query1 =
    "SELECT Credentials.UserID,FullName,Email,OTP,Title FROM `Credentials` join Information ON Credentials.UserID = Information.UserID WHERE Credentials.UserID = ?";

  db.query(query1, [id], async (err, results, fields) => {
    if (err) next(err);
    else {
      const isMatched = results[0].OTP === otp;
      if (isMatched) {
        const accessToken = await signAccessToken(id, pass);
        res.send({ accessToken, User: results[0] });
      } else next(createError.BadRequest("OTP not matched !!"));
    }
  });
});

router.post("/changePassword", async (req, res, next) => {
  const { id, pass } = req.body;
  const query = `UPDATE Credentials SET Password=? WHERE UserID=?`;

  db.query(query, [pass, id], async (err, results, fields) => {
    if (err) next(err);
    else {
      const accessToken = await signAccessToken(id, pass);
      res.send({ accessToken });
    }
  });
});

router.get("/test", async (req, res, next) => {
  res.send({});
});

module.exports = router;
