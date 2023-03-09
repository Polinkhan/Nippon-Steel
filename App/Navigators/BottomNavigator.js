import { StyleSheet, Text, useColorScheme } from "react-native";
import React from "react";
import HomeScreen from "../Screens/HomeScreen";
import {
  ContactIcon,
  HomeIcon,
  PayslipIcon,
  SettingIcon,
} from "../Components/Icons";
import { Color } from "../Healpers/Colors";
import PayslipScreen from "../Screens/PayslipScreen";
import ContactScreen from "../Screens/ContactScreen";
import SettingScreen from "../Screens/SettingScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BoldText } from "../Components/Elements";

const BottomNavigator = () => {
  const BottomTab = createBottomTabNavigator();
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarColor: Color[colorScheme].bar,
        tabBarActiveTintColor: Color[colorScheme].text,
        tabBarHideOnKeyboard: true,
        lazy: false,
        tabBarStyle: {
          height: 60,
        },
      }}
    >
      <BottomTab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: (color) => <HomeIcon color={color} />,
          tabBarLabel: ({ color }) => (
            <Text style={[{ color: color }, styles.text]}>Home</Text>
          ),
          headerTitle: () => (
            <BoldText style={{ fontSize: 24 }}>
              Nippon Steel Engineering
            </BoldText>
          ),
        }}
      />
      <BottomTab.Screen
        name="payslip"
        component={PayslipScreen}
        options={{
          tabBarIcon: (color) => <PayslipIcon color={color} />,
          tabBarLabel: ({ color }) => (
            <Text style={[{ color: color }, styles.text]}>Payslip</Text>
          ),
          headerTitle: () => (
            <BoldText style={{ fontSize: 24 }}>Payslip Report</BoldText>
          ),
        }}
      />
      <BottomTab.Screen
        name="setting"
        component={SettingScreen}
        options={{
          tabBarIcon: (color) => <SettingIcon color={color} />,
          tabBarLabel: ({ color }) => (
            <Text style={[{ color: color }, styles.text]}>Settings</Text>
          ),
          headerTitle: () => (
            <BoldText style={{ fontSize: 24 }}>Settings</BoldText>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  text: {
    fontFamily: "pop",
  },
});
