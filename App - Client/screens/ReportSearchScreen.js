import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import "../components/ActionSheet/sheets";
import { SheetManager, SheetProvider } from "react-native-actions-sheet";
import Colors from "../constants/Colors";

const ReportSearchScreen = ({ navigation }) => {
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [type, setType] = useState();
  return (
    <SheetProvider>
      <View style={styles.container}>
        <View style={{ flex: 5, justifyContent: "center" }}>
          <CustomButton
            name={month || "Select Month"}
            onPress={() => {
              SheetManager.show("month", { payload: { setMonth } });
            }}
          />
          <CustomButton
            name={year || "Select Year"}
            onPress={() => {
              SheetManager.show("year", { payload: { setYear } });
            }}
          />
          <CustomButton
            name={type || "Select Type"}
            onPress={() => {
              SheetManager.show("type", { payload: { setType } });
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            mode="elevated"
            buttonColor={Colors.light.tint}
            labelStyle={{ color: "white", padding: 8, fontSize: 18 }}
            style={{ borderRadius: 999 }}
            onPress={() => {
              navigation.navigate("searchAnimation");
            }}
          >
            Search
          </Button>
        </View>
      </View>
    </SheetProvider>
  );
};

const CustomButton = ({ name, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.selectBox}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <Text>{name}</Text>
      <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default ReportSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 60,
  },
  selectBox: {
    borderWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 16,
    marginVertical: 10,
    borderColor: "#aaa",
    borderRadius: 12,
  },
});
