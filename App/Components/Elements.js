import { View, Text as RNText, useColorScheme } from "react-native";
import React from "react";
import { Color } from "../Healpers/Colors";
import { TextInput, Button as RNButton } from "react-native-paper";

const Text = (props) => {
  const colorScheme = useColorScheme();
  return (
    <RNText
      {...props}
      style={{
        color: Color[colorScheme].text,
        fontSize: 16,
        fontFamily: "pop",
        ...props.style,
      }}
    />
  );
};

const BoldText = (props) => {
  const colorScheme = useColorScheme();
  return (
    <RNText
      {...props}
      style={{
        color: Color[colorScheme].text,
        fontSize: 18,
        fontFamily: "boldExo",
        ...props.style,
      }}
    />
  );
};

const VStack = (props) => {
  const colorScheme = useColorScheme();
  return (
    <View
      {...props}
      style={{
        backgroundColor: Color[colorScheme].background,
        ...props.style,
      }}
    />
  );
};

const HStack = (props) => {
  const colorScheme = useColorScheme();
  return (
    <View
      {...props}
      style={{
        backgroundColor: Color[colorScheme].background,
        alignItems: "center",
        flexDirection: "row",
        ...props.style,
      }}
    />
  );
};

const Input = (props) => {
  const colorScheme = useColorScheme();
  console.log(props);
  return (
    <TextInput
      {...props}
      mode={"outlined"}
      outlineColor={Color[colorScheme].background}
      activeOutlineColor={Color[colorScheme].textSecondary}
      blurOnSubmit={false}
      theme={{
        colors: {
          text: Color[colorScheme].text,
          placeholder: Color[colorScheme].textSecondary,
        },
      }}
      style={{
        height: 60,
        marginBottom: 10,
        borderRadius: 16,
        backgroundColor: Color[colorScheme].secondary,
        ...props.style,
      }}
    />
  );
};

const Button = (props) => {
  const colorScheme = useColorScheme();
  return (
    <RNButton
      {...props}
      contentStyle={{
        paddingVertical: 12,
      }}
      labelStyle={{ color: "white" }}
      color={"black"}
      mode={"contained"}
      style={{ borderRadius: 12 }}
    />
  );
};

export { BoldText, Text, VStack, HStack, Input, Button };
