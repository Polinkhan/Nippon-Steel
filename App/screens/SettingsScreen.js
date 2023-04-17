import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SheetManager } from "react-native-actions-sheet";
import { TouchableNativeFeedback } from "react-native";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { font, mediumFont } from "../constants/SIzes";
import { IconButton } from "react-native-paper";
import Profile from "../assets/RNSVG/Profile";
import Password from "../assets/RNSVG/Password";
import Download from "../assets/RNSVG/Download";
import Question from "../assets/RNSVG/Question";
import Teams from "../assets/RNSVG/Teams";
import Admin from "../assets/RNSVG/Admin";
import About from "../assets/RNSVG/About";
import Settings from "../assets/RNSVG/Settings";
const { width, height } = Dimensions.get("window");

const SettingsScreen = ({}) => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", height: width / 2 }}>
        <Settings />
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
        {/* <Button
          onPress={async () => {
            await secureStore.deleteItemAsync("accessToken");
            await secureStore.deleteItemAsync("onBoard");
          }}
        >
          Remove all Data
        </Button> */}
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
        <View style={{ height: width / 4.5, padding: width / 30 }}>
          {<item.Icon />}
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
    Icon: () => <Profile />,
    colors: ["transparent", "#0000ff4d", "transparent"],
    navigate: "profile",
  },
  {
    id: 2,
    Icon: () => <Password />,
    name: "Change Password",
    colors: ["transparent", "#8054204d", "transparent"],
    navigate: "changePassword",
  },
  {
    id: 3,
    Icon: () => <Download />,
    name: "Check For Update",
    navigate: "update",
    colors: ["transparent", "#529dde4d", "transparent"],
  },
  {
    id: 4,
    Icon: () => <Question />,
    name: "Report a problem",
    navigate: "report",
    colors: ["transparent", "#dea4524d", "transparent"],
  },
  {
    id: 5,
    Icon: () => <Teams />,
    name: "Teams",
    navigate: "permission",
    colors: ["transparent", "#0054004d", "transparent"],
  },
  {
    id: 6,
    Icon: () => <Admin />,
    name: "Contact Admin",
    navigate: "contact",
    colors: ["transparent", "#0000ff4d", "transparent"],
  },
  {
    id: 7,
    Icon: () => <About />,
    name: "About App",
    navigate: "about",
    colors: ["transparent", "#4ca1af4d", "transparent"],
  },
  {
    id: 8,
    Icon: () => (
      <IconButton icon={"logout"} size={width / 16} style={{ margin: 0 }} />
    ),
    name: "Logout",
    onPress: () => SheetManager.show("confirmLogout"),
    colors: ["transparent", "#ff00004d", "transparent"],
  },
];
