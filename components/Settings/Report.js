import {
  Button,
  Center,
  Divider,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  TextArea,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { theme } from "../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const Report = ({ navigation }) => {
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
            Report A Problem
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
      <VStack space={6}>
        <VStack space={1}>
          <Text px={2} fontSize={"lg"} fontFamily={"exo"}>
            Summary
          </Text>
          <Input
            borderRadius={16}
            // value={pass.newPass}
            variant={"filled"}
            placeholder={"Summary"}
            _focus={{
              backgroundColor: "gray.100",
              borderColor: "gray.100",
            }}
            fontFamily={"exo"}
            fontSize={"lg"}
            py={4}
            // onChangeText={(text) =>
            //   setPass((prev) => ({ ...prev, newPass: text }))
            // }
          />
        </VStack>
        <VStack space={1}>
          <Text px={2} fontSize={"lg"} fontFamily={"exo"}>
            Details
          </Text>
          <TextArea
            h={200}
            borderRadius={16}
            // value={pass.repeatPass}
            variant={"filled"}
            placeholder={"Description"}
            _focus={{
              backgroundColor: "gray.100",
              borderColor: "gray.100",
            }}
            fontFamily={"exo"}
            fontSize={"lg"}
            py={4}
            // onChangeText={(text) =>
            //   setPass((prev) => ({ ...prev, repeatPass: text }))
            // }
          />
        </VStack>
        <VStack space={1}>
          <Text px={2} fontSize={"lg"} fontFamily={"exo"}>
            Attachment
          </Text>
          <TouchableOpacity>
            <Center
              borderStyle={"dashed"}
              borderColor={"#aaaaaa"}
              borderWidth={1}
              borderRadius={16}
              _pressed={{ bg: "gray.200" }}
            >
              <Text py={6} fontFamily={"exo"} fontSize={"lg"}>
                Drop files to attach
              </Text>
            </Center>
          </TouchableOpacity>
        </VStack>
        <Button
          background={primaryColor}
          _text={{ fontSize: "lg", fontFamily: "exo" }}
          py={4}
          my={6}
          borderRadius={16}
          onPress={() => {}}
        >
          Submit
        </Button>
      </VStack>
    </VStack>
  );
};

export default Report;
