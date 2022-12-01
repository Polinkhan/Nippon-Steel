import { Button, Image, Input, Text, useToast, VStack } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import { useDataContext } from "../../contexts/DataContext";
import { useState } from "react";

const SignIn = () => {
  const { SignInWithId, setAuth } = useDataContext();
  const [user, setUser] = useState({ id: "", pass: "" });
  const [btnLoad, setBtnLoad] = useState(false);
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
        console.log(flag);
        !flag &&
          toast.show({
            description: "Invalid User ID / Pass",
          });
      });
    }
  };

  return (
    <VStack bg={"white"} h={"100%"}>
      <Image
        source={require("../../assets/banner.png")}
        w={"100%"}
        alt={""}
        flex={0.7}
        resizeMode={"contain"}
      />
      <VStack flex={1.3} p={12} justifyContent={"space-around"} space={16}>
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
        </VStack>
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
      </VStack>
    </VStack>
  );
};

export default SignIn;
