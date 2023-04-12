import { Keyboard, StyleSheet, ToastAndroid, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { useDataContext } from "../hooks/useDataContext";
import Colors from "../constants/Colors";
import { authClient } from "../Api/Client";

const ChangePasswordScreen = ({ navigation, route }) => {
  const { isVerified } = route.params;
  const { currentUser } = useDataContext();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState({ password: null });
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setError(false);
    try {
      setLoading(true);
      const res = (
        await authClient.post("/requestOTP", {
          id: currentUser.UserID,
          pass: password.password,
        })
      ).data;
      ToastAndroid.show(res?.message, ToastAndroid.SHORT);
      navigation.replace("otp", {
        id: currentUser.UserID,
        redirectTo: "changePassword",
      });
    } catch (err) {
      setError(true);
      const { message } = err?.response?.data;
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPassword = async () => {
    setError(false);
    if (password.password !== password.confirmPassword) {
      setError(true);
      if (!password?.password) {
        ToastAndroid.show("Empty Password Field", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(
          "Password & Confirm Password not matched",
          ToastAndroid.SHORT
        );
      }
      return;
    }

    try {
      await authClient.post("/changePassword", {
        id: currentUser.UserID,
        pass: password.password,
      });
      ToastAndroid.show("Password Changed Successfully", ToastAndroid.SHORT);
      navigation.goBack();
    } catch (err) {
      const { message } = err?.response?.data;
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  };

  if (isVerified) {
    return (
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          label={"New Password"}
          style={styles.input}
          activeOutlineColor={Colors.light.tint}
          onChangeText={(text) =>
            setPassword((prev) => ({ ...prev, password: text }))
          }
          error={error}
        />
        <TextInput
          mode="outlined"
          label={"Confirm New Password"}
          style={styles.input}
          activeOutlineColor={Colors.light.tint}
          onChangeText={(text) =>
            setPassword((prev) => ({ ...prev, confirmPassword: text }))
          }
          error={error}
        />
        <CustomButton
          name={"Submit Password"}
          onClick={handleSubmitPassword}
          loading={loading}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          label={"Enter Current Password"}
          style={{ width: "80%", backgroundColor: "#f2f2f2" }}
          activeOutlineColor={Colors.light.tint}
          onChangeText={(text) => setPassword({ password: text })}
        />
        <CustomButton
          name={"Verify Password"}
          onClick={handleSubmit}
          loading={loading}
        />
      </View>
    );
  }
};

const CustomButton = ({ name, onClick, loading }) => {
  return (
    <Button
      mode="elevated"
      onPress={!loading && onClick}
      buttonColor={Colors.light.tint}
      textColor="#fff"
      style={{ borderRadius: 8, width: "80%", marginTop: 50 }}
      labelStyle={{
        fontSize: 14,
        padding: 2,
        fontFamily: "Poppins",
        paddingTop: 5,
      }}
      loading={loading}
    >
      {name}
    </Button>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: { width: "80%", backgroundColor: "#fff", marginVertical: 5 },
});
