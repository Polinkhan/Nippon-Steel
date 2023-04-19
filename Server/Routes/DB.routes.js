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

  db.query(query, [id], (err, results, fields) => {
    if (err) next(err);
    else res.send(results[0]);
  });
});

router.get("/app/typeList", async (req, res, next) => {
  const query = "SELECT * From DocumentTypes";

  db.query(query, (err, results, fields) => {
    if (err) next(err);
    else res.send(results);
  });
});

router.get("/adminContactList", async (req, res, next) => {
  const query = "SELECT * From AdminContactList";
  db.query(query, (err, results, fields) => {
    if (err) next(err);
    else res.send(results);
  });
});

router.post("/reportProblem", async (req, res, next) => {
  const { UserID, subject, description, data } = req.body;
  const query =
    "INSERT INTO `ReportProblems`(`UserID`, `Subject`, `Description`,`ReportTime`,`DeviceDetails`) VALUES (?,?,?,?,?)";
  await db.query(
    query,
    [UserID, subject, description, new Date().getTime(), JSON.stringify(data)],
    (err, results, fields) => {
      if (err) next(err);
      else res.send();
    }
  );
});

router.post("/getPayslipData/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { month, year, type } = req.body;
    const { name, fileUrl } = await getPDFURL(id, month, year, type);
    res.send({ name, fileUrl });
  } catch (err) {
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
