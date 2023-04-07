import React, { useEffect, useRef, useState } from "react";
import Pdf from "react-native-pdf";
import { StyleSheet, Dimensions, View, Animated } from "react-native";
import { Circle, G, Svg } from "react-native-svg";
import Colors from "../constants/Colors";

const PDFViewerScreen = () => {
  const size = 100;
  const strokeWidth = 4;
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
    progess.addListener((value) => {
      const strokeDashoffset = circumference - circumference * value.value;
      if (progessRef?.current) {
        progessRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    }, []);
    return () => {
      progess?.removeAllListeners();
    };
  }, []);

  const [loadComplete, setLoadComplete] = useState(false);

  const source = {
    uri: "http://samples.leanpub.com/thereactnativebook-sample.pdf",
    // cache: true,
  };
  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        trustAllCerts={false}
        onLoadComplete={(numberOfPages, filePath) => {
          setLoadComplete(true);
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
        onLoadProgress={(e) => {
          animation(e);
        }}
      />
      {!loadComplete && (
        <View style={styles.loading}>
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
                stroke={Colors.light.tint}
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
              />
            </G>
          </Svg>
        </View>
      )}
    </View>
  );
};

export default PDFViewerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    // marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  loading: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -50 }],
  },
});
