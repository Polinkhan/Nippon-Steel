import {
  Avatar,
  Divider,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "native-base";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { theme } from "../../utils/StaticVariable";
import { useState } from "react";

const StatusPost = ({ post }) => {
  const { primaryColor } = theme;
  const [like, setLike] = useState(false);

  return (
    <VStack space={4} bg={"gray.100"} p={4} borderRadius={16}>
      <HStack justifyContent={"space-between"}>
        <HStack alignItems={"center"} space={2}>
          <Avatar source={require("../../assets/images/avater.png")} />
          <Text fontFamily={"boldExo"} fontSize={"md"}>
            {post.author}
          </Text>
          <Text color={"gray.400"} fontFamily={"exo"}>
            ▪︎ {post.time}
          </Text>
        </HStack>
        <IconButton
          icon={
            <Icon
              as={MaterialCommunityIcons}
              name={"dots-vertical"}
              color={primaryColor}
            />
          }
          borderRadius={16}
          _pressed={{
            bg: "gray.200",
          }}
        />
      </HStack>
      <VStack px={2} space={2}>
        <Text fontFamily={"boldExo"} fontSize={"lg"} textAlign={"justify"}>
          {post.title}
        </Text>
        <Text fontFamily={"lightExo"} textAlign={"justify"}>
          {post.desc}
        </Text>
      </VStack>
      <HStack alignItems={"center"} justifyContent={"space-between"}>
        <Text fontFamily={"boldExo"} color={"gray.400"}>
          See comments
        </Text>
        <IconButton
          _pressed={{ bg: "gray.100" }}
          onPress={() => setLike((prev) => !prev)}
          icon={
            <Icon
              as={AntDesign}
              name={like ? "heart" : "hearto"}
              color={primaryColor}
              size={"lg"}
            />
          }
        />
      </HStack>
    </VStack>
  );
};

export default StatusPost;
