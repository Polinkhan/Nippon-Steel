import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";

const UpdateScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading)
    return (
      <View style={styles.container}>
        <LottieView
          autoPlay
          style={{ width: 80, height: 80 }}
          source={require("../assets/lottie/DefaultLoading.json")}
        />
        <Text style={{ fontFamily: "Poppins" }}>Checking For Update ...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "Poppins" }}>
        The latest version is installed
      </Text>
      <Text style={{ fontFamily: "Poppins" }}>version : 1.0.23</Text>
    </View>
  );
};

export default UpdateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
