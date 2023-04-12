import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
const Profile = require("../assets/lottie/Teamwork.json");

const PermissionScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 20, alignItems: "center" }}>
        <LottieView autoPlay style={{ height: 200 }} source={Profile} />
        <Text style={{ fontFamily: "Poppins", fontSize: 14, color: "gray" }}>
          Peoples behind this incredible (App)
        </Text>
      </View>

      <View style={styles.itemBox}>
        {data.map((_, i) => (
          <View key={i} style={{ width: "100%", alignItems: "center" }}>
            <Text style={styles.text}>{_.name}</Text>
            <View
              style={{
                width: "70%",
                borderBottomWidth: 1,
                borderColor: "#eee",
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default PermissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-around",
  },
  itemBox: {
    // flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    elevation: 1,
  },
  text: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: "gray",
    padding: 12,
  },
});

const data = [
  {
    id: 1,
    name: "Iwamoto Kazuyuki",
  },
  {
    id: 2,
    name: "Okauchi Fumihiko",
  },
  {
    id: 3,
    name: "Yoshida Jun",
  },
  {
    id: 4,
    name: "Yong Chooi lin",
  },
  {
    id: 5,
    name: "Clifton O'Keeffe",
  },
  {
    id: 6,
    name: "Siti Daria Mohd",
  },

  {
    id: 7,
    name: "MD Naeem Khan",
  },
];
