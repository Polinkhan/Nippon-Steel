import {
  Center,
  Divider,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { theme } from "../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { fetcher } from "../../utils/ApiCall";
import { Linking, TouchableOpacity } from "react-native";
import * as FileSystem from "expo-file-system";

const CheckUpdate = ({ navigation }) => {
  const { primaryColor, primaryBackgroundColor, secondaryColor } = theme;
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadStatus, setDownloadStatus] = useState({
    isDownloadStart: false,
    isDownloadFinished: false,
  });
  const [updateStatus, setUpdateStatus] = useState(null);
  const version = Constants.manifest.version;

  useEffect(() => {
    (async () => {
      const res = await fetcher.post("db/appUpdate");
      setUpdateStatus(res.data);
    })();
  }, []);

  const handleDownload = async () => {
    setDownloadStatus((prev) => ({ ...prev, isDownloadStart: true }));
    const callback = (downloadProgress) => {
      const progress =
        downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite;
      setDownloadProgress(progress);
    };

    const downloadResumable = FileSystem.createDownloadResumable(
      updateStatus.link,
      FileSystem.documentDirectory + "app.apk",
      {},
      callback
    );
    const { uri } = updateStatus && (await downloadResumable.downloadAsync());
    setDownloadStatus((prev) => ({ ...prev, isDownloadStart: false }));
    Linking.openURL(uri);
  };

  return (
    <VStack flex={1} bg={primaryBackgroundColor} p={4}>
      <VStack alignItems={"center"} space={6} pb={4}>
        <HStack
          w={"100%"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
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
          <Text
            fontSize={"2xl"}
            fontFamily={"boldExo"}
            textTransform={"capitalize"}
          >
            Check for update
          </Text>
          <IconButton
            size={"lg"}
            // variant={"outline"}
            borderColor={"gray.300"}
            borderRadius={12}
            _pressed={{ backgroundColor: secondaryColor }}
            onPress={() => {}}
          />
        </HStack>
        <Divider />
      </VStack>
      <Center flex={0.8}>
        {updateStatus ? (
          updateStatus.status ? (
            <VStack w={"100%"} alignItems={"center"} space={2}>
              <Text fontFamily={"exo"} fontSize={"xl"}>
                New update available
              </Text>
              <Divider w={"40%"} />
              <Text fontFamily={"lightExo"} fontSize={"lg"} color={"gray.500"}>
                Current App Version - {version}
              </Text>
              <Text fontFamily={"lightExo"} fontSize={"lg"} color={"gray.600"}>
                New App Version = {updateStatus.version}
              </Text>
              <TouchableOpacity onPress={handleDownload}>
                <HStack space={2}>
                  <Text my={20} fontFamily={"exo"} fontSize={"xl"}>
                    {downloadStatus.isDownloadStart
                      ? `Downloading - ${parseInt(downloadProgress * 100)}%`
                      : "Download"}
                  </Text>
                  {downloadStatus.isDownloadStart && <Spinner />}
                </HStack>
              </TouchableOpacity>
            </VStack>
          ) : (
            <VStack w={"100%"} alignItems={"center"} space={2}>
              <Text fontFamily={"exo"} fontSize={"xl"}>
                Your app is up to date.
              </Text>
              <Divider w={"40%"} />
              <Text fontFamily={"exo"} fontSize={"lg"} color={"gray.500"}>
                App Version - {version}
              </Text>
            </VStack>
          )
        ) : (
          <HStack space={2}>
            <Text fontFamily={"exo"} fontSize={"lg"}>
              Checking for updates...
            </Text>
            <Spinner color={"black"} />
          </HStack>
        )}
      </Center>
    </VStack>
  );
};

export default CheckUpdate;
