import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  VStack,
} from "native-base";
import { theme } from "../../utils/StaticVariable";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDataContext } from "../../contexts/DataContext";
import * as ImagePicker from "expo-image-picker";
import { fetcher } from "../../utils/ApiCall";
import { api } from "../../utils/StaticData";
import { LogBox, TouchableOpacity } from "react-native";

LogBox.ignoreLogs(["Key"]);

const ChangeProfilePicture = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const { primaryColor, primaryBackgroundColor, secondaryColor } = theme;
  const [btnLoad, setBtnLoad] = useState({ verify: false, change: false });

  const { makeToast, currentUser } = useDataContext();
  const { UserID } = currentUser;

  const handleUpload = async () => {
    // const formData = new FormData();
    // formData.append("file", { uri, name: "media", type: `image/${type}` });
    // console.log(formData);
    // fetcher.post(`${api}/db/image`, formData).then((res) => {});
    makeToast("Uploading Image is not implemented yet");
  };

  const handleImageSelect = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage((prev) => result.assets[0].uri);
    }
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
            Change Profile Picture
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
      <TouchableOpacity
        style={{
          flex: 0.5,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={handleImageSelect}
      >
        <Center
          h={200}
          w={200}
          borderRadius={"full"}
          borderWidth={1}
          borderStyle={"dashed"}
          borderColor={"gray.500"}
          overflow={"hidden"}
        >
          {image ? (
            <Image
              w={"100%"}
              h={"100%"}
              borderRadius={"full"}
              source={{ uri: image }}
              alt=""
            />
          ) : (
            <Text
              textAlign={"center"}
              color={"gray.400"}
              fontFamily={"exo"}
              fontSize={"xl"}
            >
              Upload Profile Picture
            </Text>
          )}
        </Center>
      </TouchableOpacity>
      <Button
        background={primaryColor}
        _text={{ fontSize: "lg", fontFamily: "exo" }}
        py={4}
        borderRadius={16}
        isDisabled={image ? false : true}
        onPress={handleUpload}
      >
        {image ? "Upload" : "No Image Selected"}
      </Button>
    </VStack>
  );
};

export default ChangeProfilePicture;
