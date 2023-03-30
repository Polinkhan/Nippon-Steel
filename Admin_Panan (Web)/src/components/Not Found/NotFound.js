import { Center, Icon, Text} from "@chakra-ui/react";
import React from "react";

import { IoAlert } from "react-icons/io5";

const NotFound = () => {
  return (
    <Center
      h={"50%"}
      justifyContent={"center"}
      color={"red.400"}
      fontSize={{ base: "2xl", md: "6xl" }}
    >
      <Icon as={IoAlert} />
      <Text>404. Page Not Found</Text>
    </Center>
  );
};

export default NotFound;
