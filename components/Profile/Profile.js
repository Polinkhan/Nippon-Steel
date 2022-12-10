import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { useDataContext } from "../../contexts/DataContext";
import Header from "../Header";
import { ff, UserInfoLabel, UserInfoKey } from "../../utils/StaticData";
import { ScrollView } from "react-native";
import { theme } from "../../utils/StaticVariable";
import { TouchableOpacity, Clipboard } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Clipboard"]);

const Profile = () => {
  const { currentUser } = useDataContext();
  const { primaryBackgroundColor, secondaryBackgroundColor } = theme;
  const btnProps = { borderRadius: "full" };

  const handleCopy = (value) => {
    Clipboard.setString(value);
  };

  return (
    <VStack flex={1} bg={secondaryBackgroundColor}>
      <Header
        N1={"User : " + currentUser.name}
        N2={"Nippon Steel Engineering"}
        N3={"User Profile"}
      />
      <VStack p={6} alignItems={"center"}>
        <HStack w={"100%"} justifyContent={"space-around"}>
          <VStack>
            <TouchableOpacity>
              <Avatar
                source={require("../../assets/images/avater.png")}
                size={"2xl"}
                bg={"white"}
              />
            </TouchableOpacity>
            <Text {...ff} fontSize={"2xl"}>
              {currentUser.name}
            </Text>
          </VStack>
          <VStack justifyContent={"space-around"} py={6}>
            <Button {...btnProps}>Change Profile Picture</Button>
            <Button {...btnProps} variant={"outline"}>
              Change Password
            </Button>
          </VStack>
        </HStack>
      </VStack>
      <Box flex={1} m={3} bg={primaryBackgroundColor} borderRadius={"lg"}>
        <ScrollView style={{ flex: 1, margin: 8 }}>
          <HStack w={"100%"} p={2}>
            <VStack space={4} w={"100%"}>
              {UserInfoLabel.map((label, i) => (
                <HStack key={i} h={6}>
                  <HStack
                    w={"45%"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Text {...ff} fontSize={"lg"}>
                      {label}
                    </Text>
                    <Text {...ff} fontSize={"lg"}>
                      {":\t\t"}
                    </Text>
                  </HStack>
                  <HStack w={"45%"} alignItems={"center"}>
                    <Text {...ff} fontSize={"lg"}>
                      {currentUser[UserInfoKey[i]]}
                    </Text>
                  </HStack>
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => handleCopy(currentUser[UserInfoKey[i]])}
                  >
                    <Center flex={1}>
                      <Icon
                        as={Feather}
                        size={"md"}
                        name="copy"
                        color="gray.400"
                      />
                    </Center>
                  </TouchableOpacity>
                </HStack>
              ))}
            </VStack>
          </HStack>
        </ScrollView>
      </Box>
    </VStack>
  );
};

export default Profile;
