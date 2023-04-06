import "react-native-gesture-handler";
import "expo-dev-client";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import { useFonts } from "expo-font";

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
          <Navigation />
        </SafeAreaProvider>
      )
    );
  }
}
