import { Divider, HStack, Icon, IconButton, Text, VStack } from "native-base";
import { useDataContext } from "../../contexts/DataContext";
import { theme } from "../../utils/Colors";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { Linking } from "react-native";

const Contact = () => {
  const { contactLists } = useDataContext();
  const { primaryColor, secondaryBackgroundColor, secondaryColor } = theme;

  const IconButtonProps = {
    size: "lg",
    variant: "outline",
    borderRadius: 16,
    borderColor: secondaryColor,
  };

  return (
    <VStack h={"100%"} bg={"white"} p={6} space={4}>
      {contactLists && (
        <>
          <Text fontSize={"2xl"} fontFamily={"boldExo"}>
            Contact List
          </Text>
          <Divider />
          <ScrollView style={{ flex: 1 }}>
            <VStack w={"100%"} space={6}>
              {contactLists.map((list, i) => (
                <HStack
                  key={i}
                  bg={secondaryBackgroundColor}
                  p={4}
                  borderRadius={16}
                  flex={1}
                  space={2}
                >
                  <VStack flex={1}>
                    <Text fontFamily={"boldExo"} fontSize={"xl"}>
                      {list.Name}
                    </Text>
                    <Text
                      numberOfLines={1}
                      color={"gray.500"}
                      fontFamily={"exo"}
                      fontSize={"md"}
                    >
                      {"Email   : " + list.Email}
                    </Text>
                    <Text
                      numberOfLines={1}
                      color={"gray.500"}
                      fontFamily={"exo"}
                      fontSize={"md"}
                    >
                      {"Tel         : " + list.Tel}
                    </Text>
                  </VStack>
                  <Divider orientation="vertical" />
                  <HStack
                    flex={0.5}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <IconButton
                      {...IconButtonProps}
                      _pressed={{ backgroundColor: secondaryColor }}
                      icon={
                        <Icon
                          size={"lg"}
                          as={Fontisto}
                          name="email"
                          color={primaryColor}
                        />
                      }
                      onPress={() => {
                        Linking.openURL(`mailto:${list.Email}`);
                      }}
                    />
                    <IconButton
                      {...IconButtonProps}
                      _pressed={{ backgroundColor: secondaryColor }}
                      icon={
                        <Icon
                          size={"lg"}
                          as={Ionicons}
                          name="call-outline"
                          color={primaryColor}
                        />
                      }
                      onPress={() => {
                        Linking.openURL(`tel:${list.Tel}`);
                      }}
                    />
                  </HStack>
                </HStack>
              ))}
            </VStack>
          </ScrollView>
        </>
      )}
    </VStack>
  );
};

export default Contact;
