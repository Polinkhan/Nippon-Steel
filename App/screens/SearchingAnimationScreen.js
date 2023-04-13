import {
  Alert,
  BackHandler,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { useDataContext } from "../hooks/useDataContext";
import { dbClient } from "../Api/Client";
import * as Haptics from "expo-haptics";
import * as secureStore from "expo-secure-store";
import { CheckIfObjectIncluded } from "../constants/Helpers";
import { mediumFont } from "../constants/SIzes";

const SearchingAnimationScreen = ({ navigation, route }) => {
  const { currentUser } = useDataContext();
  const { UserID } = currentUser;
  const { type, month, year } = route.params;

  useEffect(() => {
    dbClient
      .post(`getPayslipData/${UserID}`, { type, month, year })
      .then(async ({ data }) => {
        let pdfViewed =
          JSON.parse(await secureStore.getItemAsync("pdfViewed")) || [];
        if (!CheckIfObjectIncluded(pdfViewed, { type, month, year })) {
          pdfViewed.push({ type, month, year });
          await secureStore.setItemAsync(
            "pdfViewed",
            JSON.stringify(pdfViewed)
          );
        }
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        navigation.replace("pdfviwer", {
          data,
          name: `${month} ${year} (${type})`,
        });
        console.log(`${month} ${year} (${type})`);
      })
      .catch((err) => {
        navigation.goBack();
        ToastAndroid.show(err?.response?.data?.message, ToastAndroid.SHORT);
      });
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
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
    ...mediumFont,
    color: "gray",
  },
});
