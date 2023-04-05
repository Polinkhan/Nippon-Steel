import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useWindowDimensions } from "react-native";
import { useDataContext } from "../hooks/useDataContext";
import * as SecureStore from "expo-secure-store";

const SettingsScreen = () => {
  const { currentUser, setCurrentUser } = useDataContext();

  const logout = {
    id: 6,
    name: "Logout",
    source: require("../assets/lottie/Logout.json"),
    onPress: async () => {
      await SecureStore.deleteItemAsync("accessToken");
      setCurrentUser(null);
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <LottieView
          autoPlay
          style={{ width: 200 }}
          source={require("../assets/lottie/Profile.json")}
        />
        <Text style={{ fontSize: 24, fontWeight: 600, color: "#454545" }}>
          {currentUser.UserID}
        </Text>
      </View>
      <View style={styles.manuBox}>
        {data.map((item) => (
          <CustomButton key={item.id} item={item} />
        ))}
        <CustomButton key={logout.id} item={logout} />
      </View>
    </View>
  );
};

const CustomButton = ({ item }) => {
  const { width } = useWindowDimensions();
  const btnWidth = (width - 80) / 2;
  return (
    <TouchableOpacity
      style={[styles.manuItem, { width: btnWidth }]}
      activeOpacity={0.7}
      onPress={item.onPress}
    >
      <LottieView autoPlay style={{ width: 50 }} source={item.source} />
      <Text style={styles.manuText}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
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
    padding: 16,
    marginTop: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    elevation: 2,
  },
  manuText: {
    fontSize: 18,
    fontWeight: 500,
    color: "#454545",
    marginTop: 8,
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
    name: "About US",
    source: require("../assets/lottie/About_US.json"),
  },
];
