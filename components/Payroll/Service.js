import {
  Center,
  VStack,
  Button,
  Skeleton,
  Link,
  HStack,
  Icon,
  Box,
  Text,
} from "native-base";
import PdfReader from "rn-pdf-reader-js-improved";
import { useDataContext } from "../../contexts/DataContext";
import { useState } from "react";
import { ff } from "../../utils/StaticData";
import { Linking } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import ProgressBar from "react-native-animated-progress";
import { theme } from "../../utils/StaticVariable";

const Service = ({ navigation }) => {
  const { currentPdf } = useDataContext();
  const [pdfLoad, setPdfLoad] = useState(false);
  const [loadingText, setLoadingText] = useState({ isLoad: false, text: "" });
  const [barProgress, setBarProgress] = useState(0);
  const { primaryColor } = theme;

  const handledownload = () => {
    setLoadingText({
      text: "Sending a secure api request ...",
      isLoad: true,
    });
    setBarProgress((prev) => prev + 30);

    setTimeout(() => {
      setLoadingText((prev) => ({
        ...prev,
        text: "Genarating an encrypted download link ...",
      }));
      setBarProgress((prev) => prev + 30);
    }, 2000);

    setTimeout(() => {
      setLoadingText((prev) => ({
        ...prev,
        text: "Redirecting to your browser ...",
      }));
      setBarProgress((prev) => prev + 40);
    }, 5500);

    setTimeout(() => {
      setLoadingText({ text: "", isLoad: false });
      Linking.openURL(currentPdf);
      setBarProgress((prev) => 0);
    }, 7000);
  };

  return (
    <>
      <HStack m={4}>
        <Button
          variant={"ghost"}
          borderRadius={"full"}
          _text={{ fontSize: "lg", ...ff, color: "gray.700" }}
          _pressed={{
            bg: "gray.300",
          }}
          onPress={() => {
            navigation.goBack();
          }}
          leftIcon={
            <Icon as={Ionicons} name={"arrow-back"} color={"gray.700"} />
          }
        >
          Back
        </Button>
      </HStack>
      <VStack
        flex={0.7}
        borderWidth={1}
        m={4}
        bg={"white"}
        borderRadius={"xl"}
        overflow={"hidden"}
      >
        {currentPdf && (
          <>
            <PdfReader
              source={{ uri: currentPdf }}
              onLoad={() => setPdfLoad(true)}
              customStyle={{
                readerContainer: { backgroundColor: "#ffffff" },
              }}
              // withPinchZoom={true}
              withScroll={true}
              // useGoogleReader={true}
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
      <Center flex={0.3}>
        <VStack w={"80%"} space={6} alignItems={"center"}>
          <Button
            w={"100%"}
            variant={"outline"}
            borderRadius={"full"}
            px={4}
            _text={{ fontSize: "lg", ...ff }}
            onPress={handledownload}
            isLoading={loadingText.isLoad}
            isLoadingText={loadingText.text}
            rightIcon={<Icon as={Feather} name={"download"} />}
          >
            Download
          </Button>
          <Box
            w={"100%"}
            // p={1}
            // borderWidth={1}
            // borderRadius={"full"}
            // borderColor={primaryColor}
          >
            {barProgress !== 0 && (
              <ProgressBar
                progress={barProgress}
                height={7}
                backgroundColor={primaryColor}
              />
            )}
          </Box>
        </VStack>
      </Center>
    </>
  );
};

export default Service;
