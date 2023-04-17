import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { Button } from "react-native-paper";
import * as secureStore from "expo-secure-store";
import { useDataContext } from "../../hooks/useDataContext";

function ConfirmLogout({ sheetId }) {
  const { setCurrentUser } = useDataContext();
  return (
    <ActionSheet
      id={sheetId}
      gestureEnabled={true}
      indicatorStyle={{ width: 100 }}
      containerStyle={{ borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
      // snapPoints={[30, 60, 100]}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={{
              fontWeight: 500,
              fontSize: 20,
              color: "#262626",
              textAlign: "center",
            }}
          >
            Confirm Logout ?
          </Text>
          <Text
            style={{
              fontWeight: 300,
              fontSize: 16,
              color: "gray",
              textAlign: "center",
              marginVertical: 10,
            }}
          >
            You will need OTP verification for your next login
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: "#eee",
              paddingVertical: 10,
              marginHorizontal: 20,
            }}
          />
        </View>
        <View style={styles.btnBox}>
          <Button
            style={styles.btn}
            buttonColor="#eee"
            mode="contained"
            textColor="#000"
            labelStyle={{ paddingVertical: 6, fontSize: 16 }}
            onPress={() => SheetManager.hide(sheetId)}
          >
            Cancle
          </Button>
          <Button
            style={styles.btn}
            buttonColor="#c43939"
            mode="contained"
            labelStyle={{ paddingVertical: 6, fontSize: 16 }}
            onPress={async () => {
              SheetManager.hide(sheetId);
              await secureStore.deleteItemAsync("accessToken");
              await secureStore.deleteItemAsync("pdfViewed");
              setCurrentUser(null);
            }}
          >
            Logout
          </Button>
        </View>
      </View>
    </ActionSheet>
  );
}

export default ConfirmLogout;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {},
  btnBox: {
    paddingTop: 20,
    flexDirection: "row",
  },
  btn: { flex: 1, margin: 10, borderRadius: 999 },
});
