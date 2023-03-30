import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useDataContext } from "../../../contexts/DataContext";
import { api, userDataKeys } from "../../../utlis/GlobalData";
const RegisterUser = () => {
  const userDataKeys_ = userDataKeys.filter(({ itemName }) =>
    itemName === "Password" || itemName === "UserID" ? "" : itemName
  );
  const inputInitialData = {
    UserID: "",
    Password: "",
    "Employee Name": "",
    Email: "",
    "Date Of Birth": "",
    Company: "",
    "Job Title": "",
    "Joining Date": "",
    Mobile: "",
    Nationality: "",
    Type: "",
    PrimaryBankAcc: "",
    SecondaryBankAcc: "",
  };

  const [user, setUser] = useState(inputInitialData);
  const { fetchUserAllData, makeToast, currentUser } = useDataContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${api}/db/createUser`, { user })
      .then((res) => {
        makeToast("success", res.data.msg.message);
        fetchUserAllData();
      })
      .catch((err) => {
        const msg = err.response.data.error.message || err.message;
        makeToast("error", msg);
      });
  };

  return (
    <Flex w={"100%"} flexDirection={"column"} gap={6}>
      <HStack>
        <Text fontSize={"2xl"}>Register User, Create a new user</Text>
      </HStack>
      <Container h={"100%"} maxW={"4xl"}>
        <VStack as={"form"} gap={4} onSubmit={handleSubmit}>
          <Text fontSize={"2xl"}>User Authentication</Text>
          <Wrap flex={1} justify={"center"}>
            <WrapItem p={2} w={"300px"}>
              <FormControl>
                <FormLabel px={1} fontSize={"sm"} color={"gray.500"}>
                  UserID
                </FormLabel>
                <Input
                  bg={"white"}
                  required
                  value={user.UserID}
                  onChange={(e) => {
                    setUser((prev) => ({
                      ...prev,
                      UserID: e.target.value,
                    }));
                  }}
                />
              </FormControl>
            </WrapItem>
            <WrapItem p={2} w={"300px"}>
              <FormControl>
                <FormLabel px={1} fontSize={"sm"} color={"gray.500"}>
                  Password
                </FormLabel>
                <Input
                  bg={"white"}
                  required
                  value={user.Password}
                  onChange={(e) => {
                    setUser((prev) => ({
                      ...prev,
                      Password: e.target.value,
                    }));
                  }}
                />
              </FormControl>
            </WrapItem>
          </Wrap>
          <Text fontSize={"2xl"}>User Information</Text>
          <Wrap flex={1} justify={"center"}>
            {userDataKeys_.map((list, i) => (
              <WrapItem key={i} p={2} w={"250px"}>
                <FormControl>
                  <FormLabel px={1} fontSize={"sm"} color={"gray.500"}>
                    {list.itemName}
                  </FormLabel>
                  <Input
                    bg={"white"}
                    type={list.type}
                    required
                    value={user[list.itemName]}
                    onChange={(e) => {
                      setUser((prev) => ({
                        ...prev,
                        [list.itemName]: e.target.value,
                      }));
                    }}
                  />
                </FormControl>
              </WrapItem>
            ))}
          </Wrap>
          <Button
            colorScheme={"linkedin"}
            type="submit"
            disabled={currentUser.AccountType === "Member" ? true : false}
          >
            Submit
          </Button>
        </VStack>
      </Container>
    </Flex>
  );
};

export default RegisterUser;
