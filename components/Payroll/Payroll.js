import { Button, Divider, HStack, Icon, Text, VStack } from "native-base";
import PickerBox from "./PickerBox";
import { useState } from "react";
import { useDataContext } from "../../contexts/DataContext";
import Header from "../Header/Header";
import { theme } from "../../utils/StaticVariable";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { api } from "../../utils/StaticData";
import { fetcher } from "../../utils/ApiCall";
// import { Button as PaperButton } from "react-native-paper";

const Payroll = ({ navigation }) => {
  const { primaryColor } = theme;
  const { currentUser, queryParam, setPayslipData } = useDataContext();
  const [btnLoad, setBtnLoad] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handlePress = () => {
    const { UserID } = currentUser;
    setBtnLoad(true);
    fetcher
      .get(`${api}/db/getPayslipData/${UserID}/${queryParam.Date}`)
      .then((res) => {
        setPayslipData(res);
        navigation.navigate("view");
      })
      .catch(() => {})
      .finally(() => setBtnLoad(false));
  };

  return (
    <VStack flex={1} bg={"white"} p={6} space={4}>
      <Text fontSize={"2xl"} fontFamily={"boldExo"}>
        Payslip Report
      </Text>
      <Divider />
      <VStack px={6} flex={1} justifyContent={"center"}>
        <VStack flex={0.6} justifyContent={"space-around"}>
          <VStack w={"100%"} space={6}>
            <PickerBox name={"Date"} />
            <PickerBox name={"type"} />
          </VStack>

          <Button
            isLoading={btnLoad}
            isLoadingText={"Genarating Report ...."}
            background={primaryColor}
            _text={{ fontSize: "lg", fontFamily: "exo" }}
            py={5}
            borderRadius={16}
            onPress={handlePress}
          >
            Search
          </Button>
        </VStack>
        <HStack alignItems={"center"} justifyContent={"center"} h={"5%"}>
          {errorMsg && (
            <>
              <Icon
                size={"xs"}
                as={MaterialIcons}
                name="error-outline"
                color="red.400"
              />
              <Text color={"red.400"}>{" Error! " + errorMsg}</Text>
            </>
          )}
        </HStack>
      </VStack>
    </VStack>
  );
};
export default Payroll;
