import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";

const SearchingAnimationScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("pdfviwer", { name: "PDF Name" });
    }, 4000);
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
