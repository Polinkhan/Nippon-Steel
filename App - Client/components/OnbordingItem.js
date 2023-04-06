import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useWindowDimensions } from "react-native";
import { Image } from "react-native";
import Colors from "../constants/Colors";
import LottieView from "lottie-react-native";

const OnbordingItem = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.image}>
        <LottieView
          autoPlay
          style={{ width: width - 150 }}
          source={item.image}
        />
      </View>

      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default OnbordingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
  },
  title: {
    fontWeight: 800,
    fontSize: 28,
    marginBottom: 10,
    color: Colors.light.tint,
    textAlign: "center",
  },
  description: {
    fontWeight: 300,
    color: "#62656b",
    textAlign: "center",
    paddingHorizontal: 64,
  },
});
