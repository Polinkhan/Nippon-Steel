import {
  Button,
  Center,
  HStack,
  Image,
  Input,
  Text,
  useToast,
  VStack,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import { useDataContext } from "../../contexts/DataContext";
import { useState } from "react";

const SignIn = () => {
  const { SignInWithId } = useDataContext();
  const [user, setUser] = useState({ id: "", pass: "" });
  const [btnLoad, setBtnLoad] = useState(false);
  const toast = useToast();

  const handleSubmit = () => {
    setBtnLoad(true);
    SignInWithId(user.id, user.pass)
      .catch((err) => {
        toast.show({
          description: err.message,
        });
      })
      .finally(() => {
        setBtnLoad(false);
      });
  };

  return (
    <VStack bg={"white"} h={"100%"}>
      <Image
        source={require("../../assets/banner.jpg")}
        w={"100%"}
        alt={""}
        flex={0.7}
        resizeMode={"center"}
      />
      <VStack flex={1.3} px={8} overflow={"scroll"}>
        <VStack space={6} mb={12}>
          <Text fontFamily="Nunito-SemiBold" fontSize={"4xl"}>
            Login
          </Text>
          <Input
            leftElement={<FontAwesome5 name="at" size={18} color={"#d3d3d3"} />}
            pl={4}
            fontFamily="Nunito-SemiBold"
            variant={"underlined"}
            placeholder="User ID"
            keyboardType="numeric"
            size={"xl"}
            onChangeText={(text) => setUser({ id: text, pass: user.pass })}
          />
          <Input
            leftElement={
              <FontAwesome5 name="lock" size={18} color={"#d3d3d3"} />
            }
            pl={4}
            fontFamily="Nunito-SemiBold"
            variant={"underlined"}
            placeholder="Password"
            size={"xl"}
            onChangeText={(text) => setUser({ id: user.id, pass: text })}
          />
          <HStack justifyContent={"flex-end"} w={"100%"}>
            <Link
              style={{
                fontFamily: "Nunito-SemiBold",
                color: "blue",
                fontSize: 20,
              }}
              to={"/"}
            >
              Forgot Password?
            </Link>
          </HStack>
        </VStack>
        <VStack space={4}>
          <Button
            size={"lg"}
            _text={{
              fontSize: "xl",
              fontFamily: "Nunito-SemiBold",
            }}
            borderRadius={"full"}
            colorScheme={"blue"}
            isLoading={btnLoad}
            isLoadingText={"Submitting ...."}
            onPress={handleSubmit}
          >
            Login
          </Button>
          <Center>
            <Text
              fontFamily="Nunito-SemiBold"
              fontSize={"md"}
              color={"gray.500"}
            >
              OR
            </Text>
          </Center>
          <Button
            size={"lg"}
            _text={{
              fontSize: "xl",
              color: "gray.700",
              fontFamily: "Nunito-SemiBold",
            }}
            _pressed={{
              bg: "gray.300",
            }}
            borderRadius={"full"}
            bg={"gray.200"}
          >
            Login with google
          </Button>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default SignIn;
