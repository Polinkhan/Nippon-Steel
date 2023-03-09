import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";

const Payslip = {
  type: [{ label: "Payslip", value: "Payslip" }],
  year: [
    { label: "2022", value: "22" },
    { label: "2023", value: "23" },
    { label: "2024", value: "24" },
  ],
  month: [
    { label: "January", value: "Jan" },
    { label: "February", value: "Feb" },
    { label: "March", value: "Mar" },
    { label: "April", value: "Apr" },
    { label: "May", value: "May" },
    { label: "June", value: "Jun" },
    { label: "July", value: "Jul" },
    { label: "August", value: "Aug" },
    { label: "September", value: "Sep" },
    { label: "October", value: "Oct" },
    { label: "November", value: "Nov" },
    { label: "December", value: "Dec" },
  ],
};

const SettingsList = [
  {
    label: "My Profile",
    iconProvider: Ionicons,
    icon: "person-outline",
    route: "profile",
    param: {},
  },
  {
    label: "Contacts",
    iconProvider: AntDesign,
    icon: "contacts",
    route: "contact",
    param: {},
  },
  {
    label: "About App",
    iconProvider: AntDesign,
    icon: "infocirlceo",
    route: "about",
    param: {},
  },
  {
    label: "Check For Update",
    iconProvider: MaterialIcons,
    icon: "update",
    route: "update",
    param: {},
  },
];

export { Payslip, SettingsList };
