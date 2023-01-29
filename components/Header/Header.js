import { Center, HStack, Text, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../utils/StaticVariable";
import { ff } from "../../utils/StaticData";
import { useDataContext } from "../../contexts/DataContext";
// import { Button } from "react-native-paper";

const Header = ({ N1, N2, N3 }) => {
  const { singOut } = useDataContext();
  const { primaryColor } = theme;

  return (
    <>
      <VStack bg={primaryColor} px={4} py={2} shadow={"5"} space={2}>
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <Text fontSize={"md"} color={"gray.100"} {...ff}>
            {N1}
          </Text>
          {/* <Button color={"white"} onPress={singOut}>
            Log Out
          </Button> */}
        </HStack>
        <HStack alignItems={"center"} justifyContent={"flex-start"}>
          {/* <Ionicons name="person-circle-outline" size={32} color="white" /> */}
          <Text {...ff} color={"gray.100"} fontSize={"2xl"}>
            {N2}
          </Text>
        </HStack>
      </VStack>
      {N3 && (
        <Center bg={primaryColor} height={50}>
          <Text {...ff} color={"gray.100"} fontSize={"2xl"}>
            {N3}
          </Text>
        </Center>
      )}
    </>
  );
};

export default Header;
