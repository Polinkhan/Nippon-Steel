import { HStack, Select, Text } from "native-base";
import { useDataContext } from "../contexts/DataContext";

const Picker = ({ name }) => {
  const { Data, queryParam, setQueryParam } = useDataContext();
  return (
    <HStack w={"80%"} justifyContent={"space-between"}>
      <Text
        w={"40%"}
        my={"auto"}
        fontSize={"lg"}
        textAlign={"center"}
        fontFamily={"Nunito-SemiBold"}
      >
        Select {name} :
      </Text>
      <Select
        flex={0.9}
        borderRadius={"lg"}
        size={"md"}
        selectedValue={queryParam[name]}
        placeholder="Select"
        onValueChange={(itemValue) =>
          setQueryParam({ ...queryParam, [name]: itemValue })
        }
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
