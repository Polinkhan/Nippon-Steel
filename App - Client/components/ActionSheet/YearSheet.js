import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

function YearSheet({ sheetId, payload }) {
  const { setYear } = payload;
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
              setYear(item.name);
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

export default YearSheet;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 0,
  },
  item: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 4,
    backgroundColor: "#eee",
  },
});

const data = [
  {
    id: 1,
    name: "2020",
    value: "20",
  },
  {
    id: 2,
    name: "2021",
    value: "21",
  },
  {
    id: 3,
    name: "2022",
    value: "22",
  },
  {
    id: 4,
    name: "2023",
    value: "23",
  },
  {
    id: 5,
    name: "2024",
    value: "24",
  },
  {
    id: 6,
    name: "2025",
    value: "25",
  },
];
