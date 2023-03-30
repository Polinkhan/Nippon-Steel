import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { HStack, Text } from "./Elements";
import { Color } from "../Healpers/Colors";
import { useColorScheme } from "react-native";
import { Payslip } from "../Healpers/StaticData";

const RNPicker = ({ name, selectedValue, setSelectedValue }) => {
  const colorScheme = useColorScheme();
  const data = Payslip[name];

  useEffect(() => {
    setSelectedValue((prev) => ({ ...prev, [name]: data[0].value }));
  }, []);

  return (
    <HStack style={{ justifyContent: "space-between", alignItems: "center" }}>
      <Text>{name.toUpperCase()}</Text>
      <Picker
        selectedValue={selectedValue[name]}
        style={{
          height: 50,
          width: 150,
          backgroundColor: Color[colorScheme].bar,
          color: Color[colorScheme].text,
        }}
        onValueChange={(itemValue, i) =>
          setSelectedValue((prev) => ({ ...prev, [name]: itemValue }))
        }
      >
        {data.map((item, i) => (
          <Picker.Item key={i} label={item.label} value={item.value} />
        ))}
      </Picker>
    </HStack>
  );
};

export default RNPicker;
