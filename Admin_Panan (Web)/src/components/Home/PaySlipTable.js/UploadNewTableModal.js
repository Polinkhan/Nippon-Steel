import {
  Center,
  FormLabel,
  Input,
  Text,
  VStack,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { csv2json } from "../../../utlis/Helper_func";
import TempletDownloadBtn from "./TempletDownloadBtn";

const UploadNewTableModal = () => {
  const handleChange = (e) => {
    const files = e.target.files;
    console.log(files);
    if (files) {
      csv2json(files[0], ({ label, data }) => {
        console.log(label, data);
      });
    }
  };

  return (
    <>
      <ModalHeader>Import Table</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <VStack gap={10}>
          <Text w={"100%"} textAlign={"left"} color={"red.500"}>
            This will delete every data from existing table and will create a
            new table !!
          </Text>
          <Text>Note : These feature is under Maintenance</Text>
          <Input
            id="file"
            type="file"
            accept=".csv"
            onChange={handleChange}
            variant={"flushed"}
          />
        </VStack>
      </ModalBody>
      <ModalFooter>
        <HStack gap={2}>
          <TempletDownloadBtn />
          <Button colorScheme={"blue"} disabled onClick={() => {}}>
            Confirm Upload
          </Button>
        </HStack>
      </ModalFooter>
    </>
  );
};

export default UploadNewTableModal;
