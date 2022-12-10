import { Box, Button, Center, Image, Text, VStack } from "native-base";

import { useDataContext } from "../contexts/DataContext";
import { imgLoaction, ff } from "../utils/StaticData";
import Header from "./Header";

const About = () => {
  const { currentUser } = useDataContext();
  const textProps = {
    ...ff,
    fontSize: "lg",
    textAlign: "center",
  };

  return (
    <VStack flex={1} bg={"white"}>
      <Header
        N1={"User : " + currentUser.name}
        N2={"Nippon Steel Engineering"}
        N3={"About"}
      />
      <Center flex={0.3} w={"100%"}>
        <Image
          w={"60%"}
          alt=""
          source={imgLoaction}
          style={{ resizeMode: "contain" }}
        />
      </Center>
      <VStack
        flex={0.5}
        p={12}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text {...textProps}>Nippon Steel Engineering Co. Ltd.</Text>
        <Text {...textProps}>
          Address:298 Tiong Bahru Road, #16-01, Central Plaza, Singapore 168730
        </Text>
        <Text {...textProps}>App Version : 1.0.2</Text>
        <Center>
          <Text>Design By</Text>
          <Text>MD Naeem Khan</Text>
        </Center>
        <Center>
          <Text>Developed By</Text>
          <Text>MD Naeem Khan</Text>
        </Center>
      </VStack>
    </VStack>
  );
};

export default About;
