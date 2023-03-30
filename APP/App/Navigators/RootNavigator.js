import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigator from "./BottomNavigator";
import { useColorScheme } from "react-native";
import StackNavigators from "./StackNavigators";
import DataContextProvider, { useDataContext } from "../Contexts/DataContext";
import LoginPageScreen from "../Screens/LoginPageScreen";

const RootNavigator = () => {
  const colorScheme = useColorScheme();
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <DataContextProvider>
        <Root />
      </DataContextProvider>
    </NavigationContainer>
  );
};

const Root = () => {
  const Stack = createNativeStackNavigator();
  const { currentUser } = useDataContext();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade_from_bottom",
      }}
    >
      {currentUser ? (
        <>
          <Stack.Screen
            name="root"
            component={BottomNavigator}
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen name="stack" component={StackNavigators} />
        </>
      ) : (
        <Stack.Screen name="login" component={LoginPageScreen} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
