import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  Octicons,
  MaterialIcons,
} from "@expo/vector-icons";

const api = "https://backend.nippontechnology.com";
// const api = "http://192.168.193.155:3000";

const SettingsList = [
  {
    label: "My Profile",
    iconProvider: Ionicons,
    icon: "person-outline",
    route: "profile",
    param: {},
  },
  // {
  //   label: "Help",
  //   iconProvider: Ionicons,
  //   icon: "help-outline",
  //   route: null,
  // },
  // {
  //   label: "Change Password",
  //   iconProvider: MaterialCommunityIcons,
  //   icon: "form-textbox-password",
  //   route: "password",
  //   param: { id: "verify" },
  // },
  // {
  //   label: "Change Profile Picture",
  //   iconProvider: AntDesign,
  //   icon: "picture",
  //   route: "profilePicture",
  //   param: {},
  // },
  {
    label: "Report A Problem",
    iconProvider: Octicons,
    icon: "report",
    route: "report",
    param: {},
  },
  {
    label: "Change For Update",
    iconProvider: MaterialIcons,
    icon: "update",
    route: "checkUpdate",
    param: {},
  },
  {
    label: "About",
    iconProvider: AntDesign,
    icon: "infocirlceo",
    route: "about",
    param: {},
  },
];

const imgLoaction = require("../assets/images/logoBanner.png");

const selectOptions = {
  month: {
    key: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    val: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  year: {
    key: ["2022", "2023", "2024"],
    val: ["22", "23", "24"],
  },
  type: {
    key: ["Payslip", "Timesheet", "Others"],
    val: ["Payslip", "Timesheet", "Others"],
  },
};

export { api, SettingsList, selectOptions };
