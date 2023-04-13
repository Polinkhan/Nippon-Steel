import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SheetManager, SheetProvider } from "react-native-actions-sheet";
import { TouchableNativeFeedback } from "react-native";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { font, mediumFont } from "../constants/SIzes";
import { IconButton } from "react-native-paper";
const { width, height } = Dimensions.get("window");

const SettingsScreen = ({}) => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", height: height / 4 }}>
        <IconButton icon={"book-settings"} size={width / 8} />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ ...mediumFont }}>OFFSHORE SUPPORT PTE LTD</Text>
          <Text style={{ ...font, color: "#aaa" }}>
            Mobile Salary Share App
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.manuBox}>
          {data.map((item) => (
            <CustomButton key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const CustomButton = ({ item }) => {
  const navigation = useNavigation();
  const btnWidth = (width - width / 10) / 2;
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
          <IconButton icon={item.icon} style={{ margin: 0 }} />
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
    padding: width / 25,
    paddingBottom: width / 10,
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
    ...font,
    color: "rgba(0,0,0,0.5)",
    marginTop: 8,
  },
});

const data = [
  {
    id: 1,
    name: "View Profile",
    icon: "card-account-details-outline",
    source: require("../assets/lottie/Profile_icon.json"),
    colors: ["transparent", "#0000ff4d", "transparent"],
    navigate: "profile",
  },
  {
    id: 2,
    icon: "lock-open-outline",
    name: "Change Password",
    source: require("../assets/lottie/Password.json"),
    colors: ["transparent", "#8054204d", "transparent"],
    navigate: "changePassword",
  },
  {
    id: 3,
    icon: "update",
    name: "Check For Update",
    source: require("../assets/lottie/Update.json"),
    navigate: "update",
    colors: ["transparent", "#529dde4d", "transparent"],
  },
  {
    id: 4,
    icon: "alert-octagon-outline",
    name: "Report a problem",
    source: require("../assets/lottie/Report.json"),
    colors: ["transparent", "#dea4524d", "transparent"],
  },
  {
    id: 5,
    icon: "account-supervisor",
    name: "Teams",
    source: require("../assets/lottie/Permission.json"),
    navigate: "permission",
    colors: ["transparent", "#0054004d", "transparent"],
  },
  {
    id: 6,
    icon: "contacts-outline",
    name: "Contact Admin",
    source: require("../assets/lottie/Contact.json"),
    navigate: "contact",
    colors: ["transparent", "#0000ff4d", "transparent"],
  },
  {
    id: 7,
    icon: "android",
    name: "About App",
    source: require("../assets/lottie/About_US.json"),
    navigate: "about",
    colors: ["transparent", "#4ca1af4d", "transparent"],
  },
  {
    id: 8,
    icon: "logout",
    name: "Logout",
    source: require("../assets/lottie/Logout.json"),
    onPress: () => SheetManager.show("confirmLogout"),
    colors: ["transparent", "#ff00004d", "transparent"],
  },
];
