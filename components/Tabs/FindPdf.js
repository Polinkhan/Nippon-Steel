import {
  Button,
  Center,
  HStack,
  IconButton,
  Input,
  Text,
  useToast,
  VStack,
} from "native-base";
import Picker from "../Picker";
import { useState } from "react";
import { useDataContext } from "../../contexts/DataContext";

const FindPdf = ({ navigation }) => {
  const { currentUser, queryParam, getPDF, setCurrentPdf } = useDataContext();
  const [btnLoad, setBtnLoad] = useState(false);
  const [captcha, useCaptcha] = useState({
    first: 0,
    second: 0,
    total: 0,
  });
  const toast = useToast();

  const handlePress = () => {
    setBtnLoad(true);
    getPDF({ ...queryParam, id: currentUser.id }, (url) => {
      if (url === "false") {
        toast.show({
          description: "No PDF Found !!",
        });
        setBtnLoad(false);
      } else {
        setBtnLoad(false);
        setCurrentPdf(url);
        navigation.navigate("pdfview");
      }
    });
  };

  return (
    <VStack
      h={"100%"}
      bg={"white"}
      justifyContent={"space-around"}
      alignItems={"center"}
      p={4}
    >
      <HStack alignSelf={"flex-start"}>
        {/* <IconButton bg={"amber.100"} /> */}
      </HStack>
      <VStack space={12}>
        <VStack w={"100%"} space={4}>
          <Picker name={"year"} />
          <Picker name={"month"} />
          <Picker name={"type"} />
        </VStack>
        <HStack space={4} mx={"auto"}>
          <Text my={"auto"}>CAPTCHA </Text>
          <Text my={"auto"}>{captcha.first}</Text>
          <Text my={"auto"}>+</Text>
          <Text my={"auto"}>{captcha.second}</Text>
          <Text my={"auto"}>=</Text>
          <Input w={20} textAlign={"center"} py={0} />
        </HStack>
        <Button
          h={12}
          borderRadius={"full"}
          colorScheme={"blue"}
          _text={{ fontSize: "md", fontFamily: "Nunito-SemiBold" }}
          onPress={handlePress}
          isLoading={btnLoad}
          isLoadingText="Fetching PDF From Box"
        >
          Search
        </Button>
      </VStack>
      <HStack>
        <Button
          variant={"ghost"}
          _text={{ fontSize: "lg", color: "red.500" }}
          borderRadius={"full"}
          px={4}
          _pressed={{
            bg: "gray.100",
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          {"< Back"}
        </Button>
      </HStack>
    </VStack>
  );
};

export default FindPdf;
