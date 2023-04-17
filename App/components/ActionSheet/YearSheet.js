import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {data.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.item}
              activeOpacity={0.5}
              onPress={() => {
                setYear(item.value);
                SheetManager.hide(sheetId);
              }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ActionSheet>
  );
}

export default YearSheet;

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
    id: 0,
    name: "2022",
    value: "22",
  },
  {
    id: 1,
    name: "2023",
    value: "23",
  },
  {
    id: 2,
    name: "2024",
    value: "24",
  },
  {
    id: 3,
    name: "2025",
    value: "25",
  },
  {
    id: 4,
    name: "2026",
    value: "26",
  },
  {
    id: 5,
    name: "2027",
    value: "27",
  },
  {
    id: 6,
    name: "2028",
    value: "28",
  },
  {
    id: 7,
    name: "2029",
    value: "29",
  },
  {
    id: 8,
    name: "2030",
    value: "30",
  },
];
