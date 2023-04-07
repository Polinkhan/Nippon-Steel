import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import Colors from "../constants/Colors";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const spacing = 10;
const Item_Size = width * 0.8;
const Spacer_Size = (width - Item_Size) / 2;

const HomeScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

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
      <View style={styles.body}>
        <Animated.FlatList
          style={{ flexGrow: 0 }}
          horizontal
          data={data}
          // pagingEnabled
          decelerationRate={0}
          snapToInterval={Item_Size}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          keyExtractor={({ id }) => id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 2) * Item_Size,
              (index - 1) * Item_Size,
              index * Item_Size,
            ];
            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [0, -30, 0],
            });
            if (!item.url) return <View style={{ width: Spacer_Size }} />;
            return <Card item={item} translateY={translateY} />;
          }}
        />
      </View>
    </View>
  );
};

const Card = ({ item, translateY }) => {
  return (
    <View style={{ height: 260, width: Item_Size, justifyContent: "center" }}>
      <Animated.View
        style={[styles.innerCard, { transform: [{ translateY }] }]}
      >
        <LinearGradient
          style={{
            flex: 1,
            width: "100%",
            borderRadius: 8,
            overflow: "hidden",
          }}
          colors={["#000", "transparent"]}
          start={{ x: 1, y: 1 }}
          end={{ x: 1, y: 0.5 }}
        >
          <Image
            source={{ uri: item.url }}
            style={{
              width: "100%",
              height: "100%",
              zIndex: -1,
            }}
          />
          <Text
            style={{
              position: "absolute",
              bottom: 0,
              color: "#ddd",
              fontFamily: "Poppins",
              right: 10,
              bottom: 5,
            }}
          >
            Nippon Steel Engineering
          </Text>
        </LinearGradient>
      </Animated.View>
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
    flex: 3,
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
    marginHorizontal: spacing,
    padding: spacing / 2,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5,
  },
});

const data = [
  {
    id: 1,
  },
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
  {
    id: 5,
  },
];
