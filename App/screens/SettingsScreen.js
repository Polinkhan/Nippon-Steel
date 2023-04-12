import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useWindowDimensions } from "react-native";
import { SheetManager, SheetProvider } from "react-native-actions-sheet";
import { TouchableNativeFeedback } from "react-native";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
const Profile = require("../assets/lottie/Settings.json");

const SettingsScreen = ({}) => {
  return (
    <View style={styles.container}>
      <LottieView autoPlay style={{ height: 150 }} source={Profile} />
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontFamily: "Poppins", fontSize: 16 }}>
          OFFSHORE SUPPORT PTE LTD
        </Text>
        <Text style={{ fontFamily: "Poppins", fontSize: 12, color: "#aaa" }}>
          Mobile Salary Share App
        </Text>
      </View>

      <View style={styles.manuBox}>
        {data.map((item) => (
          <CustomButton key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

const CustomButton = ({ item }) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const btnWidth = (width - 50) / 2;
  return (
    <View style={[styles.manuItem, { width: btnWidth }]}>
      <TouchableNativeFeedback
        onPress={
          item.navigate
            ? () => navigation.navigate(item.navigate, { name: item.name })
            : item.onPress
        }
        background={TouchableNativeFeedback.Ripple(
          Colors.light.tintOpacity,
          false
        )}
      >
        <View style={{ padding: 12 }}>
          <LottieView autoPlay style={{ width: 40 }} source={item.source} />
          <Text style={styles.manuText}>{item.name}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  imageBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  manuBox: {
    paddingVertical: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  manuItem: {
    marginTop: 10,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 1,
  },
  manuText: {
    fontSize: 12,
    color: "rgba(0,0,0,0.5)",
    marginTop: 8,
    fontFamily: "Poppins",
  },
});

const data = [
  {
    id: 1,
    name: "View Profile",
    source: require("../assets/lottie/Profile_icon.json"),
    colors: ["transparent", "#0000ff4d", "transparent"],
    navigate: "profile",
  },
  {
    id: 2,
    name: "Change Password",
    source: require("../assets/lottie/Password.json"),
    colors: ["transparent", "#8054204d", "transparent"],
    navigate: "changePassword",
  },
  {
    id: 3,
    name: "Check For Update",
    source: require("../assets/lottie/Update.json"),
    navigate: "update",
    colors: ["transparent", "#529dde4d", "transparent"],
  },
  {
    id: 4,
    name: "Report a problem",
    source: require("../assets/lottie/Report.json"),
    colors: ["transparent", "#dea4524d", "transparent"],
  },
  {
    id: 5,
    name: "Teams",
    source: require("../assets/lottie/Permission.json"),
    navigate: "permission",
    colors: ["transparent", "#0054004d", "transparent"],
  },
  {
    id: 6,
    name: "Contact Admin",
    source: require("../assets/lottie/Contact.json"),
    navigate: "contact",
    colors: ["transparent", "#0000ff4d", "transparent"],
  },
  {
    id: 7,
    name: "About App",
    source: require("../assets/lottie/About_US.json"),
    navigate: "about",
    colors: ["transparent", "#4ca1af4d", "transparent"],
  },
  {
    id: 8,
    name: "Logout",
    source: require("../assets/lottie/Logout.json"),
    onPress: () => SheetManager.show("confirmLogout"),
    colors: ["transparent", "#ff00004d", "transparent"],
  },
];
