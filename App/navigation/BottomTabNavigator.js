// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ReportSearchScreen from "../screens/ReportSearchScreen";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";

const BottomTab = createBottomTabNavigator();

const iconStyle = {
  height: 40,
  width: 100,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 10,
  backgroundColor: Colors.light.tintOpacity,
  // elevation: 1,
};

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
        },
        tabBarButton: (props) => (
          <TouchableOpacity {...props} activeOpacity={0.7} />
        ),
        headerStyle: { backgroundColor: Colors.light.tabIconSelected },
        lazy: false,
      }}
    >
      <BottomTab.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <View style={styles.headerBox}>
              <Ionicons name={"ios-home"} size={20} color={"#fff"} />
              <Text style={styles.text}>Home</Text>
            </View>
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={focused && iconStyle}>
              <Ionicons
                name={focused ? "ios-home" : "ios-home-outline"}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="reportsearch"
        component={ReportSearchScreen}
        options={{
          headerTitle: () => (
            <View style={styles.headerBox}>
              <Ionicons name={"ios-search"} size={20} color={"#fff"} />
              <Text style={styles.text}>Search Report</Text>
            </View>
          ),
          tabBarIcon: ({ color, focused }) => (
            <View>
              <Ionicons name={"ios-search"} size={24} color={"#fff"} />
              <View style={styles.before} />
            </View>
          ),
          tabBarIconStyle: {
            bottom: 25,
            width: 120,
            backgroundColor: Colors.light.tint,
            borderRadius: 999,
            borderWidth: 6,
            borderColor: "white",
            // elevation: 1,
          },
        }}
      />
      <BottomTab.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          headerTitle: () => (
            <View style={styles.headerBox}>
              <Ionicons name={"ios-settings"} size={20} color={"#fff"} />
              <Text style={styles.text}>Settings</Text>
            </View>
          ),
          tabBarIcon: ({ color, focused }) => (
            <View style={focused && iconStyle}>
              <Ionicons
                name={focused ? "ios-settings" : "ios-settings-outline"}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerBox: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    marginHorizontal: 10,
    top: 2,
    fontFamily: "Poppins",
  },
});
