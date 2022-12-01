import { Text, Center, VStack, Button, HStack, Skeleton } from "native-base";
import PDFReader from "rn-pdf-reader-js";
import { useDataContext } from "../contexts/DataContext";
import { useState } from "react";

const Service = ({ navigation }) => {
  const { currentPdf } = useDataContext();
  const [pdfLoad, setPdfLoad] = useState(false);

  console.log("base", currentPdf);
  return (
    <>
      <VStack
        h={"70%"}
        borderWidth={1}
        m={4}
        bg={"white"}
        borderRadius={"xl"}
        overflow={"hidden"}
      >
        {currentPdf && (
          <>
            <PDFReader
              source={{ uri: currentPdf }}
              onLoad={() => setPdfLoad(true)}
            />
            {!pdfLoad && (
              <Center h={"100%"} justifyContent={"space-around"}>
                <Skeleton.Text px="4" />
                <Skeleton.Text px="4" />
                <Skeleton.Text px="4" />
                <Skeleton.Text px="4" />
                <Skeleton.Text px="4" />
              </Center>
            )}
          </>
        )}
      </VStack>
      <Center h={"30%"}>
        <VStack>
          <Button
            colorScheme={"blueGray"}
            variant={"outline"}
            _text={{ fontSize: "lg" }}
            borderRadius={"full"}
            px={4}
            onPress={() => {
              navigation.goBack();
            }}
          >
            {"< Back"}
          </Button>
        </VStack>
      </Center>
    </>
  );
};

export default Service;
