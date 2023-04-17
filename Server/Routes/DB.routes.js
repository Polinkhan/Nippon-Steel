const express = require("express");
const { getPDFURL, getContactList, getAdPictures } = require("../Box/box");
const router = express.Router();
const { getUserDetails } = require("../Box/box");
const { ObjectToArray } = require("../Healpers/functions");
const db = require("../DB/mySQL_init");
const multer = require("multer");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, __dirname + "/uploads"); //you tell where to upload the files,
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now() + ".png");
//   },
// });

// var upload = multer({
//   storage: storage,
//   onFileUploadStart: function (file) {
//     console.log(file.originalname + " is starting ...");
//   },
// });

router.get("/viewData/:id", async (req, res, next) => {
  const { id } = req.params;
  const query =
    "SELECT Credentials.UserID,FullName,Title,FullName,Email,DateOfBirth,Company,Mobile,Nationality,Type,Bank FROM `Credentials` join Information ON Credentials.UserID = Information.UserID WHERE Credentials.UserID = ? ";
  try {
    const [result] = await db.query(query, [id]);
    res.send(result[0]);
  } catch (err) {
    next(err);
  }
});

router.get("/app/typeList", async (req, res, next) => {
  const query = "SELECT * From DocumentTypes";
  try {
    const [result] = await db.query(query);
    res.send(result);
  } catch (err) {
    next(err);
  }
});

router.post("/uploadProfilePicture", async (req, res) => {
  try {
    console.log(50, req.body);
    res.send({ congrats: "data recieved" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

router.get("/adminContactList", async (req, res, next) => {
  try {
    const query = "SELECT * From AdminContactList";
    const [result] = await db.query(query);
    res.send(result);
  } catch (err) {
    next(err);
  }
});

router.post("/reportProblem", async (req, res, next) => {
  try {
    const { UserID, subject, description, data } = req.body;
    const query =
      "INSERT INTO `ReportProblems`(`UserID`, `Subject`, `Description`,`ReportTime`,`DeviceDetails`) VALUES (?,?,?,?,?)";
    await db.query(query, [
      UserID,
      subject,
      description,
      new Date().getTime(),
      JSON.stringify(data),
    ]);
    res.send();
  } catch (err) {
    next(err);
  }
});

console.log(new Date().getTime());

router.post("/getPayslipData/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { month, year, type } = req.body;
    const { name, fileUrl } = await getPDFURL(id, month, year, type);
    res.send({ name, fileUrl });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/dashboardPicture", async (req, res, next) => {
  try {
    const images = await getAdPictures();
    res.send(images);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
