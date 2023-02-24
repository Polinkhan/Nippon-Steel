import {
  Button,
  Center,
  Checkbox,
  HStack,
  Icon,
  Input,
  Skeleton,
  Text,
  VStack,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useDataContext } from "../../contexts/DataContext";
import { useState } from "react";
import { theme } from "../../utils/Colors";
import { fetcher } from "../../utils/ApiCall";
import * as SecureStore from "expo-secure-store";
import { DevSettings } from "react-native";

const SignIn = () => {
  const { makeToast, setCurrentUser, initialFetch } = useDataContext();
  const [user, setUser] = useState({ id: "", pass: "" });
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [btnLoad, setBtnLoad] = useState(false);

  const { primaryColor, secondaryColor, pressedColor } = theme;

  const handleSubmit = async () => {
    setBtnLoad(true);
    fetcher
      .post(`auth/login`, user)
      .then((res) => {
        const { data } = res;
        rememberMe && SecureStore.setItemAsync("accessToken", data.accessToken);
        setCurrentUser(data.user);
      })
      .catch((err) => {
        const { error } = err.response.data;
        setBtnLoad(false);
        makeToast(error.message);
      });
  };

  return (
    <VStack flex={1} bg={"white"} h={"100%"}>
      {initialFetch ? (
        <VStack flex={1} px={12} space={12}>
          <VStack flex={0.5} justifyContent={"center"}>
            <Text fontFamily="boldExo" fontSize={"4xl"}>
              Welcome
            </Text>
            <Text fontFamily="exo" fontSize={"md"} color={"gray.400"}>
              Nippon Steel Engineering
            </Text>
          </VStack>
          <VStack space={5}>
            <Input
              borderRadius={16}
              value={user.id}
              variant={"filled"}
              placeholder={"User ID"}
              _focus={{
                backgroundColor: "gray.100",
                borderColor: "gray.100",
              }}
              fontFamily={"exo"}
              fontSize={"lg"}
              py={4}
              onChangeText={(text) =>
                setUser((prev) => ({ ...prev, id: text }))
              }
            />
            <Input
              value={user.pass}
              placeholder={"Password"}
              borderRadius={16}
              variant={"filled"}
              type={showPass ? "text" : "password"}
              rightElement={
                <Button
                  variant={"ghost"}
                  mr={2}
                  _text={{ color: "gray.500", fontFamily: "exo" }}
                  borderRadius={12}
                  _pressed={{ background: secondaryColor }}
                  onPress={() => setShowPass((prev) => !prev)}
                >
                  {showPass ? "Hide" : "Show"}
                </Button>
              }
              py={4}
              _focus={{
                backgroundColor: "gray.100",
                borderColor: "gray.100",
              }}
              fontFamily={"exo"}
              fontSize={"lg"}
              onChangeText={(text) =>
                setUser((prev) => ({ ...prev, pass: text }))
              }
            />

            <Checkbox
              mx={1}
              _text={{
                fontFamily: "exo",
                color: "gray.500",
                fontSize: "lg",
              }}
              colorScheme={"gray"}
              defaultIsChecked
              onChange={(e) => setRememberMe(e)}
            >
              Remember me
            </Checkbox>
          </VStack>
          <Button
            isLoading={btnLoad}
            isLoadingText={"Loging in ...."}
            onPress={handleSubmit}
            backgroundColor={primaryColor}
            _pressed={{ backgroundColor: pressedColor }}
            _text={{ fontSize: "lg", fontFamily: "exo" }}
            py={5}
            borderRadius={16}
          >
            Log in
          </Button>
        </VStack>
      ) : (
        <VStack flex={1} justifyContent={"space-between"}>
          <Skeleton height="200px" />
          <Skeleton height="60px" />
        </VStack>
      )}
    </VStack>
  );
};

export default SignIn;
