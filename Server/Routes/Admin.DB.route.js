const express = require("express");
const createError = require("http-errors");
const db = require("../DB/mySQL_init");
const { getAvailableBoxData } = require("../Box/box");
const { Query } = require("../DB/CustomPromise");
const router = express.Router();

router.get("/viewData/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  let query =
    "SELECT Credentials.UserID,Email,Password,FullName,DateOfBirth,Company,Title,Mobile,Nationality,Type,Bank FROM `Credentials` join Information ON Credentials.UserID = Information.UserID WHERE BlockStatus = ?";
  if (id === "all")
    query =
      "SELECT * FROM `Credentials` join Information ON Credentials.UserID = Information.UserID";

  db.query(query, [id], (err, results, fields) => {
    console.log(results);
    if (err) next(err);
    else res.send(results);
  });
});

router.get("/viewTable/:id", async (req, res, next) => {
  const { id } = req.params;
  let query = `SELECT * FROM  ${id}`;
  db.query(query, (err, results, fields) => {
    if (err) next(err);
    else res.send(results);
  });
});

router.get("/viewData/query/:text", async (req, res, next) => {
  const { text } = req.params;
  const query = `SELECT Credentials.UserID,Email,Password,FullName,DateOfBirth,Company,Title,Mobile,Nationality,Type,Bank FROM Credentials join Information ON Credentials.UserID = Information.UserID WHERE Credentials.UserID LIKE '%${text}%'`;
  try {
    db.query(query, (err, results, fields) => {
      if (err) next(err);
      else res.send(results);
    });
  } catch (err) {
    next(err);
  }
});

router.post("/userRegistration", async (req, res, next) => {
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

  db.query(query1, [UserID, email, password], (err, results, fields) => {
    if (err) next(err);
    else {
      db.query(
        query2,
        [
          UserID,
          fullName,
          dateOfBirth,
          company,
          title,
          mobile,
          nationality,
          type,
          bank,
        ],
        (err, results, fields) => {
          if (err) next(err);
          else res.send({ message: "User Created Successfully" });
        }
      );
    }
  });
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

  db.query(query1, [Email, Password, UserID], (err, results, fields) => {
    if (err) next(err);
    else {
      db.query(
        query2,
        [
          FullName,
          DateOfBirth,
          Company,
          Title,
          Mobile,
          Nationality,
          Type,
          Bank,
          UserID,
        ],
        (err, results, fields) => {
          if (err) next(err);
          else res.send({ message: "Successfully Updated" });
        }
      );
    }
  });
});

router.delete("/deleteUser/:id", async (req, res, next) => {
  const { id } = req.params;

  const query1 = "DELETE FROM `Credentials` WHERE UserID =  ?";
  const query2 = "DELETE FROM `Information` WHERE UserID =  ?";

  db.query(query1, [id], (err, results, fields) => {
    if (err) next(err);
    else {
      db.query(query2, [id], (err, results, fields) => {
        if (err) next(err);
        else res.send({ message: "User Deleted Successfully" });
      });
    }
  });
});

router.post("/blockUser/:id", async (req, res, next) => {
  const { UserID } = req.body;
  const { id } = req.params;

  const query = "UPDATE `Credentials` SET BlockStatus=? WHERE UserID = ?";
  db.query(query, [id, UserID], (err, results, fields) => {
    if (err) next(err);
    else res.send({ message: "User Deleted Successfully" });
  });
});

router.get("/app/types", async (req, res, next) => {
  const query = `SELECT * FROM DocumentTypes`;
  db.query(query, (err, results, fields) => {
    if (err) next(err);
    else res.send(results);
  });
});

router.post("/app/types/:id", async (req, res, next) => {
  const { id } = req.params;
  const { ID, Type } = req.body;
  if (id === "add") {
    const query = "INSERT INTO DocumentTypes (Type) VALUES (?)";
    db.query(query, ["unKnown"], (err, results, fields) => {
      if (err) next(err);
      else res.send();
    });
  } else if (id === "delete") {
    const query = "DELETE FROM `DocumentTypes` WHERE ID = ?";
    db.query(query, [ID], (err, results, fields) => {
      if (err) next(err);
      else res.send();
    });
  } else if (id === "update") {
    const query = "UPDATE DocumentTypes SET Type = ? WHERE ID = ?";
    db.query(query, [Type, ID], (err, results, fields) => {
      if (err) next(err);
      else res.send();
    });
  }
});

router.get("/app/adminContact", async (req, res, next) => {
  const query = `SELECT * FROM AdminContactList`;
  db.query(query, (err, results, fields) => {
    if (err) next(err);
    else res.send(results);
  });
});

router.post("/app/adminContact/:id", async (req, res, next) => {
  const { id } = req.params;
  const { ID, FullName, Email, Number } = req.body;

  if (id === "add") {
    const query = "INSERT INTO AdminContactList (FullName) VALUES (?)";
    db.query(query, ["admin"], (err, results, fields) => {
      if (err) next(err);
      else res.send();
    });
  } else if (id === "delete") {
    const query = "DELETE FROM `AdminContactList` WHERE ID = ?";
    db.query(query, [ID], (err, results, fields) => {
      if (err) next(err);
      else res.send();
    });
  } else if (id === "update") {
    const query =
      "UPDATE AdminContactList SET FullName = ?, Email = ?, Number = ? WHERE ID = ?";
    db.query(query, [FullName, Email, Number, ID], (err, results, fields) => {
      if (err) next(err);
      else res.send();
    });
  }
});

router.get("/adminData", async (req, res, next) => {
  const query = "SELECT * From AdminCredentials";
  db.query(query, async (err, results) => {
    if (err) next(err);
    else res.send(results);
  });
});

router.delete("/deleteAdmin/:id", async (req, res, next) => {
  const { id } = req.params;
  const query = "DELETE FROM `AdminCredentials` WHERE ID=?";
  db.query(query, [id], async (err) => {
    if (err) next(err);
    else res.send();
  });
});

router.post("/updateAdmin", async (req, res, next) => {
  const { FullName, Password, ID } = req.body;
  const query =
    "UPDATE AdminCredentials SET FullName = ?,Password = ? WHERE ID = ?";
  db.query(query, [FullName, Password, ID], async (err) => {
    if (err) next(err);
    else res.send({ message: "Account Updated" });
  });
});

router.get("/appSettings", async (req, res, next) => {
  const query = `SELECT * FROM AppSettings`;
  db.query(query, async (err, results) => {
    if (err) next(err);
    else res.send(results);
  });
});

router.post("/appSettings/update", async (req, res, next) => {
  const { name, data } = req.body;
  const query = `UPDATE AppSettings SET data = ? WHERE Name = ?`;
  db.query(query, [data, name], async (err) => {
    if (err) next(err);
    else res.send();
  });
});

router.get("/availableBoxData/:year/:month/:type", async (req, res, next) => {
  const { year, month, type } = req.params;
  try {
    const temp = {};
    const query = `SELECT FullName FROM Information WHERE UserID=?`;

    const IDs = await getAvailableBoxData({ year, month, type });
    IDs.forEach(async (id) => {
      const data = await Query(query, [id]).catch((err) => next(err));
      const name = data[0]?.FullName ? data[0]?.FullName : "Unknown";
      temp[id] = name;
      if (Object.keys(temp).length === IDs.length) {
        const finalData = IDs.map((id) => ({ id, name: temp[id] }));
        finalData.length === IDs.length && res.send(finalData);
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
