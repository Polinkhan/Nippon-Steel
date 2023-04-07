import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Switch } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import Colors from "../constants/Colors";
import {
  AntDesign,
  Foundation,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

const PermissionScreen = () => {
  return (
    <View style={styles.container}>
      {/* <Button
        onPress={async () => {
          await SecureStore.deleteItemAsync("onBoard");
        }}
      >
        Remove all data
      </Button> */}
      {data.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </View>
  );
};

const Item = ({ item }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  return (
    <View style={styles.item}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ width: 30, alignItems: "center" }}>
          <item.icon />
        </View>
        <Text style={{ fontFamily: "Poppins" }}> {item.name}</Text>
      </View>
      <Switch
        color={Colors.light.tint}
        value={isSwitchOn}
        onValueChange={() => setIsSwitchOn(!isSwitchOn)}
      />
    </View>
  );
};

export default PermissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  item: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: 20,
    borderColor: "#e9e9e9",
  },
});

const data = [
  {
    id: 1,
    name: "Notification",
    icon: () => (
      <Ionicons
        name="notifications-outline"
        size={20}
        color={Colors.light.tint}
      />
    ),
  },
  {
    id: 2,
    name: "Sound",
    icon: () => <AntDesign name="sound" size={18} color={Colors.light.tint} />,
  },
  {
    id: 3,
    name: "Vibration",
    icon: () => (
      <MaterialIcons name="vibration" size={20} color={Colors.light.tint} />
    ),
  },
  {
    id: 4,
    name: "Location",
    icon: () => (
      <Ionicons name="location-outline" size={20} color={Colors.light.tint} />
    ),
  },
];
