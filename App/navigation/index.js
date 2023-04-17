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
import { Platform, Text } from "react-native";
import AboutUsScreen from "../screens/AboutUsScreen";
import Colors from "../constants/Colors";
import { SheetProvider } from "react-native-actions-sheet";
import DataContextProvider from "../contexts/DataContext";
import { StyleSheet } from "react-native";
import ContactAdminScreen from "../screens/ContactAdminScreen";
import UpdateScreen from "../screens/UpdateScreen";
import PermissionScreen from "../screens/PermissionScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ReportScreen from "../screens/ReportScreen";

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
        animation:
          Platform.OS === "ios" ? "slide_from_right" : "fade_from_bottom",
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
                <Text style={styles.text}>{route.params.name}</Text>
              ),
            })}
          />
          <Stack.Screen
            name="about"
            component={AboutUsScreen}
            options={({ route }) => ({
              headerTitle: ({ tintColor }) => (
                <Text style={styles.text}>{route.params.name}</Text>
              ),
            })}
          />
          <Stack.Screen
            name="profile"
            component={ProfileScreen}
            options={({ route }) => ({
              headerTitle: ({ tintColor }) => (
                <Text style={styles.text}>{route.params.name}</Text>
              ),
            })}
          />
          <Stack.Screen
            name="contact"
            component={ContactAdminScreen}
            options={({ route }) => ({
              headerTitle: ({ tintColor }) => (
                <Text style={styles.text}>{route.params.name}</Text>
              ),
            })}
          />
          <Stack.Screen
            name="update"
            component={UpdateScreen}
            options={({ route }) => ({
              headerTitle: ({ tintColor }) => (
                <Text style={styles.text}>{route.params.name}</Text>
              ),
            })}
          />
          <Stack.Screen
            name="permission"
            component={PermissionScreen}
            options={({ route }) => ({
              headerTitle: ({ tintColor }) => (
                <Text style={styles.text}>{route.params.name}</Text>
              ),
            })}
          />
          <Stack.Screen
            name="report"
            component={ReportScreen}
            options={({ route }) => ({
              headerTitle: ({ tintColor }) => (
                <Text style={styles.text}>{route.params.name}</Text>
              ),
            })}
          />
          <Stack.Screen
            name="changePassword"
            component={ChangePasswordScreen}
            options={({ route }) => ({
              headerTitle: ({ tintColor }) => (
                <Text style={styles.text}>{route.params.name}</Text>
              ),
            })}
            initialParams={{ isVerified: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
      <Stack.Screen
        name="otp"
        component={OtpVerifyScreen}
        options={{
          animation: "slide_from_right",
          headerTitle: "Enter OTP code",
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    top: 2,
    color: "#fff",
    fontFamily: "Poppins",
  },
});
