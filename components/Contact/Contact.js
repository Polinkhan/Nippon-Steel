import {
  Button,
  Center,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useState } from "react";
import { useDataContext } from "../../contexts/DataContext";
import Header from "../Header";
import { theme } from "../../utils/StaticVariable";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { ff } from "../../utils/StaticData";
import { ScrollView } from "react-native";
import { Linking } from "react-native";

const Contact = () => {
  const { currentUser, contactLists } = useDataContext();
  const { secondaryBackgroundColor } = theme;

  const IconButtonProps = {
    size: "lg",
    variant: "ghost",
    borderRadius: "full",
  };

  return (
    <VStack h={"100%"} bg={"white"}>
      <Header
        N1={"User : " + currentUser.name}
        N2={"Nippon Steel Engineering"}
        N3={"Contact List"}
      />
      <ScrollView style={{ flex: 1 }}>
        <VStack w={"100%"} space={6} p={6}>
          {Object.keys(contactLists).map((elem, i) => (
            <HStack
              key={i}
              bg={secondaryBackgroundColor}
              p={4}
              borderRadius={12}
            >
              <VStack w={"70%"} space={1}>
                <Text {...ff} fontSize={"xl"}>
                  {contactLists[elem].name}
                </Text>
                <Text {...ff} fontSize={"md"}>
                  {"Email : " + contactLists[elem].Email}
                </Text>
                <Text {...ff} fontSize={"md"}>
                  {contactLists[elem].Tel}
                </Text>
              </VStack>
              <HStack
                w={"30%"}
                alignItems={"center"}
                justifyContent={"space-around"}
              >
                <IconButton
                  {...IconButtonProps}
                  icon={
                    <Icon
                      size={"lg"}
                      as={Fontisto}
                      name="email"
                      // color="red.400"
                    />
                  }
                  onPress={() => {
                    Linking.openURL(`mailto:${contactLists[elem].Email}`);
                  }}
                />
                <IconButton
                  {...IconButtonProps}
                  icon={
                    <Icon
                      size={"lg"}
                      as={Ionicons}
                      name="call-outline"
                      // color="red.400"
                    />
                  }
                  onPress={() => {
                    Linking.openURL(`tel:${contactLists[elem].Tel}`);
                  }}
                />
              </HStack>
            </HStack>
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default Contact;
