const express = require("express");
const createError = require("http-errors");
const db = require("../DB/mySQL_init");
const router = express.Router();

router.get("/viewData/:id", async (req, res, next) => {
  const { id } = req.params;
  let query =
    "SELECT Credentials.UserID,Email,Password,FullName,DateOfBirth,Company,Title,Mobile,Nationality,Type,Bank FROM `Credentials` join Information ON Credentials.UserID = Information.UserID WHERE BlockStatus = ?";
  if (id === "all")
    query =
      "SELECT * FROM `Credentials` join Information ON Credentials.UserID = Information.UserID";
  try {
    const [result] = await db.query(query, [id]);
    res.send(result);
  } catch (err) {
    next(err);
  }
});

router.get("/viewTable/:id", async (req, res, next) => {
  const { id } = req.params;
  let query = `SELECT * FROM  ${id}`;
  try {
    const [result] = await db.query(query);
    res.send(result);
  } catch (err) {
    next(err);
  }
});

router.get("/viewData/query/:text", async (req, res, next) => {
  const { text } = req.params;
  const query1 = `SELECT Credentials.UserID,Email,Password,FullName,DateOfBirth,Company,Title,Mobile,Nationality,Type,Bank FROM Credentials join Information ON Credentials.UserID = Information.UserID WHERE Credentials.UserID LIKE '%${text}%'`;
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
    Password,
    FullName,
    DateOfBirth,
    Company,
    Title,
    Mobile,
    Nationality,
    Type,
    Bank,
  } = req.body;

  const query1 =
    "UPDATE `Credentials` SET Email=?, Password=? WHERE UserID = ?";
  const query2 =
    "UPDATE `Information` SET fullName=?,dateOfBirth=?,company=?,title=?,mobile=?,nationality=?,type=?,bank=? WHERE UserID = ?";

  try {
    await db.query(query1, [Email, Password, UserID]);
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

    await db.query(query1, [id]);
    await db.query(query2, [id]);

    res.send({ message: "User Deleted Successfully" });
  } catch (err) {
    next(err);
  }
});

router.post("/blockUser/:id", async (req, res, next) => {
  const { UserID } = req.body;
  const { id } = req.params;
  try {
    const query = "UPDATE `Credentials` SET BlockStatus=? WHERE UserID = ?";
    await db.query(query, [id, UserID]);

    res.send({ message: "User Deleted Successfully" });
  } catch (err) {
    next(err);
  }
});

router.get("/app/types", async (req, res, next) => {
  try {
    const query = `SELECT * FROM DocumentTypes`;
    const [result] = await db.query(query);
    res.send(result);
  } catch (err) {
    next(err);
  }
});

router.post("/app/types/:id", async (req, res, next) => {
  const { id } = req.params;
  const { ID, Type } = req.body;
  try {
    if (id === "add") {
      const query = "INSERT INTO DocumentTypes (Type) VALUES (?)";
      await db.query(query, ["unKnown"]);
      res.send();
    } else if (id === "delete") {
      const query = "DELETE FROM `DocumentTypes` WHERE ID = ?";
      await db.query(query, [ID]);
      res.send();
    } else if (id === "update") {
      const query = "UPDATE DocumentTypes SET Type = ? WHERE ID = ?";
      await db.query(query, [Type, ID]);
      res.send();
    }
  } catch (err) {
    next(err);
  }
});

router.get("/app/adminContact", async (req, res, next) => {
  try {
    const query = `SELECT * FROM AdminContactList`;
    const [result] = await db.query(query);
    res.send(result);
  } catch (err) {
    next(err);
  }
});

router.post("/app/adminContact/:id", async (req, res, next) => {
  const { id } = req.params;
  const { ID, FullName, Email, Number } = req.body;
  try {
    if (id === "add") {
      const query = "INSERT INTO AdminContactList (FullName) VALUES (?)";
      await db.query(query, ["admin"]);
      res.send();
    } else if (id === "delete") {
      const query = "DELETE FROM `AdminContactList` WHERE ID = ?";
      await db.query(query, [ID]);
      res.send();
    } else if (id === "update") {
      const query =
        "UPDATE AdminContactList SET FullName = ?, Email = ?, Number = ? WHERE ID = ?";
      await db.query(query, [FullName, Email, Number, ID]);
      res.send();
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
