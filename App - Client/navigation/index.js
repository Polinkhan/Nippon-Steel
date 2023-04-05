import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import Onbording from "../screens/Onbording";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import DataContextProvider from "../contexts/DataContext";
import { useDataContext } from "../hooks/useDataContext";
import LoginScreen from "../screens/LoginScreen";
import { Provider as PaperProvider } from "react-native-paper";
import OtpVerifyScreen from "../screens/OtpVerifyScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useEffect, useState } from "react";
import SearchingAnimationScreen from "../screens/SearchingAnimationScreen";

export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
      <DataContextProvider>
        <RootNavigator />
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
        headerStyle: { backgroundColor: "#f0f0f0" },
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
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="searchAnimation"
            component={SearchingAnimationScreen}
            options={{ headerShown: false, animation: "fade_from_bottom" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{ headerShown: false, animation: "fade_from_bottom" }}
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
