import "react-native-gesture-handler";
import "expo-dev-client";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Alert, BackHandler } from "react-native";

export default function App() {
  const isLoadingComplete = useLoadedAssets();
  const [fontsLoaded] = useFonts({
    sultan: require("./assets/font/Sultan.ttf"),
    Poppins: require("./assets/font/Poppins-Regular.ttf"),
    PoppinsBold: require("./assets/font/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

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
          <Navigation />
        </SafeAreaProvider>
      )
    );
  }
}
