import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { useDataContext } from "../../contexts/DataContext";
import { ScrollView } from "react-native";
import { theme } from "../../utils/StaticVariable";
import { TouchableOpacity, Clipboard } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LogBox } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProfileContextProvider, {
  useProfileContext,
} from "../../contexts/ProfileContext";
LogBox.ignoreLogs(["Clipboard"]);
const Profile = ({ navigation }) => {
  return (
    <ProfileContextProvider>
      <App navigation={navigation} />
    </ProfileContextProvider>
  );
};

const App = ({ navigation }) => {
  const { currentUser } = useDataContext();
  const { primaryColor, primaryBackgroundColor, secondaryColor } = theme;
  const btnProps = { borderRadius: "full" };

  const handleCopy = (value) => {
    Clipboard.setString(value);
  };

  const { setShowModal } = useProfileContext();

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
          <Text fontSize={"2xl"} fontFamily={"boldExo"}>
            My Profile
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
        <HStack w={"100%"} justifyContent={"space-around"}>
          <VStack space={0}>
            <TouchableOpacity>
              <Avatar
                source={require("../../assets/images/avater.png")}
                size={"2xl"}
                bg={"white"}
                my={"auto"}
              />
            </TouchableOpacity>
            <Text fontFamily={"exo"} fontSize={"3xl"} textAlign={"center"}>
              {currentUser["Employee Name"]}
            </Text>
          </VStack>
        </HStack>
        <Divider />
      </VStack>
      <Box flex={1}>
        <ScrollView style={{ flex: 1 }}>
          <HStack w={"100%"}>
            <VStack space={2} w={"100%"}>
              {Object.keys(currentUser).map((label, i) => (
                <HStack key={i} bg={"#f2f2f2"} borderRadius={16} px={4} py={6}>
                  <HStack
                    flex={1}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Text fontFamily={"lightExo"} fontSize={"lg"}>
                      {label}
                    </Text>
                    <Text fontFamily={"exo"} fontSize={"lg"}>
                      {":\t\t"}
                    </Text>
                  </HStack>
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => handleCopy(currentUser[label])}
                  >
                    <HStack alignItems={"center"} flex={1} flexWrap={"wrap"}>
                      <Text w={"100%"} fontFamily={"lightExo"} fontSize={"lg"}>
                        {currentUser[label]}
                      </Text>
                    </HStack>
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
