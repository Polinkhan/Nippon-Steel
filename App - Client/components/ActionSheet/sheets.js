import { registerSheet } from "react-native-actions-sheet";
import MonthSheet from "./MonthSheet";
import YearSheet from "./YearSheet";
import TypeSheet from "./TypeSheet";

registerSheet("month", MonthSheet);
registerSheet("year", YearSheet);
registerSheet("type", TypeSheet);
export {};
