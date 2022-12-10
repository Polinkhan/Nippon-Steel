import { Box, HStack, Select, Text } from "native-base";
import { useDataContext } from "../../contexts/DataContext";
import { Picker } from "@react-native-picker/picker";
import { theme } from "../../utils/StaticVariable";

const PickerBox = ({ name }) => {
  const { Data, queryParam, setQueryParam } = useDataContext();
  const { secondaryColor } = theme;

  return (
    <HStack w={"80%"} justifyContent={"space-between"}>
      <Text
        w={"40%"}
        my={"auto"}
        fontSize={"lg"}
        textAlign={"right"}
        fontFamily={"Nunito-SemiBold"}
      >
        Select {name} :
      </Text>
      <Box>
        <Picker
          selectedValue={queryParam[name]}
          style={{ height: 50, width: 150, backgroundColor: secondaryColor }}
          onValueChange={(itemValue, itemIndex) =>
            setQueryParam((prev) => ({ ...prev, [name]: itemValue }))
          }
        >
          {Data[name].map((elem, i) => (
            <Picker.Item key={i} label={elem} value={elem} />
          ))}
        </Picker>
      </Box>
    </HStack>
  );
};

export default PickerBox;
