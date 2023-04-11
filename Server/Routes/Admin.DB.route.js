const express = require("express");
const createError = require("http-errors");
const db = require("../DB/mySQL_init");
const router = express.Router();

router.get("/viewData", async (req, res, next) => {
  const { id } = req.params;
  const query =
    "SELECT Credentials.UserID,Email,FullName,DateOfBirth,Company,Title,Mobile,Nationality,Type,Bank FROM `Credentials` join Information ON Credentials.UserID = Information.UserID";
  try {
    const [result] = await db.query(query);
    res.send(result);
  } catch (err) {
    next(err);
  }
});

router.get("/viewData/query/:text", async (req, res, next) => {
  const { text } = req.params;
  console.log(text);
  const query1 = `SELECT Credentials.UserID,Email,FullName,DateOfBirth,Company,Title,Mobile,Nationality,Type,Bank FROM Credentials join Information ON Credentials.UserID = Information.UserID WHERE Credentials.UserID LIKE '%${text}%'`;
  const query2 = `SELECT Credentials.UserID,Email,FullName,DateOfBirth,Company,Title,Mobile,Nationality,Type,Bank FROM Credentials join Information ON Credentials.UserID = Information.UserID WHERE Email LIKE '%${text}%'`;
  try {
    const [result] = await db.query(query1);
    // const [result2] = await db.query(query2);

    // const result = [...result1, ...result2];
    res.send(result);
  } catch (err) {
    next(err);
  }
});

router.post("/userRegistration", async (req, res, next) => {
  try {
    const { Credentials, Information } = req.body;
    const { UserID, email, password } = Credentials;
    const {
      fullName,
      dateOfBirth,
      company,
      title,
      mobile,
      nationality,
      type,
      bank,
    } = Information;

    const query1 =
      "INSERT INTO `Credentials`(`UserID`, `Email`, `Password`) VALUES (?,?,?)";
    const query2 =
      "INSERT INTO `Information`(`UserID`,`fullName`, `dateOfBirth`, `company`, `title`, `mobile`, `nationality`, `type`, `bank`) VALUES (?,?,?,?,?,?,?,?,?)";

    await db.query(query1, [UserID, email, password]);
    await db.query(query2, [
      UserID,
      fullName,
      dateOfBirth,
      company,
      title,
      mobile,
      nationality,
      type,
      bank,
    ]);

    res.send({ message: "User Created Successfully" });
  } catch (err) {
    next(err);
  }
});

router.post("/updateUser/:id", async (req, res, next) => {
  const { id } = req.params;
  const {
    UserID,
    Email,
    FullName,
    DateOfBirth,
    Company,
    Title,
    Mobile,
    Nationality,
    Type,
    Bank,
  } = req.body;

  const query1 = "UPDATE `Credentials` SET Email=? WHERE UserID = ?";

  const query2 =
    "UPDATE `Information` SET fullName=?,dateOfBirth=?,company=?,title=?,mobile=?,nationality=?,type=?,bank=? WHERE UserID = ?";

  try {
    console.log(req.body);
    await db.query(query1, [Email, UserID]);
    await db.query(query2, [
      FullName,
      DateOfBirth,
      Company,
      Title,
      Mobile,
      Nationality,
      Type,
      Bank,
      UserID,
    ]);
    res.send({ message: "Successfully Updated" });
  } catch (err) {
    next(err);
  }
});

router.delete("/deleteUser/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const query1 = "DELETE FROM `Credentials` WHERE UserID =  ?";
    const query2 = "DELETE FROM `Information` WHERE UserID =  ?";

    console.log(id);
    await db.query(query1, [id]);
    await db.query(query2, [id]);

    res.send({ message: "User Deleted Successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
