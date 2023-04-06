import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import LottieView from "lottie-react-native";
import { useWindowDimensions } from "react-native";
import { useDataContext } from "../hooks/useDataContext";
import { SheetManager, SheetProvider } from "react-native-actions-sheet";
import { TouchableNativeFeedback } from "react-native";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const Profile = require("../assets/lottie/Profile.json");

const SettingsScreen = ({}) => {
  const { currentUser } = useDataContext();

  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <LottieView style={{ width: 200 }} source={Profile} />
        <Text style={styles.manuText}>{currentUser.UserID}</Text>
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
            ? () => navigation.navigate(item.navigate)
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
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  imageBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  manuBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    flex: 2,
  },
  manuItem: {
    marginTop: 10,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 2,
  },
  manuText: {
    fontSize: 16,
    color: "#454545",
    marginTop: 8,
    fontFamily: "Poppins",
  },
});

const data = [
  {
    id: 1,
    name: "View Profile",
    source: require("../assets/lottie/Profile_icon.json"),
  },
  {
    id: 2,
    name: "Change Password",
    source: require("../assets/lottie/Password.json"),
  },
  {
    id: 3,
    name: "Check For Update",
    source: require("../assets/lottie/Update.json"),
  },
  {
    id: 4,
    name: "Report a problem",
    source: require("../assets/lottie/Report.json"),
  },
  {
    id: 5,
    name: "About App",
    source: require("../assets/lottie/About_US.json"),
    navigate: "about",
  },
  {
    id: 6,
    name: "Contact Admin",
    source: require("../assets/lottie/Contact.json"),
    navigate: "contact",
  },
  {
    id: 7,
    name: "Logout",
    source: require("../assets/lottie/Logout.json"),
    onPress: () => SheetManager.show("confirmLogout"),
  },
];
