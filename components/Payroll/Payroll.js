import {
  Button,
  HStack,
  Icon,
  Input,
  Text,
  useToast,
  VStack,
} from "native-base";
import PickerBox from "./PickerBox";
import { useState } from "react";
import { useDataContext } from "../../contexts/DataContext";
import Header from "../Header";
import { theme } from "../../utils/StaticVariable";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Service from "./Service";
import { ff } from "../../utils/StaticData";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Payroll = ({ navigation }) => {
  const { primaryColor } = theme;
  const { currentUser, queryParam, getPDF, setCurrentPdf } = useDataContext();
  const [btnLoad, setBtnLoad] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [captcha, useCaptcha] = useState({
    first: 0,
    second: 0,
    total: 0,
  });

  const handlePress = () => {
    setBtnLoad(true);
    if (
      queryParam.month === "" ||
      queryParam.year === "" ||
      queryParam.type === ""
    ) {
      setErrorMsg("Data Can't be empty, Please fillup all");
      setTimeout(() => {
        setErrorMsg(null);
      }, 6000);
      setBtnLoad(false);
    } else {
      getPDF({ ...queryParam, id: currentUser.id }, (url) => {
        if (url === "false") {
          setErrorMsg(
            `No Data found Name with ${currentUser.id}_${queryParam.month}_${queryParam.year}_${queryParam.type}`
          );
          setTimeout(() => {
            setErrorMsg(null);
          }, 6000);
          setBtnLoad(false);
          setBtnLoad(false);
        } else {
          setBtnLoad(false);
          setCurrentPdf(url);
          navigation.navigate("view");
        }
      });
    }
  };

  return (
    <VStack h={"100%"} bg={"white"}>
      <Header
        N1={"User : " + currentUser.name}
        N2={"Nippon Steel Engineering"}
        N3={"Payroll"}
      />
      <VStack
        flex={1}
        py={20}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <VStack space={12}>
          <VStack w={"100%"} space={4}>
            <PickerBox name={"year"} />
            <PickerBox name={"month"} />
            {/* <PickerBox name={"type"} /> */}
          </VStack>
          <HStack space={4} mx={"auto"}>
            <Text my={"auto"}>CAPTCHA</Text>
            <Text my={"auto"}>{captcha.first}</Text>
            <Text my={"auto"}>+</Text>
            <Text my={"auto"}>{captcha.second}</Text>
            <Input w={20} textAlign={"center"} py={0} />
          </HStack>
          <HStack justifyContent={"center"}>
            <Button
              minW={"50%"}
              h={12}
              borderRadius={"full"}
              bg={primaryColor}
              _text={{ fontSize: "lg", fontFamily: "Nunito-SemiBold" }}
              onPress={handlePress}
              isLoading={btnLoad}
              isLoadingText="Fetching Data From Box"
              leftIcon={<Icon as={Ionicons} name={"search"} size={"sm"} />}
            >
              Search
            </Button>
          </HStack>
        </VStack>
        <HStack alignItems={"center"} h={"5%"}>
          {errorMsg && (
            <>
              <Icon
                size={"xs"}
                as={MaterialIcons}
                name="error-outline"
                color="red.400"
              />
              <Text color={"red.400"}>{" Error!! " + errorMsg}</Text>
            </>
          )}
        </HStack>
      </VStack>
    </VStack>
  );
};
export default Payroll;
