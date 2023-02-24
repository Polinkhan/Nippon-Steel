import {
  Box,
  Center,
  Divider,
  HStack,
  Icon,
  Image,
  Input,
  Text,
  VStack,
} from "native-base";
import { useDataContext } from "../../contexts/DataContext";
import { theme } from "../../utils/Colors";
import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { AnnounmentPost } from "../../utils/StaticData";
import {
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  useWindowDimensions,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import RecentViewes from "./RecentViewes";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from "expo-linear-gradient";
const { primaryBackgroundColor } = theme;

const Home = ({ navigation }) => {
  const { currentUser, adPictures, cacheData, setCacheData } = useDataContext();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      const cache = await SecureStore.getItemAsync("cacheData");
      setCacheData(JSON.parse(cache));
    })();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <VStack h={"100%"} bg={primaryBackgroundColor} px={4} space={4}>
      <HStack pt={4} alignItems={"center"} justifyContent={"space-between"}>
        <VStack>
          <Text fontFamily={"boldExo"} fontSize={"4xl"}>
            Welcome,
          </Text>
          <Text fontFamily={"exo"} fontSize={"xl"} color={"gray.400"}>
            {currentUser.Name}
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
      <Box h={250}>
        {adPictures ? (
          <FlatList
            style={{ paddingBottom: 20 }}
            data={adPictures}
            renderItem={({ item }) => <Item url={item.url} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator
            pagingEnabled
            // bounces={false}
          />
        ) : (
          <Center h={200}>
            <Text fontFamily={"exo"} fontSize={"lg"}>
              Loading images ...{" "}
            </Text>
          </Center>
        )}
      </Box>
      <HStack justifyContent={"space-between"} alignItems={"center"}>
        <Divider w={"45%"} />
        <Text fontSize={"4xl"} pb={1} color={"gray.500"}>
          ▪︎
        </Text>
        <Divider w={"45%"} />
      </HStack>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <VStack bg={"white"} space={4}>
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
          <Text fontFamily={"lightExo"} fontSize={"lg"} color={"gray.700"}>
            Recently Viewed Document
          </Text>
          {cacheData && (
            <VStack space={4}>
              {cacheData.reverse().map((post, i) => (
                <RecentViewes key={i} post={post} navigation={navigation} />
              ))}
            </VStack>
          )}
        </VStack>
      </ScrollView>
    </VStack>
  );
};

const Item = ({ url }) => {
  const { width } = useWindowDimensions();

  return (
    <VStack w={width - 32}>
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,1)"]}
        // locations={[0.5, 0.8]}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1, borderRadius: 16 }}
      >
        <VStack position={"absolute"} left={5} top={"80%"}>
          <Text fontFamily={"exo"} color={"gray.300"} fontSize={"xl"}>
            Nippon Steel Engineering
          </Text>
        </VStack>
        <Image
          borderRadius={16}
          flex={1}
          resizeMode={"contain"}
          alt=""
          source={{ uri: url }}
          zIndex={-99}
        />
      </LinearGradient>
    </VStack>
  );
};
export default Home;
