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

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarShowLabel: false,
        tabBarStyle: { height: 70 },
        tabBarButton: (props) => (
          <TouchableOpacity {...props} activeOpacity={0.5} />
        ),
      }}
    >
      <BottomTab.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <View style={styles.headerBox}>
              <Ionicons name={"ios-home-outline"} size={20} color={"#000"} />
              <Text style={styles.text}>Home</Text>
            </View>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "ios-home" : "ios-home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="reportsearch"
        component={ReportSearchScreen}
        options={{
          headerTitle: () => (
            <View style={styles.headerBox}>
              <Ionicons name={"ios-search"} size={20} color={"#000"} />
              <Text style={styles.text}>Search Report</Text>
            </View>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={"ios-search"} size={24} color={"#fff"} />
          ),
          tabBarIconStyle: {
            bottom: 25,
            width: 70,
            backgroundColor: Colors[colorScheme].tint,
            borderRadius: 999,
            borderWidth: 6,
            borderColor: "white",
          },
        }}
      />
      <BottomTab.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          headerTitle: () => (
            <View style={styles.headerBox}>
              <Ionicons
                name={"ios-settings-outline"}
                size={20}
                color={"#000"}
              />
              <Text style={styles.text}>Settings</Text>
            </View>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "ios-settings" : "ios-settings-outline"}
              size={24}
              color={color}
            />
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
  },
  text: {
    fontSize: 20,
    fontWeight: 600,
    marginHorizontal: 10,
  },
});
