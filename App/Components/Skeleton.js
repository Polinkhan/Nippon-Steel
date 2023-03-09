import { View, Text, Animated, StyleSheet, useColorScheme } from "react-native";
import React, { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Color } from "../Healpers/Colors";

const Skeleton = ({ width, height, style }) => {
  const translateX = useRef(new Animated.Value(-width)).current;
  const colorScheme = useColorScheme();

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        useNativeDriver: true,
        duration: 1000,
      })
    ).start();
  }, [width]);

  return (
    <View
      style={StyleSheet.flatten([
        {
          width: width,
          height: height,
          backgroundColor: Color[colorScheme].bar,
          overflow: "hidden",
          borderRadius: 16,
        },
        style,
      ])}
    >
      <Animated.View
        style={{
          width: "100%",
          height: "100%",

          transform: [{ translateX: translateX }],
        }}
      >
        <LinearGradient
          style={{ width: "100%", height: "100%" }}
          colors={["transparent", "rgba(0,0,0,0.05)", "transparent"]}
          start={{ x: 1, y: 1 }}
        />
      </Animated.View>
    </View>
  );
};

export default Skeleton;
