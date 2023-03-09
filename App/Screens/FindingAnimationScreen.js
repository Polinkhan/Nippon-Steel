import { StyleSheet, Image, ToastAndroid } from "react-native";
import React, { useEffect } from "react";
import { Text, VStack } from "../Components/Elements";
import { client } from "../Api/Client";
import * as Haptics from "expo-haptics";
import { useDataContext } from "../Contexts/DataContext";

const FindingAnimationScreen = ({ navigation, route }) => {
  const { selectedValue } = route.params;
  const { currentUser } = useDataContext();
  useEffect(() => {
    client
      .post(`db/getPayslipData/${currentUser.UserID}`, { ...selectedValue })
      .then((res) => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        navigation.replace("pdfview", { ...res.data });
      })
      .catch((err) => {
        const { message } = err.response.data.error || "";
        ToastAndroid.show(message, ToastAndroid.SHORT);
        navigation.goBack();
      });
  }, []);

  return (
    <VStack style={styles.container}>
      <Image source={require("../assets/GIF/Searching.gif")} />
      <Text style={styles.text}>Searching Your File ...</Text>
    </VStack>
  );
};

export default FindingAnimationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    color: "black",
    fontSize: 20,
    marginVertical: 20,
  },
});
