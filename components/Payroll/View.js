import {
  VStack,
  Button,
  HStack,
  Box,
  IconButton,
  Icon,
  Center,
  Text,
} from "native-base";
import { useEffect, useState } from "react";
import { shareAsync } from "expo-sharing";
import { theme } from "../../utils/Colors";
import * as Print from "expo-print";
import PDFReader from "rn-pdf-reader-js";
import * as FileSystem from "expo-file-system";
import * as Progress from "react-native-progress";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";

const View = ({ navigation, route }) => {
  const { primaryColor, secondaryColor, pressedColor } = theme;
  const [downloadBtnLoad, setDownloadBtnLoad] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadUri, setDownloadUri] = useState(null);
  const { url, name } = route.params;

  useEffect(() => {
    (async () => {
      const { uri } = await FileSystem.downloadAsync(
        url.fileUrl,
        FileSystem.documentDirectory + "Share_Document.pdf"
      );
      setDownloadUri(uri);
    })();
  }, []);

  const print = async () => {
    await Print.printAsync({
      html,
      orientation: "landscape",
    });
  };
  const callback = (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setDownloadProgress(progress);
  };

  const downloadResumable = FileSystem.createDownloadResumable(
    url.fileUrl,
    FileSystem.documentDirectory + "Document.pdf",
    {},
    callback
  );

  const share = async () => {
    await shareAsync(downloadUri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const saveAndroidFile = async () => {
    {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        return;
      }
      setDownloadBtnLoad(true);
      const { uri } = await downloadResumable.downloadAsync();

      try {
        const fileString = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          name,
          "application/pdf"
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, fileString, {
              encoding: FileSystem.EncodingType.Base64,
            });
            alert("Download Successfull");
          })
          .catch((e) => {})
          .finally(() => {
            setDownloadBtnLoad(false);
            setDownloadProgress(0);
          });
      } catch (e) {
        throw new Error(e);
      }
    }
  };

  return (
    <>
      <HStack m={4} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"lg"}
          variant={"outline"}
          borderColor={"gray.300"}
          borderRadius={12}
          _pressed={{ backgroundColor: secondaryColor }}
          onPress={() => navigation.goBack()}
          icon={
            <Icon
              as={Ionicons}
              name={"ios-chevron-back-outline"}
              color={primaryColor}
            />
          }
        />
        <Text fontFamily={"exo"} fontSize={"lg"}>
          ▪︎{name}
        </Text>
      </HStack>
      <VStack flex={1}>
        <Box
          flex={1}
          borderWidth={2}
          m={1}
          borderColor={"gray.600"}
          borderRadius={"md"}
        >
          {/*
           */}
          <PDFReader
            source={{
              uri: url.fileUrl,
            }}
          />
          {downloadProgress !== 0 && (
            <Center
              position={"absolute"}
              bg={"rgba(0,0,0,0.5)"}
              w={"100%"}
              h={"100%"}
            >
              <Progress.Bar
                color="white"
                progress={downloadProgress}
                width={200}
              />
              <Text fontFamily={"boldExo"} fontSize={"xl"} color={"white"}>
                {`Downloading ${parseInt(downloadProgress * 100)}%`}
              </Text>
            </Center>
          )}
        </Box>
        <HStack
          m={2}
          flex={0.15}
          justifyContent={"space-around"}
          alignItems={"center"}
          borderBottomWidth={1}
          borderTopWidth={1}
        >
          <Button
            w={"40%"}
            background={primaryColor}
            _pressed={{ backgroundColor: pressedColor }}
            _text={{ fontSize: "lg", fontFamily: "exo" }}
            py={3}
            borderRadius={16}
            onPress={share}
            leftIcon={<Icon as={AntDesign} name={"sharealt"} />}
            isLoading={downloadUri ? false : true}
          >
            Share
          </Button>
          <Button
            w={"40%"}
            backgroundColor={primaryColor}
            _pressed={{ backgroundColor: pressedColor }}
            _text={{ fontSize: "lg", fontFamily: "exo" }}
            py={3}
            borderRadius={16}
            leftIcon={<Icon as={Feather} name={"printer"} />}
            onPress={saveAndroidFile}
            isLoading={downloadBtnLoad}
          >
            Download
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export default View;
