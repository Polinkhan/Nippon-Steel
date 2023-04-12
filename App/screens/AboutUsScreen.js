import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Svg } from "react-native-svg";
import Logo from "../components/SVG/Logo";
import Colors from "../constants/Colors";

const AboutUsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 4, justifyContent: "center", alignItems: "center" }}>
        <Logo />
        <Text
          style={[
            styles.grayText,
            { fontFamily: "sultan", fontSize: 20, marginVertical: 16 },
          ]}
        >
          NIPPON STEEL ENGINEERING CO. , LTD.
        </Text>
        <Text style={[styles.grayText, { marginVertical: 4 }]}>
          Version : 1.0.23
        </Text>
        <Text style={styles.grayText}>www.eng.nipponsteel.com</Text>
      </View>
      <View
        style={{ flex: 5, justifyContent: "flex-end", alignItems: "center" }}
      >
        <Text style={styles.text}>Developed by : Md Naeem Khan</Text>
        <Text style={styles.text}>Email : naeem@nsc-eng.com</Text>
        <Text style={styles.text}>WhatApp : +8801730062298</Text>
      </View>
    </View>
  );
};

export default AboutUsScreen;

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  text: {
    width: "80%",
    textAlign: "center",
    backgroundColor: Colors.light.tint,
    color: "#fff",
    paddingVertical: 10,
    borderRadius: 999,
    marginVertical: 8,
    elevation: 1,
    fontFamily: "Poppins",
    fontSize: 12,
    elevation: 5,
  },
  grayText: {
    color: "gray",
    fontFamily: "Poppins",
  },
});
