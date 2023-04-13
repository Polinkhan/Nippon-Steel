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
import React, { useEffect, useRef, useState } from "react";
import Colors from "../constants/Colors";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconButton } from "react-native-paper";
import { useDataContext } from "../hooks/useDataContext";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as secureStore from "expo-secure-store";
import { font, largeFont } from "../constants/SIzes";
const { width, height } = Dimensions.get("window");
console.log(height);

const HomeScreen = () => {
  const { currentUser } = useDataContext();
  console.log(currentUser);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const [pdfHistory, setPdfHistory] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      slidesRef.current.scrollToIndex({ index: index });
      index = (index + 1) % 3;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    (async () => {
      const pdfViewed =
        JSON.parse(await secureStore.getItemAsync("pdfViewed")) || [];
      setPdfHistory(pdfViewed);
    })();
  }, []);

  return (
    <View style={styles.container}>
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

          <IconButton
            size={32}
            icon={"account"}
            style={{ backgroundColor: "#ddd" }}
          />
        </View>
      </LinearGradient>
      <View style={{ flex: 5 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={[styles.body, { flex: 1, marginBottom: 30 }]}>
            <FlatList
              horizontal
              pagingEnabled
              bounces={false}
              ref={slidesRef}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                {
                  useNativeDriver: false,
                }
              )}
              showsHorizontalScrollIndicator={false}
              data={data}
              keyExtractor={({ id }) => id}
              renderItem={({ item, index }) => {
                return <Card item={item} />;
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              elevation: 2,
              paddingVertical: width / 10,
              borderRadius: 12,
              marginBottom: width / 20,
              alignItems: "center",
            }}
          >
            <Text
              style={{ paddingHorizontal: width / 20, fontFamily: "Poppins" }}
            >
              Recently Viewed Documents
            </Text>
            {pdfHistory.map((item, i) => (
              <PDFCard key={i} item={item} />
            ))}
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
          backgroundColor: "blue",
          width: "100%",
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
            width: "100%",
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
    paddingHorizontal: 10,
  },
  body: {
    alignItems: "center",
  },

  innerCard: {
    height: width / 2,
    width: width - (width / 30) * 2,
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

const recentViewedPdfData = [
  { type: "Payslip", month: "Jan", year: "23" },
  { type: "Payslip", month: "Jan", year: "23" },
  { type: "Payslip", month: "Jan", year: "23" },
];
