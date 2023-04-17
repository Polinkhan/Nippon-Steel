import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import Colors from "../constants/Colors";
import { Button, Checkbox, IconButton, TextInput } from "react-native-paper";
import { authClient } from "../Api/Client";
import { Keyboard } from "react-native";
import { StatusBar } from "expo-status-bar";
import { font, mediumFont } from "../constants/SIzes";
import { Toast } from "react-native-toast-message/lib/src/Toast";
const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [checked, setChecked] = useState(true);
  const [id, setId] = useState();
  const [pass, setPass] = useState();
  const [togglePass, setTogglePass] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(false);
    Keyboard.dismiss();
    try {
      setLoading(true);
      const { data } = await authClient.post("/requestOTP", {
        id,
        pass,
      });
      navigation.navigate("otp", {
        id,
        pass,
        redirectTo: "Root",
        Email: data.Email,
      });
    } catch (err) {
      const message = err?.response?.data?.message;
      Toast.show({ type: "error", text1: message });
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.light.background }]}
    >
      <StatusBar animated style="dark" />
      {/* <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      > */}
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ fontSize: width / 10, fontFamily: "sultan" }}>
          Welcome
        </Text>
        <Text style={{ fontSize: width / 16, fontFamily: "sultan" }}>
          Nippon Steel Engineering!
        </Text>
      </View>
      <View style={{ flex: 3, justifyContent: "space-around" }}>
        <View>
          <TextInput
            error={error}
            style={styles.input}
            mode="outlined"
            label="User ID"
            onChangeText={(text) => setId(text)}
            activeOutlineColor={Colors.light.tint}
          />
          <TextInput
            error={error}
            style={styles.input}
            mode="outlined"
            label="Password"
            onChangeText={(text) => setPass(text)}
            activeOutlineColor={Colors.light.tint}
            secureTextEntry={togglePass}
            right={
              <TextInput.Icon
                icon={togglePass ? "eye" : "eye-off"}
                onPress={() => setTogglePass((prev) => !prev)}
              />
            }
          />

          <Checkbox.Item
            labelStyle={{ ...mediumFont }}
            label="Remember me"
            status={checked ? "checked" : "unchecked"}
            color={Colors.light.tint}
            onPress={() => setChecked((prev) => !prev)}
          />
        </View>
        <Button
          mode="elevated"
          onPress={!loading && handleSubmit}
          buttonColor={Colors.light.tint}
          textColor="#fff"
          style={{ borderRadius: 10 }}
          labelStyle={{
            padding: width / 80,
            ...mediumFont,
          }}
          loading={loading}
        >
          Login
        </Button>
      </View>

      {/* </ScrollView> */}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: width / 12,
  },
  input: {
    marginVertical: height / 150,
    borderRadius: 999,
  },
  text: {},
});
