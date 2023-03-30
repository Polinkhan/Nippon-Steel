import {
  Button,
  Center,
  Flex,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useDataContext } from "../../contexts/DataContext";
import loginImg from "../../images/login.jpg";
import { api } from "../../utlis/GlobalData";

const Login = () => {
  const [btnLoad, setBtnLoad] = useState(false);
  const [authData, setAuthData] = useState({
    Username: "",
    password: "",
  });
  const { makeToast, setCurrentUser } = useDataContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnLoad(true);

    axios
      .post(`${api}/auth/login`, authData)
      .then((res) => {
        setCurrentUser(res.data.user);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
      })
      .catch((err) => {
        const msg = err.response.data.error.message || err.message;
        makeToast("error", msg);
      })
      .finally(() => {
        setBtnLoad(false);
      });
  };

  return (
    <Center
      h={"100vh"}
      bg={
        "linear-gradient(180deg, rgba(62,10,169,1) 0%, rgba(179,111,234,1) 100%)"
      }
    >
      <Flex
        h={"600px"}
        w={{ base: "100%", md: "800px" }}
        borderRadius={"md"}
        overflow={"hidden"}
        boxShadow={"2xl"}
        p={2}
      >
        <Image src={loginImg} flex={1} display={{ base: "none", md: "flex" }} />
        <VStack h={"100%"} py={8} w={"100%"} bg={"white"}>
          <Text fontSize={"2xl"}>Nippon Steel Engineering </Text>
          <Text fontSize={"4xl"}>Admin Login</Text>
          <VStack
            p={8}
            as="form"
            fontSize={"lg"}
            h={"100%"}
            justifyContent={"space-around"}
            onSubmit={handleSubmit}
          >
            <VStack gap={10}>
              <Input
                h={12}
                bg={"gray.100"}
                placeholder="Username"
                borderRadius={"full"}
                textAlign={"center"}
                value={authData.Username}
                autoFocus
                onChange={(e) => {
                  setAuthData((prev) => ({
                    ...prev,
                    Username: e.target.value,
                  }));
                }}
              />
              <Input
                h={12}
                bg={"gray.100"}
                borderRadius={"full"}
                placeholder="Password"
                textAlign={"center"}
                value={authData.password}
                onChange={(e) => {
                  setAuthData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
              />
            </VStack>
            <Button
              px={6}
              py={3}
              borderRadius={"full"}
              color={"white"}
              _hover={{ bg: "#7360ff" }}
              bg={"#624bff"}
              type={"submit"}
              isLoading={btnLoad}
              loadingText={"Signing in..."}
            >
              Sign in
            </Button>
          </VStack>
        </VStack>
      </Flex>
    </Center>
  );
};

export default Login;
