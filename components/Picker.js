import { HStack, Select, Text } from "native-base";
import { useDataContext } from "../contexts/DataContext";

const Picker = ({ name, value, setValue }) => {
  const { Data } = useDataContext();
  return (
    <HStack w={"80%"} justifyContent={"space-between"}>
      <Text
        w={"35%"}
        my={"auto"}
        fontSize={"lg"}
        textAlign={"right"}
        fontFamily={"Nunito-SemiBold"}
      >
        Select {name} :
      </Text>
      <Select
        flex={0.9}
        h={12}
        w={"100%"}
        borderRadius={"lg"}
        size={"xl"}
        selectedValue={value}
        placeholder="Select"
        onValueChange={(itemValue) => setValue(itemValue)}
        _selectedItem={{
          bg: "gray.200",
          borderRadius: "lg",
        }}
        fontFamily={"Nunito-SemiBold"}
      >
        {Data[name].map((elem, i) => (
          <Select.Item
            key={i}
            label={elem}
            value={elem}
            _text={{ fontFamily: "Nunito-SemiBold" }}
            _pressed={{ bg: "gray.300", borderRadius: "lg" }}
          />
        ))}
      </Select>
    </HStack>
  );
};

export default Picker;
