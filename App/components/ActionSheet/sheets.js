import { registerSheet } from "react-native-actions-sheet";
import MonthSheet from "./MonthSheet";
import YearSheet from "./YearSheet";
import TypeSheet from "./TypeSheet";
import ConfirmLogout from "./ConfirmLogout";

registerSheet("month", MonthSheet);
registerSheet("year", YearSheet);
registerSheet("type", TypeSheet);
registerSheet("confirmLogout", ConfirmLogout);
export {};
