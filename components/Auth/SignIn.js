import {
  Button,
  Center,
  HStack,
  Icon,
  Image,
  Input,
  Skeleton,
  Text,
  VStack,
} from "native-base";
import { FontAwesome5, Ionicons, AntDesign } from "@expo/vector-icons";
import { useDataContext } from "../../contexts/DataContext";
import { useState } from "react";
import { theme } from "../../utils/StaticVariable";
// import { Button as PaperButton, TextInput } from "react-native-paper";
import { api, headers } from "../../utils/StaticData";
import { fetcher } from "../../utils/ApiCall";
import * as SecureStore from "expo-secure-store";
import { DevSettings } from "react-native";

const SignIn = () => {
  const { makeToast, setCurrentUser, initialFetch } = useDataContext();
  const [user, setUser] = useState({ id: "", pass: "" });
  const [showPass, setShowPass] = useState(false);
  const [btnLoad, setBtnLoad] = useState(false);

  const { primaryColor, secondaryColor } = theme;

  const handleSubmit = async () => {
    // if (user.id === "" || user.pass === "") {
    //   setError(true);
    //   makeToast("User ID or Password cannot be empty!!");
    // } else {
    setBtnLoad(true);
    fetcher
      .post(`auth/login`, user)
      .then((res) => {
        const { data } = res;
        console.log(41, data);
        SecureStore.setItemAsync("accessToken", data.accessToken);
        setCurrentUser(data.user);
      })
      .catch((err) => {
        const { error } = err.response.data;
        console.log(error);
        setBtnLoad(false);
        makeToast(error.message);
      });
  };

  return (
    <VStack flex={1} bg={"white"} h={"100%"}>
      {initialFetch ? (
        initialFetch.fetchErrorStatus ? (
          <>
            {/* <Center flex={0.3}>
              <Image
                source={require("../../assets/banner.png")}
                alt={""}
                maxW={"60%"}
                flex={0.7}
                resizeMode={"contain"}
              />
            </Center> */}
            <VStack flex={1} px={12} space={12}>
              <VStack flex={0.5} justifyContent={"center"}>
                <Text fontFamily="boldExo" fontSize={"4xl"}>
                  Welcome
                </Text>
                <Text fontFamily="exo" fontSize={"md"} color={"gray.400"}>
                  Nippon Steel Engineering
                </Text>
              </VStack>
              <VStack space={4}>
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
                      _text={{ color: primaryColor }}
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
              </VStack>
              <Button
                isLoading={btnLoad}
                isLoadingText={"Loging in ...."}
                onPress={handleSubmit}
                background={primaryColor}
                _text={{ fontSize: "lg", fontFamily: "exo" }}
                py={5}
                borderRadius={16}
              >
                Log in
              </Button>
            </VStack>
          </>
        ) : (
          <VStack flex={1} justifyContent={"center"} px={4} space={4}>
            <HStack alignItems={"center"} space={2}>
              <Icon
                as={AntDesign}
                name={"warning"}
                color={"red.600"}
                size={"2xl"}
              />
              <Text fontSize={"2xl"} color={"red.600"}>
                {initialFetch.message}
              </Text>
            </HStack>
            <HStack px={4}>
              <VStack width={"30%"}>
                <Text>Error Status</Text>
                <Text>Error Message </Text>
              </VStack>
              <VStack width={"70%"}>
                <Text>
                  {":  "}
                  {initialFetch.status}
                </Text>
                <Text>
                  {":  "}
                  {initialFetch.message}
                </Text>
              </VStack>
            </HStack>
            <Center py={12}>
              <Button
                px={6}
                _text={{ fontSize: "xl", color: primaryColor }}
                variant={"ghost"}
                onPress={() => DevSettings.reload()}
              >
                Retry
              </Button>
            </Center>
          </VStack>
        )
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
