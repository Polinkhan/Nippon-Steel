import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Divider = (props) => {
  return <View style={styles.container} {...props} />;
};

export default Divider;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    borderLeftWidth: 1,
    borderColor: "#aaaaaa",
  },
});
