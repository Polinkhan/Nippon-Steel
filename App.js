import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { BackHandler, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./App/Navigators/RootNavigator";

export default function App() {
  const [fontsLoaded] = useFonts({
    exo: require("./App/assets/fonts/static/Exo2-Regular.ttf"),
    boldExo: require("./App/assets/fonts/static/Exo2-Bold.ttf"),
    lightExo: require("./App/assets/fonts/static/Exo2-Light.ttf"),
    pop: require("./App/assets/fonts/static/Poppins-Regular.ttf"),
    boldPop: require("./App/assets/fonts/static/Poppins-Bold.ttf"),
    lightPop: require("./App/assets/fonts/static/Poppins-Light.ttf"),
  });


  return (
    <SafeAreaProvider style={styles.statusbar}>
      <StatusBar />
      {fontsLoaded && <RootNavigator />}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  statusbar: {},
});
