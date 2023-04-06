import { StyleSheet, View } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { Button, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

const NextButton = ({ scrollTo }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <IconButton
        icon="chevron-left"
        iconColor={Colors.light.tint}
        size={32}
        onPress={() => {
          scrollTo(-1);
        }}
      />
      <Button
        textColor={Colors.light.tint}
        labelStyle={{ paddingHorizontal: 50, paddingVertical: 5 }}
        style={{ borderRadius: 999 }}
        onPress={async () => {
          await SecureStore.setItemAsync("onBoard", JSON.stringify(true));
          navigation.replace("login");
        }}
      >
        Get Started
      </Button>
      <IconButton
        icon={"chevron-right"}
        iconColor={Colors.light.tint}
        size={32}
        onPress={() => {
          scrollTo(1);
        }}
      />
    </View>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
