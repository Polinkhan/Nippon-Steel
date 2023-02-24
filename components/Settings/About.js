import {
  Center,
  Divider,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { theme } from "../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const About = ({ navigation }) => {
  const { primaryColor, primaryBackgroundColor, secondaryColor } = theme;

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
            About App
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
      <VStack flex={1} justifyContent={"space-between"}>
        <Text></Text>
        <Center>
          <Text fontFamily={"exo"} fontSize={"xl"}>
            Nippon Steel Engineering
          </Text>
          <Text fontFamily={"exo"} fontSize={"xl"}>
            Version - 2.4.2
          </Text>
        </Center>

        <Center>
          <Text fontFamily={"exo"} fontSize={"sm"} color={"gray.400"}>
            © Nippon Steel App | by Naeem Khan
          </Text>
        </Center>
      </VStack>
    </VStack>
  );
};

export default About;
