import "react-native-gesture-handler";
import "expo-dev-client";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, StatusBar as bar } from "react-native";
import { mediumFont } from "./constants/SIzes";
import NetInfo from "@react-native-community/netinfo";
import { IconButton } from "react-native-paper";
import { Dimensions } from "react-native";
import NetStatus from "./components/NetStatus";
import { Toast } from "react-native-toast-message/lib/src/Toast";
const { width, height } = Dimensions.get("window");

export default function App() {
  const isLoadingComplete = useLoadedAssets();
  const [fontsLoaded] = useFonts({
    sultan: require("./assets/font/Sultan.ttf"),
    Poppins: require("./assets/font/Poppins-Regular.ttf"),
    PoppinsBold: require("./assets/font/Poppins-Bold.ttf"),
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      fontsLoaded && (
        <SafeAreaProvider>
          <StatusBar
            style={"light"}
            animated={true}
            backgroundColor="rgba(0,0,0,0.3)"
          />
          <NetStatus />
          <Navigation />
          <Toast position="bottom" bottomOffset={20} />
        </SafeAreaProvider>
      )
    );
  }
}
