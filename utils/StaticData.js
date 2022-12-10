const Data = {
  month: [
    "",
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ],
  year: ["", "2018", "2019", "2020", "2021", "2022", "2023"],
  type: ["", "PAY", "CHECK"],
};

const uriFetchApi =
  "https://nipponexpress.netlify.app/.netlify/functions/index";
// "http://100.100.1.254:3000";
const isAuthApi =
  "https://nipponexpress.netlify.app/.netlify/functions/index/login";
// "http://100.100.1.254:3000/login";

const UserInfoLabel = [
  "Employee ID",
  "Company",
  "Date of Birth",
  "Employee Name",
  "Job Title",
  "Empolyee Type",
  "Joining Date",
  "Ntionality",
  "Mob",
  "Email",
];

const UserInfoKey = [
  "id",
  "company",
  "DOB",
  "name",
  "title",
  "type",
  "joinDate",
  "nationality",
  "mob",
  "email",
];

const ff = { fontFamily: "Nunito-SemiBold" };

const imgLoaction = require("../assets/images/logoBanner.png");

export {
  Data,
  uriFetchApi,
  isAuthApi,
  UserInfoLabel,
  ff,
  imgLoaction,
  UserInfoKey,
};
