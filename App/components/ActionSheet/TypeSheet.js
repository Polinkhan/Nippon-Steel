import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { dbClient } from "../../Api/Client";

function TypeSheet({ sheetId, payload }) {
  const [data, setData] = useState([]);
  const { setType } = payload;

  useEffect(() => {
    console.log("Start");
    dbClient
      .get("app/typeList")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err.response.data));
  }, []);

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
            key={item.ID}
            style={styles.item}
            activeOpacity={0.5}
            onPress={() => {
              setType(item.Type);
              SheetManager.hide(sheetId);
            }}
          >
            <Text>{item.Type}</Text>
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
  },
  item: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 6,
    backgroundColor: "#f0f0f0",
  },
});
