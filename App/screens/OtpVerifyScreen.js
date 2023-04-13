import { View, Text, Dimensions } from "react-native";
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
const { width, height } = Dimensions.get("window");

const OtpVerifyScreen = ({ navigation, route }) => {
  const [OTP, setOTP] = useState();
  const { setCurrentUser } = useDataContext();

  const { id, redirectTo } = route.params;
  console.log(id);

  const handleChange = (text) => {
    setOTP(text);
    console.log(text);
  };

  // useEffect(() => {
  //   if (OTP.length === 4) {
  //     const otp = `${OTP[0]}${OTP[1]}${OTP[2]}${OTP[3]}`;
  //     (async () => {
  //       try {
  //         const res = (await authClient.post("/verifyOtp", { id, otp })).data;
  //         if (redirectTo === "changePassword") {
  //           navigation.replace(redirectTo, {
  //             isVerified: true,
  //             name: "New Password",
  //           });
  //         } else {
  //           const { accessToken, currentUser } = res;
  //           await SecureStore.setItemAsync("accessToken", accessToken);
  //           setCurrentUser(currentUser);
  //           navigation.replace(redirectTo);
  //         }
  //       } catch (err) {
  //         setOTP([]);
  //         const { message } = err?.response.data;
  //         ToastAndroid.show(message, ToastAndroid.SHORT);
  //       } finally {
  //       }
  //     })();
  //   }
  // }, [OTP]);

  // const handleErase = () => {
  //   const currentOtp = [...OTP];
  //   currentOtp.pop();
  //   setOTP(currentOtp);
  // };

  // const OnPress = (_) => {
  //   if (OTP.length < 4) setOTP((prev) => [...prev, _]);
  // };

  return (
    <View style={styles.container}>
      <StatusBar
        style={"light"}
        animated={true}
        backgroundColor="rgba(0,0,0,0.2)"
      />
      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          autoPlay
          style={{ height: height / 5 }}
          source={require("../assets/lottie/OTP.json")}
        />
      </View>
      {/* <View style={{ flex: 2 }}>
        <View style={styles.inputContainer}>
          {[0, 1, 2, 3].map((_, i) => (
            <InputBox key={i.toString()} number={OTP[_]} />
          ))}
        </View>
        <View style={{ flex: 4, justifyContent: "center" }}>
          <View style={styles.keyboard}>
            {[1, 2, 3].map((_, i) => (
              <KeyboardKey key={i} number={_} onPress={() => OnPress(_)} />
            ))}
          </View>
          <View style={styles.keyboard}>
            {[4, 5, 6].map((_, i) => (
              <KeyboardKey key={i} number={_} onPress={() => OnPress(_)} />
            ))}
          </View>
          <View style={styles.keyboard}>
            {[7, 8, 9].map((_, i) => (
              <KeyboardKey key={i} number={_} onPress={() => OnPress(_)} />
            ))}
          </View>
          <View style={[styles.keyboard]}>
            <Button
              style={styles.keyboardKey}
              labelStyle={styles.labelStyle}
              textColor={Colors.light.tint}
              onPress={() => {}}
            >
              <Entypo name="eye-with-line" size={24} color="#777777" />
            </Button>
            <KeyboardKey number={0} onPress={() => OnPress(0)} />
            <Button
              style={styles.keyboardKey}
              onPress={handleErase}
              textColor={Colors.light.tint}
              labelStyle={styles.labelStyle}
            >
              <Entypo name="erase" size={24} color="#777777" />
            </Button>
          </View>
        </View>
        <View style={[styles.inputContainer, { flex: 0 }]}>
          <Text style={{ marginHorizontal: 4, fontWeight: 500 }}>
            Didn't get code?
          </Text>
          <Text style={styles.underlineText}>Resend code</Text>
        </View>
      </View> */}
      <View style={{ flex: 1, alignItems: "center" }}>
        <TextInput
          maxLength={4}
          autoFocus
          mode="flat"
          label={"Enter OTP (4 digits)"}
          style={{ width: "90%", backgroundColor: "#fff" }}
          activeUnderlineColor={Colors.light.tint}
          onChangeText={handleChange}
        />
      </View>
    </View>
  );
};

const InputBox = ({ number }) => {
  const hasNumber = number !== undefined;
  borderColor = hasNumber ? Colors.light.tint : "#cccccc";
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
      textColor={Colors.light.tint}
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
