import { Box, FormControl, HStack, Icon, Select } from "native-base";
import { useDataContext } from "../../contexts/DataContext";
import { theme } from "../../utils/Colors";

const PickerBox = ({ name }) => {
  const { selectOptions, queryParam, setQueryParam } = useDataContext();
  const { secondaryColor } = theme;

  return (
    selectOptions && (
      <HStack alignSelf={"center"} justifyContent={"space-between"}>
        {/* <Text
          w={"40%"}
          my={"auto"}
          fontSize={"lg"}
          textAlign={"right"}
          fontFamily={"exo"}
        >
          Select {name} :
        </Text> */}
        <Box w={"100%"}>
          <FormControl isRequired>
            <Select
              selectedValue={queryParam[name]}
              w={"100%"}
              accessibilityLabel="Choose Service"
              placeholder={`Choose ${name}`}
              fontFamily={"exo"}
              fontSize={"md"}
              borderRadius={16}
              py={4}
              _selectedItem={{
                bg: "gray.300",
                borderRadius: 12,
                endIcon: <Icon as={""} name={"check"} />,
              }}
              onValueChange={(itemValue, itemIndex) =>
                setQueryParam((prev) => ({ ...prev, [name]: itemValue }))
              }
            >
              {selectOptions[name].map((elem, i) => (
                <Select.Item
                  _pressed={{ bg: "gray.200", borderRadius: 12 }}
                  key={i}
                  label={elem}
                  value={elem}
                />
              ))}
            </Select>
          </FormControl>
        </Box>
      </HStack>
    )
  );
};

export default PickerBox;
