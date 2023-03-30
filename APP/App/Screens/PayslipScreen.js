import { StyleSheet, View, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { Button, Text, VStack } from "../Components/Elements";
import RNPicker from "../Components/RNPicker";
import { Toast } from "../Healpers/functions";

const PayslipScreen = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState({});

  return (
    <VStack style={styles.container}>
      <View style={styles.header}>
        <Text>Payslip Report</Text>
      </View>
      <VStack style={styles.pickerBox}>
        <RNPicker
          name={"type"}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
        <RNPicker
          name={"year"}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
        <RNPicker
          name={"month"}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      </VStack>
      <VStack style={{ flex: 0.4, justifyContent: "center" }}>
        <Button
          onPress={() => {
            // navigation.navigate("search", { selectedValue });
            navigation.navigate("stack", {
              screen: "search",
              params: { selectedValue },
            });
          }}
        >
          <Text style={{ color: "white" }}>submit</Text>
        </Button>
      </VStack>
    </VStack>
  );
};

export default PayslipScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerBox: {
    flex: 0.3,
    padding: 20,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#999999",
    justifyContent: "space-between",
  },
});
