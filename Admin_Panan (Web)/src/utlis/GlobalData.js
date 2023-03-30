import {
  IoTrashOutline,
  IoSettingsOutline,
  IoPeopleOutline,
  IoHomeOutline,
  IoPersonAddOutline,
  IoServerOutline,
} from "react-icons/io5";

const sidePanalItems = [
  { itemName: "Overview", icon: IoHomeOutline },
  { itemName: "Register User", icon: IoPersonAddOutline },
  { itemName: "Manage Users", icon: IoPeopleOutline },
  { itemName: "Recycle Bin", icon: IoTrashOutline },
  { itemName: "App Settings", icon: IoSettingsOutline },
  { itemName: "Payslip Data", icon: IoServerOutline },
];

const OverviewItems = [
  { itemName: "Total User", itemNumber: "18", itemBottom: "Active User" },
  {
    itemName: "Todays Created",
    itemNumber: "6",
    itemBottom: "User Register Today",
  },
  {
    itemName: "Report Users",
    itemNumber: "3",
    itemBottom: "Todays Reported User",
  },
  { itemName: "Total Review", itemNumber: "26", itemBottom: "Total Review" },
];

const userDataKeys = [
  { itemName: "UserID", type: "text" },
  { itemName: "Employee Name", type: "text" },
  { itemName: "Email", type: "email" },
  { itemName: "Date Of Birth", type: "date" },
  { itemName: "Company", type: "text" },
  { itemName: "Job Title", type: "text" },
  { itemName: "Joining Date", type: "date" },
  { itemName: "Mobile", type: "tel" },
  { itemName: "Nationality", type: "text" },
  { itemName: "Type", type: "text" },
  { itemName: "Password", type: "text" },
  { itemName: "PrimaryBankAcc", type: "text" },
  { itemName: "SecondaryBankAcc", type: "text" },
];

const headers = [
  { label: "ID", key: "ID" },
  { label: "Term", key: "Term" },
  { label: "Employee Name", key: "Name" },
  { label: "Start Month Basic", key: "Basic_i" },
  { label: "Start Month Offshore", key: "Offshore_i" },
  { label: "Start Month Onshore", key: "Onshore_i" },
  { label: "Start Month Transit", key: "Transit_i" },
  { label: "End Month Basic", key: "Basic_ii" },
  { label: "End Month Offshore", key: "Offshore_ii" },
  { label: "End Month Onshore", key: "Onshore_ii" },
  { label: "End Month Transit", key: "Transit_ii" },
  {
    label:
      "Unrecorded Salary / Claim Baggage / Visa / Transport / Bonus / Other",
    key: "OtherSalary_descr",
  },
  { label: "Amount", key: "OtherSalary_amount" },
  { label: "Cash Advance", key: "CashAdvance" },
  { label: "OverPay / Other", key: "OverPay_descr" },
  { label: "Amount", key: "OverPay_amount" },
  { label: "Secondary Bank Account", key: "SecondaryBankAcc" },
  { label: "Grand Total", key: "GrandTotal" },
  { label: "Deduction", key: "Deduction" },
  { label: "Total", key: "Total" },
];

const api = "https://admin.backend.nippontechnology.com";
// const api = "http://100.100.1.254:5000";

export { sidePanalItems, OverviewItems, userDataKeys, api, headers };
