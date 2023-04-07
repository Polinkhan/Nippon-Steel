import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

function TypeSheet({ sheetId, payload }) {
  const { setType } = payload;
  return (
    <ActionSheet
      id={sheetId}
      gestureEnabled={true}
      indicatorStyle={{ width: 100 }}
      containerStyle={{ borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
      // snapPoints={[30, 60, 100]}
    >
      <View style={styles.container}>
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            activeOpacity={0.5}
            onPress={() => {
              setType(item.name);
              SheetManager.hide(sheetId);
            }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ActionSheet>
  );
}

export default TypeSheet;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 0,
  },
  item: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 6,
    backgroundColor: "#f0f0f0",
  },
});

const data = [
  {
    id: 1,
    name: "Payslip",
    value: "Payslip",
  },
  {
    id: 2,
    name: "TimeSheet",
    value: "TimeSheet",
  },
  {
    id: 3,
    name: "Other",
    value: "Other",
  },
];
