import {
  Button,
  Center,
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
import { theme } from "../../utils/StaticVariable";

const SignIn = () => {
  const { SignInWithId, setAuth } = useDataContext();
  const [user, setUser] = useState({ id: "", pass: "" });
  const [btnLoad, setBtnLoad] = useState(false);
  const { primaryColor } = theme;
  const toast = useToast();

  const handleSubmit = () => {
    setBtnLoad(true);
    if (user.id === "" || user.pass === "") {
      toast.show({
        description: "User ID or Password cannot be empty!!",
      });
      setBtnLoad(false);
    } else {
      SignInWithId(user, (flag) => {
        setBtnLoad(false);
        setAuth(flag);
        !flag &&
          toast.show({
            description: "Invalid User ID / Pass",
          });
      });
    }
  };

  return (
    <VStack bg={"white"} h={"100%"}>
      <Center flex={0.3}>
        <Image
          source={require("../../assets/banner.png")}
          w={"70%"}
          alt={""}
          flex={0.7}
          resizeMode={"contain"}
        />
      </Center>
      <VStack flex={0.7} p={12} justifyContent={"space-around"} space={16}>
        <VStack space={6}>
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
            onChangeText={(text) => setUser((prev) => ({ ...prev, id: text }))}
          />
          <Input
            leftElement={
              <FontAwesome5 name="lock" size={18} color={"#d3d3d3"} />
            }
            pl={4}
            fontFamily="Nunito-SemiBold"
            variant={"underlined"}
            placeholder="Password"
            type="password"
            size={"xl"}
            onChangeText={(text) =>
              setUser((prev) => ({ ...prev, pass: text }))
            }
          />
        </VStack>
        <Button
          size={"lg"}
          _text={{
            fontSize: "xl",
            fontFamily: "Nunito-SemiBold",
          }}
          borderRadius={"full"}
          bg={primaryColor}
          isLoading={btnLoad}
          isLoadingText={"Fetching Your Data From Box ...."}
          onPress={handleSubmit}
        >
          Login
        </Button>
      </VStack>
    </VStack>
  );
};

export default SignIn;
