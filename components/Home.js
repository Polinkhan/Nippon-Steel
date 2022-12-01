import {
  Button,
  Center,
  Divider,
  HStack,
  Spinner,
  Text,
  VStack,
} from "native-base";
import { useDataContext } from "../contexts/DataContext";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { UserInfoLabel, UserInfoDataKey } from "../utils/StaticData";

const buttonProps = {
  colorScheme: "blue",
  borderRadius: "full",
  px: 4,
  h: 12,
  _text: { fontFamily: "Nunito-SemiBold" },
};

const Home = ({ navigation }) => {
  const { currentUser } = useDataContext();
  return (
    <VStack h={"100%"} p={4} bg={"white"} justifyContent={"space-between"}>
      <HStack
        p={2}
        borderRadius={"sm"}
        borderWidth={1}
        borderColor={"gray.300"}
      >
        <VStack w={"45%"} space={1}>
          {UserInfoLabel.map((info, i) => (
            <Text key={i} fontFamily={"Nunito-SemiBold"} fontSize={"md"}>
              {info}
            </Text>
          ))}
        </VStack>
        <Divider orientation="vertical" />
        <VStack pl={4} w={"55%"} space={1}>
          {UserInfoDataKey.map((KEY, i) => (
            <Text key={i} fontFamily={"Nunito-SemiBold"} fontSize={"md"}>
              {currentUser[KEY] ? (
                currentUser[KEY]
              ) : (
                <Spinner color="indigo.500" />
              )}
            </Text>
          ))}
          <Text fontFamily={"Nunito-SemiBold"} fontSize={"md"}>
            {new Date().toDateString()}
          </Text>
        </VStack>
      </HStack>
      <Center
        h={"40%"}
        p={2}
        borderRadius={"sm"}
        borderWidth={1}
        borderColor={"gray.300"}
      ></Center>
      <VStack
        // alignItems={"center"}
        px={4}
        py={8}
        space={8}
        borderRadius={"sm"}
        borderWidth={1}
        borderColor={"gray.300"}
      >
        <Button {...buttonProps} onPress={() => navigation.navigate("findpdf")}>
          Find PDF
        </Button>
        <HStack justifyContent={"space-around"} w={"100%"}>
          <Button w={"45%"} {...buttonProps}>
            Information
          </Button>
          <Button w={"45%"} {...buttonProps}>
            Contact
          </Button>
        </HStack>
      </VStack>

      {/* <Tab.Navigator>
        <Tab.Screen name="checkTime" component={CheckTime} />
        <Tab.Screen name="checkpay" component={CheckPaySlip} />
        <Tab.Screen name="other" component={Other} />
      </Tab.Navigator> */}
    </VStack>
  );
};

export default Home;
