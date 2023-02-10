import {
  Avatar,
  Center,
  HStack,
  Icon,
  Image,
  Input,
  Text,
  VStack,
} from "native-base";
import { useDataContext } from "../../contexts/DataContext";
import { theme } from "../../utils/StaticVariable";

import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { AnnounmentPost } from "../../utils/StaticData";

import { ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import StatusPost from "./StatusPost";
import React, { useState, useCallback } from "react";

const { primaryBackgroundColor } = theme;

const Home = ({ navigation }) => {
  const { currentUser, adData } = useDataContext();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <VStack h={"100%"} bg={primaryBackgroundColor} px={4}>
      <ScrollView
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <HStack pt={4} alignItems={"center"} justifyContent={"space-between"}>
          <VStack>
            <Text fontFamily={"boldExo"} fontSize={"4xl"}>
              Welcome,
            </Text>
            <Text fontFamily={"exo"} fontSize={"xl"} color={"gray.400"}>
              {currentUser["Employee Name"]}
            </Text>
          </VStack>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("profile");
            }}
          >
            <Image
              h={16}
              w={16}
              borderWidth={1}
              borderRadius={16}
              borderColor={"gray.100"}
              alt={"Profile Picture"}
              source={require("../../assets/images/avater.png")}
            />
          </TouchableOpacity>
        </HStack>
        <VStack bg={"white"} py={4} space={2}>
          <Input
            variant={"filled"}
            fontSize={"lg"}
            placeholder={"Search"}
            py={4}
            borderRadius={12}
            leftElement={
              <Icon as={Ionicons} ml={4} name="search-outline" size={"xl"} />
            }
          />
          <Text fontFamily={"boldExo"} fontSize={"lg"} color={"gray.500"}>
            Recent Announment
          </Text>
        </VStack>
        {/* <VStack space={6} pb={6}>
          {AnnounmentPost.map((post, i) => (
            <StatusPost key={i} post={post} />
          ))}
        </VStack> */}
      </ScrollView>
    </VStack>
  );
};

export default Home;

{
  /* <Center h={"30%"}>
  <Image
    w={"60%"}
    alt=""
    source={imgLoaction}
    style={{ resizeMode: "contain" }}
  />
</Center>;

<Center h={250}>
  <SliderBox
    images={adData}
    sliderBoxHeight={250}
    ImageComponentStyle={{ borderRadius: 10 }}
    imageLoadingColor="#2196F3"
  />
</Center>; */
}
