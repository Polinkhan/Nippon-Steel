import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React from "react";
import { HStack, Text } from "./Elements";
import { Color } from "../Healpers/Colors";

const MenuButton = (props) => {
  const { data } = props;
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity {...props}>
      <HStack style={styles.container}>
        <View
          style={[styles.iconBox, { backgroundColor: Color[colorScheme].bar }]}
        >
          <data.iconProvider name={data.icon} size={20} color={"gray"} />
        </View>
        <Text style={{ paddingLeft: 16 }}>{data.label}</Text>
      </HStack>
    </TouchableOpacity>
  );
};

export default MenuButton;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  iconBox: {
    padding: 20,
    borderRadius: 16,
  },
});
