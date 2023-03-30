import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();


  return (
      <VStack
        h={"100vh"}
        bg={
          "linear-gradient(180deg, rgba(62,10,169,1) 0%, rgba(179,111,234,1) 100%)"
        }
        style={{ fontFamily: "Julius Sans One, sans-serif" }}
      >
        <Container
          h={"100%"}
          maxW={{ base: "100%", lg: "1000px", xl: "1280px" }}
          color={"white"}
        >
          {/* Nav Items */}
          <HStack h={"10%"} py={4} justifyContent={"space-between"}>
            <Box>
              <Text
                cursor={"pointer"}
                fontSize={{ base: "md", md: "2xl", xl: "3xl" }}
              >
                Nippon Steel Engineering
              </Text>
            </Box>
          </HStack>
          <Center h={"80%"}>
            <VStack
              justifyContent={"space-around"}
              alignItems={"flex-start"}
              alignSelf={"center"}
              // bg={"red.200"}
              h={"50vh"}
            >
              <Text
                w={{ base: "90%", lg: "70%" }}
                fontSize={{ base: "2xl", md: "5xl", xl: "6xl" }}
                style={{ fontFamily: "Prompt, sans-serif" }}
              >
                Nippon Steel Engineering Admin DashBoard
              </Text>
              <Text>
                ontrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock
              </Text>
              <HStack w={"100%"} justifyContent={"center"} gap={12}>
                <Button
                  py={3}
                  px={4}
                  size={"lg"}
                  fontWeight={"bold"}
                  borderRadius={"lg"}
                  // bg={"#624bff"}
                  // _hover={{ bg: "#7360ff" }}
                  colorScheme={"blackAlpha"}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Sign in
                </Button>
                <Button
                  py={3}
                  px={4}
                  size={"lg"}
                  fontWeight={"bold"}
                  borderRadius={"lg"}
                  // bg={"#624bff"}
                  // _hover={{ bg: "#7360ff" }}
                  colorScheme={"blackAlpha"}
                  // onClick={() => {
                  //   navigate("login");
                  // }}
                  variant={"outline"}
                >
                  Contact Us
                </Button>
              </HStack>
            </VStack>
          </Center>
        </Container>
      </VStack>
  );
};

export default LandingPage;
