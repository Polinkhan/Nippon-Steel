import { StyleSheet, Text, View, Animated, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Slides } from "../constants/OnboardData";
import { FlatList } from "react-native";
import OnbordingItem from "../components/OnbordingItem";
import Paginator from "../components/Paginator";
import NextButton from "../components/NextButton";
import { useDataContext } from "../hooks/useDataContext";
import * as SecureStore from "expo-secure-store";
import { authClient } from "../Api/Client";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import { IconButton } from "react-native-paper";
import { font, mediumFont } from "../constants/SIzes";
import Colors from "../constants/Colors";
const { width, height } = Dimensions.get("window");

const Onbording = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [serverError, setServerError] = useState(false);
  const { setCurrentUser } = useDataContext();
  const [loading, setLoading] = useState(true);

  const FETCH = async () => {
    console.log(1, "requested");
    setLoading(true);
    setServerError(false);
    const state = await SecureStore.getItemAsync("onBoard");
    const token = await SecureStore.getItemAsync("accessToken");

    authClient
      .get("/", { headers: { Authorization: token } })
      .then(({ data }) => {
        setCurrentUser(data?.currentUser);
        navigation.replace("Root");
      })
      .catch((err) => {
        console.log(2, err);
        if (err?.message === "timeout of 20000ms exceeded") {
          setServerError(true);
        } else {
          JSON.parse(state) && navigation.replace("login");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    FETCH();
  }, []);

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const scrollTo = async (value) => {
    const updatedIndx = currentIndex + value;
    if (updatedIndx < Slides.length && updatedIndx > -1) {
      slidesRef.current.scrollToIndex({ index: updatedIndx });
    }
  };

  if (serverError) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingVertical: height / 5,
        }}
      >
        <StatusBar animated style="dark" />
        <IconButton
          icon={"restore"}
          size={width / 12}
          onPress={FETCH}
          style={{ backgroundColor: Colors.light.tintOpacity }}
        />
        <Text style={{ ...mediumFont, textAlign: "center" }}>
          {"Error 408! Connection timeout!!\nClick to retry"}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: "#fff" }]}>
      <StatusBar animated style="dark" />
      {!loading ? (
        <>
          <View style={{ flex: 3 }}>
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
              data={Slides}
              keyExtractor={({ id }) => id}
              renderItem={({ item }) => <OnbordingItem item={item} />}
            />
          </View>
          <Paginator data={Slides} scrollX={scrollX} />
          <NextButton
            scrollTo={scrollTo}
            percentage={(currentIndex + 1) * (100 / Slides.length)}
          />
        </>
      ) : (
        <View style={styles.container}>
          <LottieView
            autoPlay
            style={{ width: 150, height: 150 }}
            source={require("../assets/lottie/DefaultLoading.json")}
          />
        </View>
      )}
    </View>
  );
};

export default Onbording;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
