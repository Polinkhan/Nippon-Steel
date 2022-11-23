import { Button, Center, VStack } from "native-base";
import Picker from "../Picker";
import { useState } from "react";

const CheckPaySlip = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  return (
    <VStack
      h={"100%"}
      bg={"white"}
      justifyContent={"center"}
      alignItems={"center"}
      space={40}
    >
      <VStack space={6}>
        <Picker name={"year"} value={year} setValue={setYear} />
        <Picker name={"month"} value={month} setValue={setMonth} />
      </VStack>

      <Button
        w={"70%"}
        h={12}
        borderRadius={"full"}
        colorScheme={"blue"}
        _text={{ fontSize: "xl", fontFamily: "Nunito-SemiBold" }}
      >
        View
      </Button>
    </VStack>
  );
};

export default CheckPaySlip;
