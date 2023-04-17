import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Svg } from "react-native-svg";
import Logo from "../components/SVG/Logo";
import Colors from "../constants/Colors";
import { Linking } from "react-native";
import { IconButton } from "react-native-paper";
import { openSettings } from "expo-linking";
import { boldFont, font } from "../constants/SIzes";

const AboutUsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 4, justifyContent: "center", alignItems: "center" }}>
        <Logo />
        <Text style={[styles.grayText, { ...boldFont, marginVertical: 16 }]}>
          NIPPON STEEL ENGINEERING CO. , LTD.
        </Text>
        <Text style={[styles.grayText, { marginVertical: 4 }]}>
          Version : 1.1.23
        </Text>
        <Text style={styles.grayText}>www.eng.nipponsteel.com</Text>
      </View>
      <View
        style={{ flex: 5, justifyContent: "flex-end", alignItems: "center" }}
      >
        <View style={{ flexDirection: "row" }}>
          <IconButton
            icon="email"
            style={{ backgroundColor: Colors.light.tintOpacity }}
            onPress={() => Linking.openURL(`mailto:naeem@nsc-eng.com`)}
          />
          <IconButton
            icon="facebook"
            style={{ backgroundColor: Colors.light.tintOpacity }}
            onPress={() =>
              Linking.openURL(
                `fb://facewebmodal/f?href=https://www.facebook.com/it.naeem`
              )
            }
          />
        </View>
        <Text style={styles.text}>Developed by : Md Naeem Khan</Text>
        <Text style={styles.text} onPress={() => openSettings()}>
          Open App info in Settings
        </Text>
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
    ...font,
    elevation: 5,
  },
  grayText: {
    color: "gray",
    fontFamily: "Poppins",
  },
});
