import {
  Animated,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Colors from "../constants/Colors";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button, IconButton } from "react-native-paper";
import { useDataContext } from "../hooks/useDataContext";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as secureStore from "expo-secure-store";
import { font, largeFont } from "../constants/SIzes";
import { dbClient } from "../Api/Client";
import LottieView from "lottie-react-native";
import Avater from "../assets/RNSVG/Avater";
const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const { currentUser } = useDataContext();
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const [pdfHistory, setPdfHistory] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (imageData) {
        slidesRef.current.scrollToIndex({ index: index });
        index = (index + 1) % imageData.length;
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [imageData]);

  const pdfHistoryFetch = async () => {
    const pdfViewed =
      JSON.parse(await secureStore.getItemAsync("pdfViewed")) || [];
    setPdfHistory(pdfViewed);
  };

  useEffect(() => {
    pdfHistoryFetch();
  }, []);

  useEffect(() => {
    dbClient.get("dashboardPicture").then(({ data }) => {
      setImageData(data);
    });
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    pdfHistoryFetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View View style={styles.container}>
      <LinearGradient
        style={styles.header}
        colors={["#2b5876", "#243b55"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={[styles.headerTextBox, { flex: 1 }]}>
          <View>
            <Text style={{ ...largeFont, color: "#fff" }}>
              Hello , {currentUser.FullName}
            </Text>
            <Text style={{ ...font, color: "#fff" }}>{currentUser.Title}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={{ backgroundColor: "#fff", padding: 2, borderRadius: 999 }}
            onPress={() =>
              navigation.navigate("profile", { name: "View Profile" })
            }
          >
            <Avater />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View
        style={{
          width: "100%",
          flex: 5,
          // justifyContent: "space",
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={[styles.body, { flex: 1, marginBottom: 30 }]}>
            {imageData ? (
              <FlatList
                horizontal
                pagingEnabled
                ref={slidesRef}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  {
                    useNativeDriver: false,
                  }
                )}
                showsHorizontalScrollIndicator={false}
                data={imageData}
                keyExtractor={({ id }) => id}
                renderItem={({ item, index }) => {
                  return <Card item={item} />;
                }}
              />
            ) : (
              <LottieView
                autoPlay
                style={{ width: width / 5 }}
                source={require("../assets/lottie/DefaultLoading.json")}
              />
            )}
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              elevation: 1,
              paddingVertical: width / 20,
              borderRadius: 12,
              marginBottom: width / 20,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                padding: width / 50,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ paddingHorizontal: width / 20, fontFamily: "Poppins" }}
              >
                Recently Viewed Documents
              </Text>
              <Button
                labelStyle={{ ...font, color: "#000" }}
                onPress={async () => {
                  await secureStore.deleteItemAsync("pdfViewed");
                  pdfHistoryFetch();
                }}
              >
                Clear
              </Button>
            </View>
            {pdfHistory.length === 0 ? (
              <View style={{ paddingVertical: width / 20 }}>
                <Text style={{ ...font, color: "gray" }}>Empty History</Text>
              </View>
            ) : (
              pdfHistory.map((item, i) => <PDFCard key={i} item={item} />)
            )}
            <Text
              style={{
                color: "gray",
                marginTop: width / 30,
                ...font,
                fontSize: width / 35,
              }}
            >
              Pull Down to refresh ↓
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const Card = ({ item }) => {
  return (
    <TouchableOpacity style={styles.innerCard} activeOpacity={0.9}>
      <LinearGradient
        style={{
          borderRadius: 8,
          overflow: "hidden",
        }}
        colors={["#000", "transparent"]}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0.9 }}
      >
        <Image
          source={{ uri: item.url }}
          style={{
            height: "100%",
            zIndex: -1,
          }}
        />
        <Text style={styles.cardText}>Nippon Steel Engineering</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const PDFCard = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        // paddingHorizontal: width / 30,
        paddingVertical: width / 50,
        width: "90%",
      }}
      onPress={() => {
        navigation.navigate("searchAnimation", item);
      }}
      activeOpacity={0.8}
    >
      <LinearGradient
        style={{
          backgroundColor: "#fff",
          flexDirection: "row",
          alignItems: "center",
          elevation: 2,
          borderRadius: 8,
        }}
        colors={["#4568dc", "#b06ab3"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <IconButton
          iconColor={"#fff"}
          size={32}
          icon={"file-pdf-box"}
          style={{ margin: 0 }}
        />
        <Text style={{ fontFamily: "Poppins", top: 2, color: "#fff" }}>
          {item.month} {item.year} ({item.type})
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: width / 25,
    paddingBottom: width / 10,
  },
  header: {
    flex: 1,
    width: "100%",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  headerTextBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width / 30,
  },
  body: {
    height: width / 2,
    alignItems: "center",
    justifyContent: "center",
  },

  innerCard: {
    width: width - (width / 25) * 2,
  },
  cardText: {
    position: "absolute",
    bottom: 0,
    color: "#ddd",
    fontFamily: "Poppins",
    right: 10,
    bottom: 5,
  },
});

const data = [
  {
    id: 2,
    name: "",
    url: "https://www.eng.nipponsteel.com/english/globalnetwork/upload/images/singapore-02_01.jpg",
  },
  {
    id: 3,
    name: "",
    url: "https://www.eng.nipponsteel.com/english/whatwedo/upload/images/Kuroshio1-1.jpg",
  },
  {
    id: 4,
    name: "",
    url: "https://www.eng.nipponsteel.com/english/whatwedo/upload/images/4-1-2_01.jpg",
  },
];
