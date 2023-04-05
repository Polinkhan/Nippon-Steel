import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import * as SecureStore from "expo-secure-store";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Button
        onPress={async () => {
          await SecureStore.deleteItemAsync("onBoard");
        }}
      >
        Remove all data
      </Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
