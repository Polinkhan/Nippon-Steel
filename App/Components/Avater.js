import { TouchableOpacity, useColorScheme } from "react-native";
import React from "react";
import { Avatar as RNAvater } from "react-native-paper";
import { Color } from "../Healpers/Colors";

const Avater = (props) => {
  const colorScheme = useColorScheme();
  const { size, ...prop } = props;
  return (
    <TouchableOpacity {...prop}>
      <RNAvater.Image
        size={size||60}
        style={{
          backgroundColor: Color[colorScheme].bar,
          borderRadius: 16,
        }}
        source={require("../assets/images/avater.png")}
      />
    </TouchableOpacity>
  );
};

export default Avater;
