import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Switch } from "react-native-paper";
import * as SecureStore from "expo-secure-store";

const ChangePasswordScreen = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  return (
    <View style={styles.container}>
      <Switch
        value={isSwitchOn}
        onValueChange={() => setIsSwitchOn(!isSwitchOn)}
      />
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

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
