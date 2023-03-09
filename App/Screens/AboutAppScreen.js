import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React from "react";
import { BoldText, Text, VStack } from "../Components/Elements";
import { Color } from "../Healpers/Colors";

const AboutAppScreen = () => {
  const colorScheme = useColorScheme();
  return (
    <VStack style={styles.container}>
      <VStack style={{ alignItems: "center" }}>
        <BoldText style={{ fontSize: 24 }}>Nippon Steel Engineering</BoldText>
        <Text style={{ fontSize: 14, padding: 12 }}>Version 2.6.1</Text>
      </VStack>
      <VStack>
        <TouchableOpacity
          style={[styles.textBox, { backgroundColor: Color[colorScheme].bar }]}
        >
          <Text style={{ fontSize: 16 }}>Learn more about the app</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.textBox, { backgroundColor: Color[colorScheme].bar }]}
        >
          <Text style={{ fontSize: 16 }}>Chat Terms of Service</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.textBox, { backgroundColor: Color[colorScheme].bar }]}
        >
          <Text style={{ fontSize: 16 }}>Visit My Website</Text>
        </TouchableOpacity>
      </VStack>
    </VStack>
  );
};

export default AboutAppScreen;

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textBox: {
    width: 250,
    alignItems: "center",
    padding: 8,
    borderRadius: 999,
    marginVertical: 10,
  },
});
