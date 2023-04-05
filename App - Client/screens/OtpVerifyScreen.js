import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { Button } from "react-native-paper";
import { useDataContext } from "../hooks/useDataContext";
import { authClient } from "../Api/Client";
import { ToastAndroid } from "react-native";
import * as SecureStore from "expo-secure-store";

const OtpVerifyScreen = ({ navigation, route }) => {
  const [OTP, setOTP] = useState([]);
  const { setCurrentUser } = useDataContext();

  const { id } = route.params;

  useEffect(() => {
    if (OTP.length === 4) {
      const otp = `${OTP[0]}${OTP[1]}${OTP[2]}${OTP[3]}`;
      (async () => {
        try {
          const res = (await authClient.post("/verifyOtp", { id, otp })).data;
          const { accessToken, currentUser } = res;
          await SecureStore.setItemAsync("accessToken", accessToken);
          setCurrentUser(currentUser);
          ToastAndroid.show("AccessToken has updated", ToastAndroid.SHORT);
        } catch (err) {
          setOTP([]);
          const { message } = err?.response.data;
          ToastAndroid.show(message, ToastAndroid.SHORT);
        } finally {
          // setLoading(false);
        }
      })();
    }
  }, [OTP]);

  const handleErase = () => {
    const currentOtp = [...OTP];
    currentOtp.pop();
    setOTP(currentOtp);
  };

  const OnPress = (_) => {
    if (OTP.length < 4) setOTP((prev) => [...prev, _]);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          autoPlay
          style={{ width: 200, height: 200 }}
          source={require("../assets/lottie/OTP.json")}
        />
      </View>
      <View style={{ flex: 2 }}>
        <View style={styles.inputContainer}>
          {[0, 1, 2, 3].map((_, i) => (
            <InputBox key={i.toString()} number={OTP[_]} />
          ))}
        </View>
        <View style={{ flex: 4, justifyContent: "center" }}>
          <View style={styles.keyboard}>
            {[1, 2, 3, 4].map((_, i) => (
              <KeyboardKey key={i} number={_} onPress={() => OnPress(_)} />
            ))}
          </View>
          <View style={styles.keyboard}>
            {[5, 6, 7, 8].map((_, i) => (
              <KeyboardKey key={i} number={_} onPress={() => OnPress(_)} />
            ))}
          </View>
          <View style={styles.keyboard}>
            <Button
              style={styles.keyboardKey}
              onPress={handleErase}
              labelStyle={styles.labelStyle}
            >
              <Entypo name="erase" size={24} color="#777777" />
            </Button>

            <KeyboardKey number={9} onPress={() => OnPress(9)} />
            <KeyboardKey number={0} onPress={() => OnPress(0)} />

            <Button
              style={{ borderRadius: 4, marginHorizontal: 5 }}
              labelStyle={styles.labelStyle}
              buttonColor={Colors.light.primary}
              onPress={() => {}}
            >
              <AntDesign name="arrowright" size={24} color="#fff" />
            </Button>
          </View>
        </View>
        <View style={[styles.inputContainer, { flex: 0 }]}>
          <Text style={{ marginHorizontal: 4, fontWeight: 500 }}>
            Didn't get code?
          </Text>
          <Text style={styles.underlineText}>Resend code</Text>
        </View>
      </View>
    </View>
  );
};

const InputBox = ({ number }) => {
  const hasNumber = number !== undefined;
  borderColor = hasNumber ? Colors.light.primary : "#cccccc";
  return (
    <View style={[styles.inputBox, { borderColor }]}>
      <Text style={styles.text}>{hasNumber ? number : "*"}</Text>
    </View>
  );
};

const KeyboardKey = ({ number, onPress }) => {
  return (
    <Button
      style={styles.keyboardKey}
      onPress={onPress}
      labelStyle={styles.labelStyle}
    >
      {number}
    </Button>
  );
};
export default OtpVerifyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#fff",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    width: 50,
    height: 60,
    borderRadius: 8,
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
    marginBottom: 20,
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
    color: Colors.light.primary,
    textDecorationLine: "underline",
  },
  labelStyle: {
    padding: 10,
    fontSize: 16,
    color: "#454545",
  },
});
