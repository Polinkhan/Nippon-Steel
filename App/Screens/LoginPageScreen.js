import {
  ActivityIndicator,
  StyleSheet,
  ToastAndroid,
  useColorScheme,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { Button, Text, VStack } from "../Components/Elements";
import * as SecureStore from "expo-secure-store";
import { Color } from "../Healpers/Colors";
import { Checkbox, TextInput } from "react-native-paper";
import { client } from "../Api/Client";
import { useDataContext } from "../Contexts/DataContext";

const LoginPageScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const [loginInfo, setLoginInfo] = useState({ id: "", pass: "" });
  const [isPassHide, setPassHide] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const { setCurrentUser, isFetched } = useDataContext();
  const nextInput = useRef();

  const inputTheme = {
    colors: {
      text: Color[colorScheme].text,
      placeholder: Color[colorScheme].textSecondary,
    },
  };

  const handleSubmit = async () => {
    setBtnLoading(true);
    client
      .post("auth/login", { ...loginInfo })
      .then(({ data }) => {
        const { accessToken, user } = data;
        rememberMe && SecureStore.setItemAsync("accessToken", accessToken);
        setCurrentUser(user);
      })
      .catch(({ response }) => {
        const { message } = response.data.error;
        ToastAndroid.show(message, ToastAndroid.SHORT);
      })
      .finally(() => {
        setBtnLoading(false);
      });
  };

  return (
    <VStack style={styles.container}>
      <VStack style={{ flex: 2, justifyContent: "center" }}>
        <Text style={{ fontFamily: "boldExo", fontSize: 32 }}>Welcome</Text>
        <Text>Nippon Steel Engineering</Text>
      </VStack>
      {isFetched ? (
        <VStack style={{ flex: 3 }}>
          <TextInput
            label={"User ID"}
            mode={"outlined"}
            outlineColor={Color[colorScheme].background}
            activeOutlineColor={Color[colorScheme].textSecondary}
            blurOnSubmit={false}
            theme={inputTheme}
            onSubmitEditing={() => {
              nextInput.current.focus();
            }}
            style={[
              styles.input,
              { backgroundColor: Color[colorScheme].secondary },
            ]}
            onChangeText={(text) =>
              setLoginInfo((prev) => ({ ...prev, id: text }))
            }
          />
          <TextInput
            ref={nextInput}
            label={"Password"}
            secureTextEntry={isPassHide}
            mode={"outlined"}
            outlineColor={Color[colorScheme].background}
            activeOutlineColor={Color[colorScheme].textSecondary}
            theme={inputTheme}
            style={[
              styles.input,
              { backgroundColor: Color[colorScheme].secondary },
            ]}
            right={
              <TextInput.Icon
                icon="eye"
                color={Color[colorScheme].textSecondary}
                onPress={() => setPassHide((prev) => !prev)}
              />
            }
            onChangeText={(text) =>
              setLoginInfo((prev) => ({ ...prev, pass: text }))
            }
          />
          <Checkbox.Item
            status={rememberMe ? "checked" : "unchecked"}
            onPress={() => {
              setRememberMe((prev) => !prev);
            }}
            color={"gray"}
            label={"Remenber me"}
            labelStyle={{ color: "gray" }}
          />
          <Button
            style={{ marginVertical: 30 }}
            loading={btnLoading}
            disabled={btnLoading}
            onPress={handleSubmit}
          >
            <Text style={{ color: "white" }}>
              {btnLoading ? "Signing in ..." : "Sign in"}
            </Text>
          </Button>
        </VStack>
      ) : (
        <View
          style={{ flex: 3, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator
            animating={true}
            color={Color[colorScheme].text}
            size={60}
          />
        </View>
      )}
    </VStack>
  );
};

export default LoginPageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    padding: 30,
  },
  input: {
    marginBottom: 10,
  },
});
