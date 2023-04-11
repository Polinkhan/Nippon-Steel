import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useRef, useState } from "react";
import Colors from "../constants/Colors";
import { MonoText } from "../components/StyledText";
import { Button, Checkbox, TextInput } from "react-native-paper";
import { authClient } from "../Api/Client";
import { Keyboard } from "react-native";
import { StatusBar } from "expo-status-bar";

const LoginScreen = ({ navigation }) => {
  const [checked, setChecked] = useState(true);
  const [id, setId] = useState();
  const [pass, setPass] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    Keyboard.dismiss();
    try {
      setLoading(true);
      const res = (await authClient.post("/login", { id, pass })).data;
      ToastAndroid.show(res?.message, ToastAndroid.SHORT);
      navigation.navigate("otp", { id });
    } catch (err) {
      const { message } = err?.response?.data;
      console.log(message);
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.light.background }]}
    >
      <StatusBar animated style="dark" />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ fontSize: 56, fontFamily: "sultan" }}>Welcome</Text>
        <Text style={{ fontSize: 28, fontFamily: "sultan" }}>
          Nippon Steel Engineering
        </Text>
      </View>
      <View style={{ flex: 2, justifyContent: "center" }}>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="User ID"
          onChangeText={(text) => setId(text)}
          activeOutlineColor={Colors.light.tint}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Password"
          onChangeText={(text) => setPass(text)}
          activeOutlineColor={Colors.light.tint}
          secureTextEntry
          right={<TextInput.Affix text="/100" />}
        />

        <View>
          <Checkbox.Item
            labelStyle={{ fontFamily: "Poppins" }}
            label="Remember me"
            status={checked ? "checked" : "unchecked"}
            color={Colors.light.tint}
            onPress={() => setChecked((prev) => !prev)}
          />
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button
          mode="elevated"
          onPress={!loading && handleSubmit}
          buttonColor={Colors.light.tint}
          textColor="#fff"
          style={{ borderRadius: 999 }}
          labelStyle={{
            fontSize: 20,
            padding: 5,
            fontFamily: "Poppins",
            paddingTop: 10,
          }}
          loading={loading}
        >
          Login
        </Button>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 40,
  },
  input: {
    marginVertical: 10,
    borderRadius: 999,
  },
  text: {},
});
