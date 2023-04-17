import { useEffect, useState } from "react";
import { StyleSheet, Text, View, StatusBar as bar } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { IconButton } from "react-native-paper";
import { Dimensions } from "react-native";
import { mediumFont } from "../constants/SIzes";
const { width, height } = Dimensions.get("window");

const NetStatus = () => {
  const [netStatus, setNetStatus] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetStatus(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  return (
    !netStatus && (
      <View style={styles.netInfo}>
        <IconButton icon={"alert-outline"} size={width / 20} iconColor="#fff" />
        <Text
          style={{
            ...mediumFont,
            color: "#fff",
            paddingTop: 5,
          }}
        >
          No Internet Connection
        </Text>
      </View>
    )
  );
};
export default NetStatus;

const styles = StyleSheet.create({
  netInfo: {
    width: "100%",
    height: 80,
    paddingTop: bar.currentHeight,
    flexDirection: "row",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "#DB4437",
  },
});
