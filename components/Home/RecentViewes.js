import { Center, Divider, HStack, Image, Spinner, Text } from "native-base";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { theme } from "../../utils/Colors";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { fetcher } from "../../utils/ApiCall";
import { LinearGradient } from "expo-linear-gradient";

const RecentViewes = ({ post, navigation }) => {
  const [load, setLoad] = useState(false);

  const handlePress = () => {
    setLoad(true);
    fetcher
      .post(`db/getPayslipData/${post.ID}`, { ...post })
      .then((res) => {
        navigation.navigate("view", { url: res.data, name: res.data.name });
      })
      .finally(() => setLoad(false));
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.1)"]}
        // locations={[0.5, 0.8]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{ borderRadius: 16 }}
      >
        <HStack
          // bgColor={"rgb(0,0,255)"}
          // bg={
          //   "linear-gradient(90deg, rgba(0,0,255,0.5) 0%, rgba(203,213,225,1) 100%)"
          // }
          p={4}
          space={4}
          // justifyContent={"space-between"}
        >
          <Image
            w={8}
            h={10}
            resizeMode={"contain"}
            alt=""
            source={require("../../assets/images/pdf_logo.png")}
          />
          <HStack alignItems={"center"} space={1}>
            <Text fontFamily={"exo"} fontSize={"lg"}>
              {post.type}
            </Text>
            <Text fontSize={"2xl"} color={"gray.500"}>
              ▪︎
            </Text>
            <Text fontFamily={"exo"} fontSize={"lg"}>
              {post.year}
            </Text>
            <Text fontSize={"2xl"} color={"gray.500"}>
              ▪︎
            </Text>
            <Text fontFamily={"exo"} fontSize={"lg"}>
              {post.month}
            </Text>
          </HStack>
          <Center flex={1} alignItems={"flex-end"}>
            {load && <Spinner px={4} size={"sm"} />}
          </Center>
        </HStack>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default RecentViewes;
