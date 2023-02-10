import {
  Button,
  Center,
  Divider,
  HStack,
  Icon,
  Text,
  VStack,
} from "native-base";
import PickerBox from "./PickerBox";
import { useState } from "react";
import { useDataContext } from "../../contexts/DataContext";
import Header from "../Header/Header";
import { theme } from "../../utils/StaticVariable";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { api } from "../../utils/StaticData";
import { fetcher } from "../../utils/ApiCall";

const Payroll = ({ navigation }) => {
  const { primaryColor } = theme;
  const { currentUser, queryParam, setPayslipData } = useDataContext();
  const [btnLoad, setBtnLoad] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handlePress = () => {
    const { UserID } = currentUser;
    setBtnLoad(true);
    fetcher
      .post(`db/getPayslipData/${UserID}`, { ...queryParam })
      .then((res) => {
        // setPayslipData(res);
        console.log(res);
        navigation.navigate("view", { url: res.data, name: res.data.name });
      })
      .catch((err) => {
        setErrorMsg(err.response.data.error.message);
        setTimeout(() => {
          setErrorMsg(null);
        }, 3000);
      })
      .finally(() => setBtnLoad(false));
  };

  return (
    <VStack flex={1} bg={"white"} p={6} space={4}>
      <Text fontSize={"2xl"} fontFamily={"boldExo"}>
        Payroll Menu
      </Text>
      <Divider />
      <VStack px={6} flex={1} justifyContent={"space-between"}>
        <HStack
          justifyContent={"center"}
          alignItems={"center"}
          space={2}
          color={"gray.500"}
          flex={0.3}
        >
          <Icon as={AntDesign} name={"barschart"} />
          <Text fontSize={"xl"} fontFamily={"exo"} color={"gray.500"}>
            Payslip Report
          </Text>
        </HStack>
        <VStack flex={0.6} justifyContent={"space-between"}>
          <VStack w={"100%"} space={6}>
            <PickerBox name={"type"} />
            <PickerBox name={"year"} />
            <PickerBox name={"month"} />
          </VStack>
          <Button
            py={5}
            isLoading={btnLoad}
            isLoadingText={"Searching Report ...."}
            background={primaryColor}
            _text={{ fontSize: "lg", fontFamily: "exo" }}
            borderRadius={16}
            onPress={handlePress}
          >
            Search
          </Button>
        </VStack>
        <HStack
          alignItems={"center"}
          justifyContent={"center"}
          h={20}
          space={1}
        >
          {errorMsg && (
            <>
              <Icon as={AntDesign} name="warning" color="red.400" />
              <Text fontFamily={"exo"} fontSize={"xl"} color={"red.400"}>
                {" Error! " + errorMsg}
              </Text>
            </>
          )}
        </HStack>
      </VStack>
    </VStack>
  );
};
export default Payroll;
