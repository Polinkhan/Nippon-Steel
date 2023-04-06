import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import Onbording from "../screens/Onbording";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import { useDataContext } from "../hooks/useDataContext";
import LoginScreen from "../screens/LoginScreen";
import OtpVerifyScreen from "../screens/OtpVerifyScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchingAnimationScreen from "../screens/SearchingAnimationScreen";
import PDFViewerScreen from "../screens/PDFViewerScreen";
import { Text } from "react-native";
import AboutUsScreen from "../screens/AboutUsScreen";
import Colors from "../constants/Colors";
import { SheetProvider } from "react-native-actions-sheet";
import DataContextProvider from "../contexts/DataContext";
import { StyleSheet } from "react-native";
import ContactAdminScreen from "../screens/ContactAdminScreen";

export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
      <DataContextProvider>
        <SheetProvider>
          <RootNavigator />
        </SheetProvider>
      </DataContextProvider>
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { currentUser } = useDataContext();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.light.tabIconSelected },
        headerTintColor: "#f2f2f2",
        animation: "fade_from_bottom",
      }}
    >
      <Stack.Screen
        name="onboard"
        component={Onbording}
        options={{
          headerShown: false,
        }}
      />

      {currentUser ? (
        <>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{
              headerShown: false,
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="searchAnimation"
            component={SearchingAnimationScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="pdfviwer"
            component={PDFViewerScreen}
            options={({ route }) => ({
              animation: "slide_from_right",
              headerTitle: ({ tintColor }) => (
                <Text style={styles.text}>{route.params?.name}</Text>
              ),
            })}
          />
          <Stack.Screen
            name="about"
            component={AboutUsScreen}
            options={{
              headerTitle: ({ tintColor }) => (
                <Text style={styles.text}>About App</Text>
              ),
            }}
          />
          <Stack.Screen
            name="contact"
            component={ContactAdminScreen}
            options={{
              headerTitle: ({ tintColor }) => (
                <Text style={styles.text}>Contact Admin</Text>
              ),
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="otp"
            component={OtpVerifyScreen}
            options={{
              animation: "slide_from_right",
              headerTitle: "Enter OTP code",
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: "#fff",
    marginHorizontal: 10,
    fontFamily: "Poppins",
  },
});
