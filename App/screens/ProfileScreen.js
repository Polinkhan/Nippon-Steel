import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDataContext } from "../hooks/useDataContext";
import { dbClient } from "../Api/Client";
import React from "react";
import LottieView from "lottie-react-native";
const ProfileCard = require("../assets/lottie/profileCard.json");
import { font } from "../constants/SIzes";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const ProfileScreen = () => {
  const [data, setData] = useState(null);
  const { currentUser } = useDataContext();
  const { UserID } = currentUser;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await dbClient.get(`/viewData/${UserID}`);
        setData(data);
      } catch (err) {
        console.log(37, err.response.data);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <LottieView
          autoPlay
          style={{ height: width / 3 }}
          source={ProfileCard}
        />
      </View>
      <View
        style={{
          width: "80%",
          borderBottomWidth: 1,
          borderColor: "#eee",
          marginBottom: width / 25,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        {data
          ? Object.keys(data).map((label, i) => (
              <View key={i} style={styles.item}>
                <Text numberOfLines={1} style={[styles.itemFont, { flex: 5 }]}>
                  {label}
                </Text>
                <Text style={[styles.itemFont, { flex: 1 }]}>:</Text>
                <Text numberOfLines={1} style={[styles.itemFont, { flex: 10 }]}>
                  {data[label]}
                </Text>
              </View>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
              <View key={i} style={styles.item} />
            ))}
      </ScrollView>
    </View>
  );
};
export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width / 25,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    marginBottom: width / 30,
    paddingHorizontal: width / 25,
    height: width / 7,
    alignItems: "center",
    backgroundColor: "#f2f2f5",
    elevation: 1,
    borderRadius: 8,
  },
  itemFont: {
    ...font,
  },
});
