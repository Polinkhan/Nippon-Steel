import {
  Button,
  Center,
  Divider,
  HStack,
  Icon,
  IconButton,
  Input,
  Spinner,
  Text,
  TextArea,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { theme } from "../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const CheckUpdate = ({ navigation }) => {
  const { primaryColor, primaryBackgroundColor, secondaryColor } = theme;

  const [timeOver, setTimeOver] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimeOver(true);
    }, 4000);
  }, []);

  return (
    <VStack flex={1} bg={primaryBackgroundColor} p={4}>
      <VStack alignItems={"center"} space={6} pb={4}>
        <HStack
          w={"100%"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            size={"lg"}
            variant={"outline"}
            borderColor={"gray.300"}
            borderRadius={12}
            _pressed={{ backgroundColor: secondaryColor }}
            onPress={() => navigation.goBack()}
            icon={
              <Icon
                as={Ionicons}
                name={"ios-chevron-back-outline"}
                color={primaryColor}
              />
            }
          />
          <Text
            fontSize={"2xl"}
            fontFamily={"boldExo"}
            textTransform={"capitalize"}
          >
            Check for update
          </Text>
          <IconButton
            size={"lg"}
            // variant={"outline"}
            borderColor={"gray.300"}
            borderRadius={12}
            _pressed={{ backgroundColor: secondaryColor }}
            onPress={() => {}}
          />
        </HStack>
        <Divider />
      </VStack>
      <Center flex={0.8}>
        {timeOver ? (
          <VStack w={"100%"} alignItems={"center"} space={2}>
            <Text fontFamily={"exo"} fontSize={"xl"}>
              Your app is up to date.
            </Text>
            <Divider w={"40%"} />
            <Text fontFamily={"exo"} fontSize={"lg"} color={"gray.500"}>
              App Version - 2.4.2
            </Text>
          </VStack>
        ) : (
          <HStack space={2}>
            <Text fontFamily={"exo"} fontSize={"lg"}>
              Checking for updates...
            </Text>
            <Spinner color={"black"} />
          </HStack>
        )}
      </Center>
    </VStack>
  );
};

export default CheckUpdate;
