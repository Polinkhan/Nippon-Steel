import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyProfileScreen from "../Screens/MyProfileScreen";
import { Text } from "../Components/Elements";
import FindingAnimationScreen from "../Screens/FindingAnimationScreen";
import ContactScreen from "../Screens/ContactScreen";
import PDFViewScreen from "../Screens/PDFViewScreen";
import AboutAppScreen from "../Screens/AboutAppScreen";
import UpdateScreen from "../Screens/UpdateScreen";

const StackNavigators = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="profile"
        component={MyProfileScreen}
        options={{
          headerTitle: () => <Text>My Profile</Text>,
        }}
      />
      <Stack.Screen
        name="contact"
        component={ContactScreen}
        options={{
          headerTitle: () => <Text>Contact List</Text>,
        }}
      />
      <Stack.Screen
        name="about"
        component={AboutAppScreen}
        options={{
          headerTitle: () => <Text>About App</Text>,
        }}
      />
      <Stack.Screen
        name="update"
        component={UpdateScreen}
        options={{
          headerTitle: () => <Text>Update App</Text>,
        }}
      />
      <Stack.Screen
        name="pdfview"
        component={PDFViewScreen}
        options={{
          headerTitle: () => <Text>PDF VIEW</Text>,
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="search"
        component={FindingAnimationScreen}
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigators;
