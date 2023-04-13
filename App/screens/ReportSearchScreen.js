import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import "../components/ActionSheet/sheets";
import { SheetManager, SheetProvider } from "react-native-actions-sheet";
import Colors from "../constants/Colors";
import LottieView from "lottie-react-native";
import { Dimensions } from "react-native";
import { font } from "../constants/SIzes";
const Payslip = require("../assets/lottie/Payslip.json");
const { width, height } = Dimensions.get("window");

const ReportSearchScreen = ({ navigation }) => {
  const [type, setType] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 3,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {/* <Lo  */}
        <Text style={{ fontFamily: "Poppins", ...font }}>
          OFS Crew Document Search
        </Text>
      </View>
      <View
        style={{
          flex: 6,
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "blue",
          backgroundColor: "#fff",
          borderRadius: 12,
          elevation: 2,
        }}
      >
        <View style={{ width: "80%" }}>
          <CustomButton
            name={type || "Select Type"}
            onPress={() => {
              SheetManager.show("type", { payload: { setType } });
            }}
          />

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
        </View>
        <Button
          mode="contained"
          icon="database-search"
          buttonColor={Colors.light.tint}
          labelStyle={{
            top: 1,
            fontFamily: "Poppins",
          }}
          contentStyle={{ padding: height / 150 }}
          style={{
            width: "80%",
            borderRadius: 8,
            borderColor: Colors.light.tint,
          }}
          onPress={() => {
            if (type && month && year) {
              navigation.navigate("searchAnimation", { type, month, year });
            } else {
              ToastAndroid.show("Empty Field", ToastAndroid.SHORT);
            }
          }}
        >
          Search
        </Button>
      </View>
    </View>
  );
};

const CustomButton = ({ name, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.selectBox}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <Text style={{ ...font, fontWeight: "500", color: "#505050" }}>
        {name}
      </Text>
      <MaterialIcons name="keyboard-arrow-down" size={24} color="gray" />
    </TouchableOpacity>
  );
};

export default ReportSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: height / 50,
    paddingBottom: height / 20,
  },
  selectBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: height / 50,
    marginVertical: height / 100,
    borderColor: "#aaa",
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 2,
  },
});
