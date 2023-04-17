import { Keyboard, StyleSheet, ToastAndroid, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { useDataContext } from "../hooks/useDataContext";
import Colors from "../constants/Colors";
import { authClient } from "../Api/Client";
import { font } from "../constants/SIzes";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const ChangePasswordScreen = ({ navigation, route }) => {
  const { isVerified } = route.params;
  const { currentUser } = useDataContext();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState({ password: null });
  const handleSubmit = async () => {
    Keyboard.dismiss();
    try {
      setLoading(true);
      await authClient.post("/requestOTP", {
        id: currentUser.UserID,
        pass: password.password,
      });
      navigation.replace("otp", {
        id: currentUser.UserID,
        redirectTo: "changePassword",
        Email: currentUser.Email,
      });
    } catch (err) {
      Toast.show({ type: "error", text1: err?.response?.data?.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPassword = async () => {
    if (password.password !== password.confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Password and Confirm Password not matched",
      });
      return;
    }

    authClient
      .post("/changePassword", {
        id: currentUser.UserID,
        pass: password.password,
      })
      .then(async ({ data }) => {
        const { accessToken } = data;
        await SecureStore.setItemAsync("accessToken", accessToken);
        Toast.show({
          type: "success",
          text1: "Password has changed successfully",
        });
        navigation.goBack();
      });
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
        />
        <TextInput
          mode="outlined"
          label={"Confirm New Password"}
          style={styles.input}
          activeOutlineColor={Colors.light.tint}
          onChangeText={(text) =>
            setPassword((prev) => ({ ...prev, confirmPassword: text }))
          }
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
        ...font,
        padding: 2,
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
    flex: Platform.OS === "ios" ? 0.5 : 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: { width: "80%", backgroundColor: "#fff", marginVertical: 5 },
});
