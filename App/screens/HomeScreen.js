import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import Colors from "../constants/Colors";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconButton } from "react-native-paper";

const { width } = Dimensions.get("window");

const spacing = 10;
const Item_Size = width;

const HomeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const scrollTo = async (value) => {
    const updatedIndx = currentIndex + value;
    if (updatedIndx < data.length && updatedIndx > -1) {
      slidesRef.current.scrollToIndex({ index: updatedIndx });
    }
    console.log(value);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.header}
        colors={["#2b5876", "#243b55"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerTextBox}>
          <View>
            <Text
              style={{ fontFamily: "PoppinsBold", color: "#fff", fontSize: 24 }}
            >
              Hello , {"User"}
            </Text>
            <Text
              style={{ fontFamily: "Poppins", color: "#fff", fontSize: 18 }}
            >
              {"Job Title"}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#f2f2f2",
              height: 65,
              width: 65,
              borderRadius: 999,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>I</Text>
          </View>
        </View>
        <View style={styles.headerInnerBox}></View>
      </LinearGradient>
      <View style={{ flex: 3, paddingBottom: 50, justifyContent: "flex-end" }}>
        <View style={styles.body}>
          <IconButton
            icon="chevron-left"
            iconColor={Colors.light.tint}
            size={24}
            style={{ margin: 5, width: 40, height: "60%" }}
            onPress={() => {
              scrollTo(-1);
            }}
          />
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
            onViewableItemsChanged={viewableItemsChanged}
            showsHorizontalScrollIndicator={false}
            viewabilityConfig={viewConfig}
            data={data}
            keyExtractor={({ id }) => id}
            renderItem={({ item, index }) => {
              return <Card item={item} />;
            }}
          />
          <IconButton
            icon="chevron-right"
            iconColor={Colors.light.tint}
            size={24}
            style={{ margin: 5, width: 40, height: "60%" }}
            onPress={() => {
              scrollTo(1);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const Card = ({ item }) => {
  return (
    <View style={styles.innerCard}>
      <LinearGradient
        style={{ width: "100%", borderRadius: 8, overflow: "hidden" }}
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
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 1,
    width: width - 32,
    borderRadius: 16,
    margin: 16,
    padding: 16,
  },
  headerTextBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  body: {
    // flex: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headerInnerBox: {
    height: 60,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    elevation: 5,
  },

  innerCard: {
    height: 200,
    width: width - 100,
    paddingHorizontal: 5,
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
