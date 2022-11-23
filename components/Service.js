import { Text, Center, VStack, Button, HStack, Skeleton } from "native-base";
import PDFReader from "rn-pdf-reader-js";
import { useDataContext } from "../contexts/DataContext";
import { useState } from "react";

const Service = () => {
  const { pdfList } = useDataContext();
  const [currentPdf, setCurrentPdf] = useState(null);
  const [pdfLoad, setPdfLoad] = useState(false);
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
        {currentPdf !== null ? (
          <>
            <PDFReader
              source={{ uri: pdfList[currentPdf] }}
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
        ) : (
          <Center h={"100%"}>
            <Text
              fontSize={"2xl"}
              textAlign={"center"}
              fontFamily={"Nunito-SemiBold"}
            >
              {pdfList.length
                ? `Found ${pdfList.length} PDF upon your query\nClick to Show`
                : "No PDF has loaded !!"}
            </Text>
          </Center>
        )}
      </VStack>
      <Center h={"30%"}>
        <HStack space={4}>
          {pdfList.map((pdf, i) => (
            <Button
              size={"lg"}
              _text={{
                fontSize: "xl",
                color: currentPdf === i ? "gray.200" : "gray.700",

                fontFamily: "Nunito-SemiBold",
              }}
              _pressed={{
                bg: currentPdf === i ? "blue.300" : "gray.400",
              }}
              rounded={"full"}
              px={6}
              key={i}
              bg={currentPdf === i ? "blue.500" : "gray.300"}
              onPress={() => {
                setCurrentPdf(i);
                setPdfLoad(false);
              }}
            >
              {"PDF " + (i + 1)}
            </Button>
          ))}
        </HStack>
      </Center>
    </>
  );
};

export default Service;
