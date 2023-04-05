import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { TouchableOpacity, Animated } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Svg, { G, Circle } from "react-native-svg";
import Colors from "../constants/Colors";

const NextButton = ({ percentage, scrollTo }) => {
  const size = 100;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progess = useRef(new Animated.Value(0)).current;
  const progessRef = useRef(null);

  const animation = (toValue) => {
    return Animated.timing(progess, {
      toValue,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progess.addListener(
      (value) => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;
        if (progessRef?.current) {
          progessRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [percentage]
    );

    return () => {
      progess.removeAllListeners();
    };
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation={"-90"} origin={center}>
          <Circle
            stroke={"#E6E7E8"}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progessRef}
            stroke={Colors.light.primary}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.6}
        onPress={scrollTo}
      >
        <AntDesign name="arrowright" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    position: "absolute",
    backgroundColor: Colors.light.primary,
    padding: 16,
    borderRadius: 100,
  },
});
