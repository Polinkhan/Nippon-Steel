import {
  Text,
  VStack,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  Divider,
} from "@chakra-ui/react";
import React, { useState } from "react";
import TempletDownloadBtn from "./TempletDownloadBtn";

const Docs = () => {
  return (
    <>
      <ModalHeader>Documentation - Payslip Table</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <VStack h={500} overflow={"auto"}>
          <VStack w={"100%"} alignItems={"flex-start"}>
            <Text fontWeight={"bold"} fontSize={"lg"}>
              Search Bar
            </Text>
            <Divider />
            <Text>Search executed by (ID / Term / Name) value, ex.</Text>
            <Text>[ B015 ] = return all data for MD Rouf</Text>
            <Text>
              [ Jan ] = return every data contain Start January Month Or End
              January Month
            </Text>
            <Text>
              [ Jan 22 ] = return every data contain Start January month 2022 Or
              End January Month 2022
            </Text>
            <Text>
              [ Jan 22 - ] = return data that contain only Start January month
              2022
            </Text>
            <Text>
              [ - Jan 22 ] = return data that contain only End January month
              2022
            </Text>
          </VStack>
          <VStack w={"100%"} alignItems={"flex-start"}>
            <Text fontWeight={"bold"} fontSize={"lg"}>
              PDF Viewer
            </Text>
            <Divider />
            <Text>Click any of the row to genarate PDF</Text>
          </VStack>
          <VStack w={"100%"} alignItems={"flex-start"}>
            <Text fontWeight={"bold"} fontSize={"lg"}>
              Export
            </Text>
            <Divider />
            <Text>
              If Search Box is empty it will download the full dataset
            </Text>
            <Text>
              If Search Box is not empty it will download the query result
              dataset
            </Text>
          </VStack>
          <VStack w={"100%"} alignItems={"flex-start"}>
            <Text fontWeight={"bold"} fontSize={"lg"}>
              Import
            </Text>
            <Divider />
            <Text>
              If you choose this option it will delete the whole dataset first
              then create a new dataset with your given dataset. A .csv file is
              required
            </Text>
          </VStack>
          <VStack w={"100%"} alignItems={"flex-start"}>
            <Text fontWeight={"bold"} fontSize={"lg"}>
              Update
            </Text>
            <Divider />
            <Text>
              Here you have to provide a .csv file. The values from this file
              will compare with existing SQL dataset and will update the
              chnages. The ID and Term are the key here
            </Text>
          </VStack>
          <VStack w={"100%"} alignItems={"flex-start"}>
            <Text fontWeight={"bold"} fontSize={"lg"}>
              Add
            </Text>
            <Divider />
            <Text>
              Here also you have to provide a .csv file. The values from this
              file will simply added into SQL dataset.
            </Text>
          </VStack>
        </VStack>
      </ModalBody>
      <ModalFooter>
        <HStack></HStack>
      </ModalFooter>
    </>
  );
};

export default Docs;
