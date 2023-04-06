import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

function MonthSheet({ sheetId, payload }) {
  const { setMonth } = payload;
  return (
    <ActionSheet
      id={sheetId}
      gestureEnabled={true}
      indicatorStyle={{ width: 100 }}
      containerStyle={{ borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
      // snapPoints={[60, 100]}
    >
      <View style={styles.container}>
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            activeOpacity={0.5}
            onPress={() => {
              setMonth(item.name);
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

export default MonthSheet;

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
    name: "January",
    value: "Jan",
  },
  {
    id: 2,
    name: "February",
    value: "Feb",
  },
  {
    id: 3,
    name: "March",
    value: "Mar",
  },
  {
    id: 4,
    name: "April",
    value: "Apr",
  },
  {
    id: 5,
    name: "May",
    value: "May",
  },
  {
    id: 6,
    name: "June",
    value: "Jun",
  },
  {
    id: 7,
    name: "July",
    value: "Jul",
  },
  {
    id: 8,
    name: "August",
    value: "Aug",
  },
  {
    id: 9,
    name: "September",
    value: "Sep",
  },
  {
    id: 10,
    name: "October",
    value: "Oct",
  },
  {
    id: 11,
    name: "November",
    value: "Nov",
  },
  {
    id: 12,
    name: "December",
    value: "Dec",
  },
];
