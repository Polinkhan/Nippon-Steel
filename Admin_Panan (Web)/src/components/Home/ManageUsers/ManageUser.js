import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
  Input,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDataContext } from "../../../contexts/DataContext";
import { userDataKeys } from "../../../utlis/GlobalData";
import {
  IoRefresh,
  IoFilter,
  IoAttach,
  IoCloudUploadOutline,
} from "react-icons/io5";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import EditUserModal from "./EditUserModal";

const ManageUser = () => {
  const { userAllData, fetchUserAllData } = useDataContext();
  const [selectedUser, setSelectedUser] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const [modalStatus, setModalStatus] = useState({
    editModal: false,
    deleteModal: false,
  });

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
          Manage User, Update or delete user data
        </Text>
        <Button
          colorScheme={"facebook"}
          rightIcon={<IoRefresh />}
          onClick={() => fetchUserAllData()}
          fontSize={{ base: "sm", md: "md" }}
        >
          Refresh
        </Button>
      </HStack>
      <HStack w={"100%"}>
        <Input bg={"white"} placeholder={"Search ....."} />
        <HStack>
          <IconButton
            fontSize={"xl"}
            icon={<IoFilter />}
            bg={"white"}
            variant={"outline"}
          />
          <IconButton
            fontSize={"xl"}
            icon={<IoAttach />}
            bg={"white"}
            variant={"outline"}
          />
          <IconButton
            fontSize={"xl"}
            icon={<IoCloudUploadOutline />}
            bg={"white"}
            variant={"outline"}
          />
        </HStack>
      </HStack>
      <Box h={"100%"} w={"100%"} overflow={"auto"}>
        <VStack
          minW={"100%"}
          w={"fit-content"}
          divider={<StackDivider />}
          color={"gray.600"}
          flex={1}
          alignItems={"flex-start"}
        >
          <HStack
            p={2}
            justifyContent={"space-between"}
            fontSize={{ base: "sm", "2xl": "md" }}
            divider={<StackDivider />}
          >
            {userDataKeys.map((list, i) => (
              <Text textAlign={"center"} w={32} key={i} fontWeight={"bold"}>
                {list.itemName}
              </Text>
            ))}
            <Text textAlign={"center"} w={"80px"} fontWeight={"bold"}>
              Manage
            </Text>
          </HStack>
          {userAllData.length ? (
            userAllData.map((userData, i) => (
              <HStack
                key={i}
                fontSize={{ base: "sm", "2xl": "md" }}
                w={"100%"}
                justifyContent={"space-between"}
                p={2}
                cursor={"pointer"}
                divider={<StackDivider />}
                _hover={{ bg: "gray.300" }}
              >
                {userDataKeys.map((keylist, i) => (
                  <Text
                    textAlign={"center"}
                    w={32}
                    key={i + "a"}
                    whiteSpace={"nowrap"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                  >
                    {userData[keylist.itemName]}
                  </Text>
                ))}
                <HStack w={"80px"}>
                  <IconButton
                    size={"sm"}
                    fontSize={"md"}
                    // variant={"outline"}
                    // color={"blue.400"}
                    colorScheme={"blue"}
                    borderRadius={0}
                    icon={<FaRegEdit />}
                    onClick={() => {
                      setModalStatus((prev) => ({ ...prev, editModal: true }));
                      setUpdatedUser(userData);
                    }}
                  />
                  <IconButton
                    size={"sm"}
                    fontSize={"md"}
                    colorScheme={"red"}
                    borderRadius={0}
                    icon={<FaRegTrashAlt />}
                    onClick={() => {
                      setModalStatus((prev) => ({
                        ...prev,
                        deleteModal: true,
                      }));
                      setSelectedUser(userData);
                    }}
                  />
                </HStack>
              </HStack>
            ))
          ) : (
            <Center h={"20%"} fontSize={"2xl"}>
              No User Found !!
            </Center>
          )}
        </VStack>
      </Box>
      {selectedUser && (
        <>
          <ConfirmDeleteModal
            modalStatus={modalStatus}
            setModalStatus={setModalStatus}
            selectedUser={selectedUser}
          />
          <EditUserModal
            modalStatus={modalStatus}
            setModalStatus={setModalStatus}
            updatedUser={updatedUser}
            setUpdatedUser={setUpdatedUser}
          />
        </>
      )}
    </Flex>
  );
};

export default ManageUser;
