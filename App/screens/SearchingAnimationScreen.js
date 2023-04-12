import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";
import { useDataContext } from "../hooks/useDataContext";
import { dbClient } from "../Api/Client";

const SearchingAnimationScreen = ({ navigation, route }) => {
  const { currentUser } = useDataContext();
  const { UserID } = currentUser;
  const { type, month, year } = route.params;

  useEffect(() => {
    (async () => {
      try {
        await dbClient.post(`getPayslipData/${UserID}`, { type, month, year });
      } catch (err) {
        navigation.goBack();
        ToastAndroid.show(err?.response?.data?.message, ToastAndroid.SHORT);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.container, { flex: 3 }]}>
        <LottieView
          autoPlay
          style={{ width: "100%" }}
          source={require("../assets/lottie/Searching.json")}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Searching Your File ...</Text>
      </View>
    </View>
  );
};

export default SearchingAnimationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: 600,
    color: "gray",
  },
});
