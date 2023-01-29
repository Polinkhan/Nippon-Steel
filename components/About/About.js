import {
  Box,
  Button,
  Center,
  Image,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useState } from "react";
import { Linking } from "react-native";

import { useDataContext } from "../../contexts/DataContext";
import { imgLoaction, ff } from "../../utils/StaticData";
import Header from "../Header/Header";

const About = () => {
  const { currentUser, checkFforUpdate } = useDataContext();
  const [downloadLink, setDownloadLink] = useState(null);
  const [loadBtn, setLoadBtn] = useState(false);

  const toast = useToast();

  const textProps = {
    ...ff,
    fontSize: "lg",
    textAlign: "center",
  };

  const handleUpdateBtn = () => {
    setLoadBtn(true);
    checkFforUpdate((res) => {
      if (res === "false") {
        toast.show({
          description: "The latest version is installed",
        });
      } else {
        setDownloadLink(res);
      }
      setLoadBtn(false);
    });
  };

  return (
    <VStack flex={1} bg={"white"}>
      <Header
        N1={"User : " + currentUser.name}
        N2={"Nippon Steel Engineering"}
        N3={"About"}
      />
      <Center flex={0.3} w={"100%"}>
        <Image
          w={"60%"}
          alt=""
          source={imgLoaction}
          style={{ resizeMode: "contain" }}
        />
      </Center>
      <VStack
        flex={0.5}
        p={12}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text {...textProps}>Nippon Steel Engineering Co. Ltd.</Text>
        <Text {...textProps}>
          Address:298 Tiong Bahru Road, #16-01, Central Plaza, Singapore 168730
        </Text>
        <Text {...textProps}>App Version : 2.1.4</Text>
        <Center>
          <Text>Design By</Text>
          <Text>MD Naeem Khan</Text>
        </Center>
        <Center>
          <Text>Developed By</Text>
          <Text>MD Naeem Khan</Text>
        </Center>
      </VStack>
      <Center>
        {downloadLink ? (
          <VStack alignItems={"center"} space={3}>
            <Text fontWeight={"bold"}>New Version Available</Text>
            <Button
              _text={{ ...textProps }}
              variant={"outline"}
              borderRadius={"full"}
              px={4}
              onPress={() => Linking.openURL(downloadLink)}
            >
              Click to download
            </Button>
          </VStack>
        ) : (
          <Button
            _text={{ ...textProps }}
            variant={"outline"}
            borderRadius={"full"}
            px={4}
            isLoading={loadBtn}
            isLoadingText="Checking For Update"
            onPress={handleUpdateBtn}
          >
            Check for Update
          </Button>
        )}
      </Center>
    </VStack>
  );
};

export default About;
