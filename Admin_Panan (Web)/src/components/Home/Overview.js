import {
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { IoOpenOutline } from "react-icons/io5";
import { OverviewItems } from "../../utlis/GlobalData";

const Overview = () => {
  return (
    <Flex w={"100%"} flexDirection={"column"} gap={12}>
      <HStack>
        <Text fontSize={"3xl"}>Overview</Text>
      </HStack>
      <Wrap flex={1} justify={"space-around"}>
        {OverviewItems.map((item, i) => (
          <WrapItem key={i} w={"250px"}>
            <VStack
              p={6}
              w={"100%"}
              h="150px"
              boxShadow={"md"}
              borderRadius={"xl"}
              bg={"white"}
              alignItems={"flex-start"}
              justifyContent={"space-between"}
            >
              <HStack w={"100%"} justifyContent={"space-between"}>
                <Text fontWeight={"bold"} fontSize={"xl"}>
                  {item.itemName}
                </Text>
                <IconButton
                  variant={"outline"}
                  fontSize={"xl"}
                  icon={<IoOpenOutline />}
                />
              </HStack>
              <Text fontSize={"xl"}>{item.itemNumber}</Text>
              <Text color={"gray.500"}>{item.itemBottom}</Text>
            </VStack>
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  );
};

export default Overview;
