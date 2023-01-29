import { Box, Divider, HStack, Icon, Image, Text, VStack } from "native-base";
import { useDataContext } from "../../contexts/DataContext";
import { theme } from "../../utils/StaticVariable";
import { SettingsList } from "../../utils/StaticData";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

const { primaryBackgroundColor, secondaryBackgroundColor } = theme;
const Settings = ({ navigation }) => {
  const { currentUser, setQueryParam, setCurrentUser } = useDataContext();
  return (
    <VStack h={"100%"} bg={primaryBackgroundColor} p={6} space={4}>
      <Text fontSize={"2xl"} fontFamily={"boldExo"}>
        Settings
      </Text>
      <Divider />
      <Image
        h={16}
        w={16}
        borderWidth={1}
        borderRadius={8}
        borderColor={"gray.100"}
        alt={"Profile Picture"}
        source={require("../../assets/images/avater.png")}
      />
      <VStack>
        <Text fontFamily={"exo"} fontSize={"lg"} color={"gray.500"}>
          {currentUser["Employee Name"]}
        </Text>
        <Text fontFamily={"boldExo"} fontSize={"lg"} color={"gray.500"}>
          {currentUser["Email"]}
        </Text>
      </VStack>
      <VStack>
        {SettingsList.map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              _.route && navigation.navigate(_.route, { ..._.param });
            }}
          >
            <HStack alignItems={"center"} p={2} space={4}>
              <Box bg={secondaryBackgroundColor} p={4} borderRadius={16}>
                <Icon size={"lg"} as={_.iconProvider} name={_.icon} />
              </Box>
              <Text fontFamily={"exo"} fontSize={"xl"}>
                {_.label}
              </Text>
            </HStack>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={async () => {
            await SecureStore.setItemAsync("accessToken", "_");
            setQueryParam({});
            setCurrentUser(null);
          }}
        >
          <HStack alignItems={"center"} p={2} space={4}>
            <Box bg={secondaryBackgroundColor} p={4} borderRadius={16}>
              <Icon size={"lg"} as={MaterialIcons} name={"logout"} />
            </Box>
            <Text fontFamily={"exo"} fontSize={"xl"}>
              Log Out
            </Text>
          </HStack>
        </TouchableOpacity>
      </VStack>
    </VStack>
  );
};

export default Settings;
