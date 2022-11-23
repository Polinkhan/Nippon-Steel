import { Text, VStack } from "native-base";
import { useDataContext } from "../contexts/DataContext";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CheckTime from "./Tabs/CheckTime";
import CheckPaySlip from "./Tabs/CheckPaySlip";
import Other from "./Tabs/Other";

const Home = ({ navigation }) => {
  const { currentUser } = useDataContext();
  const Tab = createMaterialTopTabNavigator();
  return (
    <VStack h={"100%"} bg={"white"}>
      <VStack
        w={"60%"}
        alignSelf={"flex-end"}
        justifyContent={"center"}
        p={4}
        m={4}
        mt={8}
        bg={"gray.100"}
        borderRadius={"xl"}
        shadow={"2"}
        space={2}
      >
        <Text fontFamily={"Nunito-SemiBold"} fontSize={"2xl"}>
          Welcome : {currentUser.name}
        </Text>
        <Text fontFamily={"Nunito-SemiBold"} fontSize={"xl"}>
          Email : {currentUser.email}
        </Text>
        <Text fontFamily={"Nunito-SemiBold"} fontSize={"lg"}>
          ID : {currentUser.id}
        </Text>
        <Text fontFamily={"Nunito-SemiBold"} fontSize={"lg"}>
          Date : {new Date().toLocaleDateString()}
        </Text>
      </VStack>
      <Tab.Navigator>
        <Tab.Screen name="checkTime" component={CheckTime} />
        <Tab.Screen name="checkpay" component={CheckPaySlip} />
        <Tab.Screen name="other" component={Other} />
      </Tab.Navigator>
    </VStack>
  );
};

export default Home;
