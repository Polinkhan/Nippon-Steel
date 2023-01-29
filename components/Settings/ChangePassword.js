import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  Text,
  VStack,
} from "native-base";
import { theme } from "../../utils/StaticVariable";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDataContext } from "../../contexts/DataContext";
import { fetcher } from "../../utils/ApiCall";
import { api } from "../../utils/StaticData";

const ChangePassword = ({ navigation, route }) => {
  const { primaryColor, primaryBackgroundColor, secondaryColor } = theme;
  const [btnLoad, setBtnLoad] = useState({ verify: false, change: false });
  const [pass, setPass] = useState({ verify: "", newPass: "", repeatPass: "" });
  const [modal, setModal] = useState(false);

  const { makeToast, currentUser } = useDataContext();

  const { id } = route.params;
  const { UserID } = currentUser;

  const handleVerify = () => {
    const { verify } = pass;
    setBtnLoad((prev) => ({ ...prev, verify: true }));
    fetcher
      .post(`${api}/auth/password/verify`, { UserID, pass: verify })
      .then(() => navigation.navigate("password", { id: "change" }))
      .catch((err) => {
        setBtnLoad((prev) => ({ ...prev, verify: false }));
        makeToast(err.message);
      });
  };
  const handleSubmit = () => {
    const { newPass, repeatPass } = pass;
    if (newPass !== repeatPass) makeToast("Password Not Matched");
    else if (newPass === "") makeToast("Password filled can not be empty");
    else {
      setBtnLoad((prev) => ({ ...prev, change: true }));
      fetcher
        .post(`${api}/auth/password/change`, { UserID, pass: pass.newPass })
        .then((res) => {
          setModal(true);
        })
        .catch((err) => {
          setBtnLoad((prev) => ({ ...prev, change: false }));
          makeToast(err.message);
        });
    }
  };

  return (
    <VStack flex={1} bg={primaryBackgroundColor} p={4}>
      <VStack alignItems={"center"} space={6} pb={4}>
        <HStack
          w={"100%"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            size={"lg"}
            variant={"outline"}
            borderColor={"gray.300"}
            borderRadius={12}
            _pressed={{ backgroundColor: secondaryColor }}
            onPress={() => navigation.goBack()}
            icon={
              <Icon
                as={Ionicons}
                name={"ios-chevron-back-outline"}
                color={primaryColor}
              />
            }
          />
          <Text
            fontSize={"2xl"}
            fontFamily={"boldExo"}
            textTransform={"capitalize"}
          >
            {id} Password
          </Text>
          <IconButton
            size={"lg"}
            // variant={"outline"}
            borderColor={"gray.300"}
            borderRadius={12}
            _pressed={{ backgroundColor: secondaryColor }}
            onPress={() => {}}
          />
        </HStack>
        <Divider />
      </VStack>
      <Box flex={1} py={4}>
        {id === "verify" ? (
          <VStack space={6}>
            <VStack space={2}>
              <Text px={2} fontSize={"lg"} fontFamily={"exo"}>
                Enter Your Current Password
              </Text>
              <Input
                borderRadius={16}
                value={pass.verify}
                variant={"filled"}
                placeholder={"Current Password"}
                _focus={{
                  backgroundColor: "gray.100",
                  borderColor: "gray.100",
                }}
                fontFamily={"exo"}
                fontSize={"lg"}
                py={4}
                onChangeText={(text) =>
                  setPass((prev) => ({ ...prev, verify: text }))
                }
              />
            </VStack>
            <Button
              py={4}
              my={10}
              borderRadius={16}
              isLoading={btnLoad.verify}
              background={primaryColor}
              isLoadingText={"Verifying Password..."}
              _text={{ fontSize: "lg", fontFamily: "exo" }}
              onPress={handleVerify}
            >
              Verify Password
            </Button>
          </VStack>
        ) : (
          <VStack space={6}>
            <VStack space={2}>
              <Text px={2} fontSize={"lg"} fontFamily={"exo"}>
                New Password
              </Text>
              <Input
                borderRadius={16}
                value={pass.newPass}
                variant={"filled"}
                placeholder={"New Password"}
                _focus={{
                  backgroundColor: "gray.100",
                  borderColor: "gray.100",
                }}
                fontFamily={"exo"}
                fontSize={"lg"}
                py={4}
                onChangeText={(text) =>
                  setPass((prev) => ({ ...prev, newPass: text }))
                }
              />
            </VStack>
            <VStack space={2}>
              <Text px={2} fontSize={"lg"} fontFamily={"exo"}>
                Repeat Password
              </Text>
              <Input
                borderRadius={16}
                value={pass.repeatPass}
                variant={"filled"}
                placeholder={"Repeat Password"}
                _focus={{
                  backgroundColor: "gray.100",
                  borderColor: "gray.100",
                }}
                fontFamily={"exo"}
                fontSize={"lg"}
                py={4}
                onChangeText={(text) =>
                  setPass((prev) => ({ ...prev, repeatPass: text }))
                }
              />
            </VStack>
            <Button
              isLoading={btnLoad.change}
              isLoadingText={"Submitting..."}
              onPress={handleSubmit}
              background={primaryColor}
              _text={{ fontSize: "lg", fontFamily: "exo" }}
              py={4}
              my={10}
              borderRadius={16}
              // onPress={() => navigation.goBack()}
            >
              Submit
            </Button>
          </VStack>
        )}
      </Box>
      <Modal isOpen={modal}>
        <Modal.Content maxWidth="400px">
          <Modal.Header fontFamily={"exo"}>
            <Text fontFamily={"exo"} fontSize={"2xl"}>
              Successfull
            </Text>
          </Modal.Header>
          <Modal.Body>
            <VStack p={2} space={4}>
              <Text fontFamily={"exo"} px={3} fontSize={"lg"}>
                Password has changed
              </Text>
              <Button
                background={primaryColor}
                _text={{ fontSize: "lg", fontFamily: "exo" }}
                py={4}
                borderRadius={16}
                onPress={() => {
                  console.log("click");
                  navigation.goBack();
                }}
              >
                Go Back
              </Button>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </VStack>
  );
};

export default ChangePassword;
