import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useRef, useState } from "react";
import Colors from "../constants/Colors";
import { MonoText } from "../components/StyledText";
import { Button, Checkbox, TextInput } from "react-native-paper";
import { StatusBar } from "react-native";
import { authClient } from "../Api/Client";
import { Keyboard } from "react-native";

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
      const { message } = err?.response.data;
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.light.background }]}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <MonoText style={{ fontWeight: 800, fontSize: 32 }}>Welcome</MonoText>
        <MonoText style={{ fontWeight: 500, fontSize: 18 }}>
          Nippon Steel Engineering
        </MonoText>
      </View>
      <View style={{ flex: 2, justifyContent: "center" }}>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="User ID"
          onChangeText={(text) => setId(text)}
          activeOutlineColor={Colors.light.border}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Password"
          onChangeText={(text) => setPass(text)}
          activeOutlineColor={Colors.light.border}
          secureTextEntry
          right={<TextInput.Affix text="/100" />}
        />

        <View>
          <Checkbox.Item
            label="Remember me"
            status={checked ? "checked" : "unchecked"}
            color={Colors.light.primary}
            onPress={() => setChecked((prev) => !prev)}
          />
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button
          mode="elevated"
          onPress={!loading && handleSubmit}
          buttonColor={Colors.light.primary}
          textColor="#fff"
          style={{ borderRadius: 999 }}
          labelStyle={{ fontSize: 20, padding: 8 }}
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
    marginTop: StatusBar.currentHeight,
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
