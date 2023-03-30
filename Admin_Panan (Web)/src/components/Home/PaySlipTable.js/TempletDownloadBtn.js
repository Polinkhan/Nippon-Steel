import { Center } from "@chakra-ui/react";
import React from "react";
import { CSVLink } from "react-csv";
import { headers } from "../../../utlis/GlobalData";

const TempletDownloadBtn = () => {
  return (
    <Center
      border={"1px"}
      borderRadius={"md"}
      borderColor={"gray.400"}
      bg={"gray.100"}
      _hover={{ bg: "gray.300" }}
    >
      <CSVLink
        style={{
          borderRadius: 6,
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 7,
          paddingBottom: 7,
          fontWeight: "bold",
        }}
        data={[]}
        headers={headers}
        filename={"Template " + new Date().toDateString()}
      >
        Download Template.csv
      </CSVLink>
    </Center>
  );
};

export default TempletDownloadBtn;
