import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Slides } from "../constants/OnboardData";
import { FlatList } from "react-native";
import OnbordingItem from "../components/OnbordingItem";
import Paginator from "../components/Paginator";
import NextButton from "../components/NextButton";
import { useDataContext } from "../hooks/useDataContext";
import * as SecureStore from "expo-secure-store";
import { authClient } from "../Api/Client";
import { ToastAndroid } from "react-native";

const Onbording = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { currentUser, setCurrentUser } = useDataContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const state = await SecureStore.getItemAsync("onBoard");
      const token = await SecureStore.getItemAsync("accessToken");
      try {
        const res = await authClient.get("/", {
          headers: { Authorization: token },
        });
        setCurrentUser(res?.data?.currentUser);
        JSON.parse(state) && navigation.replace("Root");
      } catch (err) {
        JSON.parse(state) && navigation.replace("login");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const scrollTo = async () => {
    if (currentIndex < Slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      await SecureStore.setItemAsync("onBoard", JSON.stringify(true));
      navigation.replace(currentUser ? "Root" : "login");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: "#fff" }]}>
      {!loading && (
        <>
          <View style={{ flex: 3 }}>
            <FlatList
              horizontal
              pagingEnabled
              data={Slides}
              bounces={false}
              ref={slidesRef}
              keyExtractor={({ id }) => id}
              renderItem={({ item }) => <OnbordingItem item={item} />}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                {
                  useNativeDriver: false,
                }
              )}
              onViewableItemsChanged={viewableItemsChanged}
              showsHorizontalScrollIndicator={false}
              viewabilityConfig={viewConfig}
            />
          </View>
          <Paginator data={Slides} scrollX={scrollX} />
          <NextButton
            scrollTo={scrollTo}
            percentage={(currentIndex + 1) * (100 / Slides.length)}
          />
        </>
      )}
    </View>
  );
};

export default Onbording;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
