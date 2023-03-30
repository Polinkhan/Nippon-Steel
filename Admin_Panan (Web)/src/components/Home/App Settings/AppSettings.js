import {
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useDataContext } from "../../../contexts/DataContext";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { api } from "../../../utlis/GlobalData";

const AppSettings = () => {
  const { appSettingsData, makeToast, fetchAppSettingsData, currentUser } =
    useDataContext();
  const {
    type_result = [],
    year_result = [],
    contact_result = [],
  } = appSettingsData;

  console.log(appSettingsData.MaintenanceMode);

  return (
    <Flex
      h={"100%"}
      w={"100%"}
      flexDirection={"column"}
      gap={12}
      overflow={"auto"}
    >
      <HStack justifyContent={"space-between"} minW={"fit-content"}>
        <Text flex={0.8} fontSize={{ base: "lg", md: "2xl" }}>
          Manage App Settings {"(Incomplete)"}
        </Text>
      </HStack>
      <HStack
        flex={0.8}
        divider={<StackDivider />}
        my={"auto"}
        flexDirection={{ base: "column", md: "row" }}
        gap={{ base: 6, md: 0 }}
      >
        {/* TYPE */}
        <VStack w={"100%"} h={"100%"} flex={1} divider={<StackDivider />}>
          <Text fontSize={"2xl"}>Type</Text>
          <VStack
            h={"80%"}
            minW={"100%"}
            w={"fit-content"}
            divider={<StackDivider />}
            color={"gray.600"}
          >
            <HStack
              w={"100%"}
              fontSize={{ base: "sm", "2xl": "md" }}
              divider={<StackDivider />}
              py={2}
            >
              <Text fontWeight={"bold"} flex={1} textAlign={"center"}>
                id
              </Text>
              <Text flex={1} textAlign={"center"} fontWeight={"bold"}>
                Type
              </Text>

              <Text flex={1} textAlign={"center"} fontWeight={"bold"}>
                Manage
              </Text>
            </HStack>
            {type_result.map((res, i) => (
              <HStack
                key={`a${i}`}
                w={"100%"}
                fontSize={{ base: "sm", "2xl": "md" }}
                divider={<StackDivider />}
              >
                <Text flex={1} textAlign={"center"} fontWeight={"bold"}>
                  {res.id}
                </Text>
                <Text flex={1} textAlign={"center"} fontWeight={"bold"}>
                  {res.Type}
                </Text>
                <HStack flex={1} justifyContent={"center"}>
                  <IconButton
                    size={"sm"}
                    fontSize={"md"}
                    colorScheme={"blue"}
                    borderRadius={0}
                    icon={<FaRegEdit />}
                    onClick={() => {}}
                  />
                  <IconButton
                    size={"sm"}
                    fontSize={"md"}
                    colorScheme={"red"}
                    borderRadius={0}
                    icon={<FaRegTrashAlt />}
                    onClick={() => {}}
                  />
                </HStack>
              </HStack>
            ))}
          </VStack>
          <Button colorScheme={"blue"}>Add New Type</Button>
        </VStack>
        {/* YEAR */}
        <VStack w={"100%"} h={"100%"} flex={1} divider={<StackDivider />}>
          <Text fontSize={"2xl"}>Year</Text>
          <VStack
            minW={"100%"}
            w={"fit-content"}
            divider={<StackDivider />}
            color={"gray.600"}
            h={"80%"}
          >
            <HStack
              p={2}
              w={"100%"}
              fontSize={{ base: "sm", "2xl": "md" }}
              divider={<StackDivider />}
            >
              <Text flex={1} textAlign={"center"} fontWeight={"bold"}>
                id
              </Text>
              <Text flex={1} textAlign={"center"} fontWeight={"bold"}>
                Year
              </Text>

              <Text flex={1} textAlign={"center"} fontWeight={"bold"}>
                Manage
              </Text>
            </HStack>
            {year_result.map((res, i) => (
              <HStack
                key={`a${i}`}
                w={"100%"}
                fontSize={{ base: "sm", "2xl": "md" }}
                divider={<StackDivider />}
              >
                <Text flex={1} textAlign={"center"} fontWeight={"bold"}>
                  {res.id}
                </Text>
                <Text flex={1} textAlign={"center"} fontWeight={"bold"}>
                  {res.Year}
                </Text>
                <HStack flex={1} justifyContent={"center"}>
                  <IconButton
                    size={"sm"}
                    fontSize={"md"}
                    colorScheme={"blue"}
                    borderRadius={0}
                    icon={<FaRegEdit />}
                    onClick={() => {}}
                  />
                  <IconButton
                    size={"sm"}
                    fontSize={"md"}
                    colorScheme={"red"}
                    borderRadius={0}
                    icon={<FaRegTrashAlt />}
                    onClick={() => {}}
                  />
                </HStack>
              </HStack>
            ))}
          </VStack>
          <Button colorScheme={"blue"}>Add New Year</Button>
        </VStack>
        {/* Contact */}
        <VStack w={"100%"} h={"100%"} flex={1} divider={<StackDivider />}>
          <Text fontSize={"2xl"}>Contact List</Text>
          <VStack
            minW={"100%"}
            w={"fit-content"}
            divider={<StackDivider />}
            color={"gray.600"}
            h={"80%"}
          >
            <HStack
              p={2}
              w={"100%"}
              fontSize={{ base: "sm", "2xl": "md" }}
              divider={<StackDivider />}
            >
              <Text flex={1} textAlign={"center"} fontWeight={"bold"}>
                Name
              </Text>
              <Text flex={1} textAlign={"center"} fontWeight={"bold"}>
                Email
              </Text>
              <Text flex={1} textAlign={"center"} fontWeight={"bold"}>
                Tel
              </Text>
              <Text flex={1} textAlign={"center"} fontWeight={"bold"}>
                Manage
              </Text>
            </HStack>
            {contact_result.map((res, i) => (
              <HStack
                key={`a${i}`}
                w={"100%"}
                fontSize={{ base: "sm", "2xl": "md" }}
                divider={<StackDivider />}
              >
                <Text flex={1} textAlign={"center"} fontWeight={"bold"}>
                  {res.Name}
                </Text>
                <Text flex={1} textAlign={"center"} fontWeight={"bold"}>
                  {res.Email}
                </Text>
                <Text flex={1} textAlign={"center"} fontWeight={"bold"}>
                  {res.Tel}
                </Text>
                <HStack flex={1} justifyContent={"center"}>
                  <IconButton
                    size={"sm"}
                    fontSize={"md"}
                    colorScheme={"blue"}
                    borderRadius={0}
                    icon={<FaRegEdit />}
                    onClick={() => {}}
                  />
                  <IconButton
                    size={"sm"}
                    fontSize={"md"}
                    colorScheme={"red"}
                    borderRadius={0}
                    icon={<FaRegTrashAlt />}
                    onClick={() => {}}
                  />
                </HStack>
              </HStack>
            ))}
          </VStack>
          <Button colorScheme={"blue"}>Add New Contact</Button>
        </VStack>
        {/* App Maintenance */}
        {appSettingsData.MaintenanceMode && (
          <VStack w={"100%"} h={"100%"} flex={1} divider={<StackDivider />}>
            <Text fontSize={"2xl"}>App Maintenance</Text>
            <VStack
              justifyContent={"center"}
              w={"fit-content"}
              divider={<StackDivider />}
              color={"gray.600"}
              h={"80%"}
            >
              <Text>
                {appSettingsData.MaintenanceMode === "False"
                  ? "Maintenance Mode is OFF"
                  : "Maintenance Mode is ON"}
              </Text>
              <Button
                disabled={currentUser.AccountType === "Member" ? true : false}
                colorScheme={
                  appSettingsData.MaintenanceMode === "False" ? "blue" : "red"
                }
                onClick={() => {
                  axios
                    .post(`${api}/db/appMaintenanceMode`, {
                      currentMode: appSettingsData.MaintenanceMode,
                    })
                    .then((res) => {
                      fetchAppSettingsData();
                    })
                    .catch((err) => {
                      const msg =
                        err.response.data.error.message || err.message;
                      makeToast("error", msg);
                    })
                    .finally(() => {});
                }}
              >
                {appSettingsData.MaintenanceMode === "False"
                  ? "Turn ON Maintenance Mode"
                  : "Turn OFF Maintenance Mode"}
              </Button>
            </VStack>
            <Button></Button>
          </VStack>
        )}
      </HStack>
    </Flex>
  );
};

export default AppSettings;
