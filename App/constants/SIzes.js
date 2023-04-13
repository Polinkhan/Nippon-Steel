import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const font = { fontSize: width / 30, fontFamily: "Poppins" };
const mediumFont = { fontSize: width / 25, fontFamily: "Poppins" };
const largeFont = { fontSize: width / 20, fontFamily: "Poppins" };

export { font, mediumFont, largeFont };
