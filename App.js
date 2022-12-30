//add another comment for checking
import { useFonts } from "expo-font";
import { NativeBaseProvider, Skeleton, VStack } from "native-base";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import DataContextProvider, { useDataContext } from "./contexts/DataContext";
import { Alert, BackHandler, SafeAreaView, StatusBar } from "react-native";
import SignIn from "./components/Auth/SignIn";
import Home from "./components/Home/Home";
import { useCallback } from "react";
import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import About from "./components/About";
import Profile from "./components/Profile/Profile";
import { theme } from "./utils/StaticVariable";
import Payroll from "./components/Payroll/Payroll";
import Contact from "./components/Contact/Contact";
import Service from "./components/Payroll/Service";

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <DataContextProvider>
          <MyStack />
        </DataContextProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

function MyStack() {
  const { isAuth } = useDataContext();
  const { primaryColor } = theme;
  const Stack = createNativeStackNavigator();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Exit App",
          "Exiting the application?",
          [
            {
              text: "Cancel",
              onPress: () => "",
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => BackHandler.exitApp(),
            },
          ],
          {
            cancelable: false,
          }
        );
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );

  const [fontsLoaded] = useFonts({
    "Nunito-SemiBold": require("./assets/fonts/Nunito-SemiBold.ttf"),
  });

  return (
    fontsLoaded && (
      <>
        <StatusBar
          //   // animated={true}
          hidden={false} // true
          barStyle={"light-content"} //"default", "dark-content", "light-content"
          backgroundColor={primaryColor}
        />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        >
          {isAuth ? (
            <>
              <Stack.Screen name="/" component={BottomTab} />
              <Stack.Screen name="view" component={Service} />
            </>
          ) : (
            <Stack.Screen name="signin" component={SignIn} />
          )}
        </Stack.Navigator>
      </>
    )
  );
}

function BottomTab() {
  const Tab = createMaterialBottomTabNavigator();
  const { primaryColor } = theme;

  return (
    <Tab.Navigator barStyle={{ backgroundColor: primaryColor }}>
      {/*  */}

      {/* Bottom Tab Home Button */}
      <Tab.Screen
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="home"
              size={20}
              color={focused ? "white" : "#cccccc"}
            />
          ),
        }}
        name="home"
        component={Home}
        // initialParams={{ isRoot: true }}
      />

      {/* Bottom Tab Payroll Button */}
      <Tab.Screen
        options={{
          tabBarLabel: "Payroll",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name="money-check-alt"
              size={20}
              color={focused ? "white" : "#cccccc"}
            />
          ),
        }}
        name="payroll"
        component={Payroll}
      />

      {/* Bottom Tab Proile Button */}
      <Tab.Screen
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name="profile"
              size={20}
              color={focused ? "white" : "#cccccc"}
            />
          ),
        }}
        name="profile"
        component={Profile}
      />

      {/* Bottom Tab Contact Button */}
      <Tab.Screen
        options={{
          tabBarLabel: "Contact",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name="contacts"
              size={20}
              color={focused ? "white" : "#cccccc"}
            />
          ),
        }}
        name="contact"
        component={Contact}
      />

      {/* Bottom Tab About Button */}
      <Tab.Screen
        options={{
          tabBarLabel: "About",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name="infocirlceo"
              size={20}
              color={focused ? "white" : "#cccccc"}
            />
          ),
        }}
        name="about"
        component={About}
      />
    </Tab.Navigator>
  );
}
