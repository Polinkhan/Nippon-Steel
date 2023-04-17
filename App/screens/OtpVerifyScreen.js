import { View, Text, Dimensions, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { Button, TextInput } from "react-native-paper";
import { useDataContext } from "../hooks/useDataContext";
import { authClient } from "../Api/Client";
import { ToastAndroid } from "react-native";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import { font } from "../constants/SIzes";
import { Toast } from "react-native-toast-message/lib/src/Toast";
const { width, height } = Dimensions.get("window");

const OtpVerifyScreen = ({ navigation, route }) => {
  const { setCurrentUser } = useDataContext();
  const { id, pass, redirectTo, Email } = route.params;
  const [loading, setLoading] = useState(false);

  const handleChange = async (text) => {
    if (text.length === 4) {
      setLoading(true);
      await authClient
        .post("/verifyOtp", { id, pass, otp: text })
        .then(async ({ data }) => {
          const { accessToken, currentUser } = data;
          if (redirectTo === "changePassword") {
            navigation.replace(redirectTo, {
              isVerified: true,
              name: "New Password",
            });
          } else {
            await SecureStore.setItemAsync("accessToken", accessToken);
            setCurrentUser(currentUser);
            navigation.replace(redirectTo);
          }
        })
        .catch((err) => {
          Toast.show({ type: "error", text1: err?.response?.data?.message });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        style={"light"}
        animated={true}
        backgroundColor="rgba(0,0,0,0.2)"
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          autoPlay
          style={{ height: height / 6 }}
          source={
            loading
              ? require("../assets/lottie/DefaultLoading.json")
              : require("../assets/lottie/OTP.json")
          }
        />
      </View>

      <View
        style={{
          flex: Platform.OS === "ios" ? 2 : 1,
          alignItems: "center",
          justifyContent: Platform.OS === "ios" ? "flex-start" : "center",
        }}
      >
        <Text
          style={{
            ...font,
            textAlign: "center",
            marginBottom: height / 50,
            color: "gray",
          }}
        >
          We have sent a 4 digit OTP in this email{"\n"} ({Email})
        </Text>
        <TextInput
          keyboardType="numeric"
          maxLength={4}
          disabled={loading}
          mode="flat"
          label={"Enter OTP (4 digits)"}
          style={{ width: "90%", backgroundColor: "#fff" }}
          activeUnderlineColor={Colors.light.tint}
          onChangeText={handleChange}
          right
        />
      </View>
    </View>
  );
};

export default OtpVerifyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: width / 15,
    backgroundColor: "#fff",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    width: width / 10,
    height: height / 15,
    borderRadius: 4,
    marginHorizontal: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  text: {
    fontWeight: 800,
    fontSize: 24,
    color: "#777777",
  },
  keyboard: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
  },
  keyboardKey: {
    borderRadius: 4,
    marginHorizontal: 5,
    backgroundColor: "#f2f2f2",
  },
  underlineText: {
    marginHorizontal: 4,
    fontWeight: 500,
    fontSize: 16,
    color: Colors.light.tint,
    textDecorationLine: "underline",
  },
  labelStyle: {
    padding: 10,
    fontSize: 16,
    color: "#454545",
  },
});
