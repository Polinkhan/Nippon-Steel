//add another comment
import { useFonts } from "expo-font";
import { NativeBaseProvider, Skeleton, VStack } from "native-base";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import DataContextProvider, { useDataContext } from "./contexts/DataContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, BackHandler } from "react-native";
import SignIn from "./components/Auth/SignIn";
import Home from "./components/Home";
import { useCallback } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import About from "./components/About";
import Service from "./components/Service";

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
  const { currentUser, isFirebaseLoaded } = useDataContext();
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
        <SafeAreaView />
        {isFirebaseLoaded ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            style={{}}
          >
            {currentUser ? (
              <Stack.Screen name="/" component={BottomTab} />
            ) : (
              <Stack.Screen name="signin" component={SignIn} />
            )}
          </Stack.Navigator>
        ) : (
          <VStack space={20} h={"100%"}>
            <Skeleton h="40" px="4" />
            <Skeleton.Text px="4" />
            <Skeleton.Text px="4" />
            <Skeleton.Text px="4" />
            <Skeleton.Text px="4" />
            <Skeleton px="4" startColor="primary.100" />
          </VStack>
        )}
      </>
    )
  );
}

function BottomTab() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator barStyle={{ backgroundColor: "#2563eb" }}>
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
      />
      <Tab.Screen
        options={{
          tabBarLabel: "PDF Viwer",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="settings-outline"
              size={20}
              color={focused ? "white" : "#cccccc"}
            />
          ),
        }}
        name="service"
        component={Service}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "About",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name="questioncircleo"
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
