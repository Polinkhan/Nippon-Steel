import { useFonts } from "expo-font";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { NativeBaseProvider, Box, StatusBar } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import Profile from "./components/Profile/Profile";
import SignIn from "./components/Auth/SignIn";
import Home from "./components/Home/Home";
import Payroll from "./components/Payroll/Payroll";
import Contact from "./components/Contact/Contact";
import View from "./components/Payroll/View";
import Settings from "./components/Settings/Settings";
import DataContextProvider, { useDataContext } from "./contexts/DataContext";
import { theme } from "./utils/StaticVariable";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Constants from "expo-constants";
import ChangePassword from "./components/Settings/ChangePassword";
import ChangeProfilePicture from "./components/Settings/ChangeProfilePicture";
import Report from "./components/Settings/Report";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <DataContextProvider>
          <MyStack />
        </DataContextProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

function MyStack() {
  const { currentUser } = useDataContext();
  const { primaryColor, primaryOpacityColor } = theme;
  const Stack = createNativeStackNavigator();

  const [fontsLoaded] = useFonts({
    exo: require("./assets/fonts/static/Exo2-Regular.ttf"),
    boldExo: require("./assets/fonts/static/Exo2-Bold.ttf"),
    lightExo: require("./assets/fonts/static/Exo2-Light.ttf"),
  });

  return (
    fontsLoaded && (
      <>
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        >
          {currentUser ? (
            <>
              <Stack.Screen name="/" component={BottomTab} />
              <Stack.Screen name="view" component={View} />
              <Stack.Screen name="profile" component={Profile} />
              <Stack.Screen name="password" component={ChangePassword} />
              <Stack.Screen name="report" component={Report} />
              <Stack.Screen
                name="profilePicture"
                component={ChangeProfilePicture}
              />
            </>
          ) : (
            <Stack.Screen name="signin" component={SignIn} />
          )}
        </Stack.Navigator>
      </>
    )
  );
}

const BottomTab = () => {
  const Tab = createMaterialBottomTabNavigator();
  const { primaryColor } = theme;

  const tabs = [
    {
      route: "home",
      label: "Home",
      iconProvider: Ionicons,
      iconName: "home-outline",
      component: Home,
    },
    {
      route: "payroll",
      label: "Payslip",
      iconProvider: Ionicons,
      iconName: "document-text-outline",
      component: Payroll,
    },
    {
      route: "contact",
      label: "Contact",
      iconProvider: AntDesign,
      iconName: "contacts",
      component: Contact,
    },
    {
      route: "setting",
      label: "Settings",
      iconProvider: AntDesign,
      iconName: "setting",
      component: Settings,
    },
  ];

  return (
    <Tab.Navigator
      activeColor={primaryColor}
      sceneAnimationEnabled={true}
      barStyle={{ backgroundColor: "white" }}
    >
      {tabs.map((_, i) => (
        <Tab.Screen
          key={i}
          name={_.route}
          component={_.component}
          options={{
            activeTintColor: primaryColor,
            tabBarLabel: _.label,
            tabBarIcon: ({ focused, color }) => (
              <_.iconProvider name={_.iconName} size={20} color={color} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};
