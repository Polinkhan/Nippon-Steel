import { Button, Center, Text, VStack } from "native-base";

import { useDataContext } from "../contexts/DataContext";

const About = () => {
  const { singOut } = useDataContext();

  return (
    <VStack bg={"white"} h={"100%"} justifyContent={"space-around"}>
      <Text
        fontSize={"4xl"}
        fontFamily={"Nunito-SemiBold"}
        textAlign={"center"}
      >
        About
      </Text>
      <Center>
        <Button
          _text={{ fontSize: "2xl" }}
          bg={"red.500"}
          _pressed={{
            bg: "red.600",
          }}
          borderRadius={"full"}
          px={6}
          onPress={singOut}
        >
          Sign Out
        </Button>
      </Center>
    </VStack>
  );
};

export default About;
