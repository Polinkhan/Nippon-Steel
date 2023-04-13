//Dependendies
const express = require("express");
const morgan = require("morgan");
var cors = require("cors");
require("dotenv").config();
var bodyParser = require("body-parser");

//Scafolding
const AuthRoute = require("./Routes/Auth.route");
const DBRoute = require("./Routes/DB.routes");
const AdminAuthRoute = require("./Routes/Admin.auth.route");
const AdminDBRoute = require("./Routes/Admin.DB.route");
const db = require("./DB/mySQL_init");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.get("/", async (req, res, next) => {
  try {
    const [result] = await db.query(`SELECT * FROM Credentials`);
    res.send({ ...result[0] });
  } catch (err) {
    next(err);
  }
});

//App routes
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/db", DBRoute);

//Web routes
app.use("/api/v1/admin/auth", AdminAuthRoute);
app.use("/api/v1/admin/db", AdminDBRoute);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    status: error.status || 500,
    message: error.message,
  });
});

// app.listen();
app.listen(5000, () => {
  console.log("listening on port 5000");
});
