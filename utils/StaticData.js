const Data = {
  month: [
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
  year: ["2018", "2019", "2020", "2021", "2022", "2023"],
  type: ["PAY", "CHECK"],
};

const uriFetchApi =
  "https://nipponexpress.netlify.app/.netlify/functions/index";
const isAuthApi =
  "https://nipponexpress.netlify.app/.netlify/functions/index/login";

const UserInfoLabel = [
  "Employee ID :",
  "Employee Name :",
  "Job Title :",
  "Empolyee Type :",
  "Date :",
];

const UserInfoDataKey = ["id", "name", "title", "type"];

export { Data, uriFetchApi, isAuthApi, UserInfoLabel, UserInfoDataKey };