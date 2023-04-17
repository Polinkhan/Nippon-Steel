import React, { useEffect, useRef, useState } from "react";
import Pdf from "react-native-pdf";
import {
  StyleSheet,
  Dimensions,
  View,
  Animated,
  Platform,
  Text,
  ToastAndroid,
} from "react-native";
import { Circle, G, Svg } from "react-native-svg";
import Colors from "../constants/Colors";
import { FAB, IconButton } from "react-native-paper";
// import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { font } from "../constants/SIzes";
import { Toast } from "react-native-toast-message/lib/src/Toast";
const { width, height } = Dimensions.get("window");

const PDFViewerScreen = ({ route }) => {
  const size = 100;
  const strokeWidth = 4;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progess = useRef(new Animated.Value(0)).current;
  const progessRef = useRef(null);

  const [loadComplete, setLoadComplete] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const { data } = route.params;
  const source = { uri: data.fileUrl };

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

  const share = async () => {
    const { uri } = await FileSystem.downloadAsync(
      data.fileUrl,
      FileSystem.documentDirectory + "Share_Document.pdf"
    );
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const callback = (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setDownloadProgress(progress);
  };

  const downloadResumable = FileSystem.createDownloadResumable(
    data.fileUrl,
    FileSystem.documentDirectory + "Document.pdf",
    {},
    callback
  );

  const saveAndroidFile = async () => {
    {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        return;
      }
      const { uri } = await downloadResumable.downloadAsync();

      try {
        const fileString = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          data.name,
          "application/pdf"
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, fileString, {
              encoding: FileSystem.EncodingType.Base64,
            });
            Toast.show({
              type: "success",
              text1: "File downloaded Successfully",
            });
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => setDownloadProgress(0));
      } catch (e) {
        throw new Error(e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        maxScale={5}
        trustAllCerts={false}
        onLoadComplete={(numberOfPages, filePath) => {
          setLoadComplete(true);
          // console.log(`Number of pages: ${numberOfPages}`);
        }}
        // onPageChanged={(page, numberOfPages) => {
        //   console.log(`Current page: ${page}`);
        // }}
        // onError={(error) => {
        //   console.log(error);
        // }}
        // onPressLink={(uri) => {
        //   console.log(`Link pressed: ${uri}`);
        // }}
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
      {loadComplete && (
        <>
          <FAB
            icon="download"
            style={[styles.fab, { right: 0, bottom: 0 }]}
            onPress={Platform.OS === "ios" ? share : saveAndroidFile}
            color="#fff"
          />
          <FAB
            icon="share-variant-outline"
            style={[styles.fab, { right: 70, bottom: 0 }]}
            color="#fff"
            onPress={share}
          />
          {downloadProgress !== 0 && (
            <View
              style={[
                styles.downloading,
                {
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <IconButton
                icon={"download"}
                style={{ margin: 0 }}
                iconColor="#fff"
              />
              <Text style={{ ...font, color: "#fff" }}>
                {parseInt(downloadProgress * 100)}%
              </Text>
            </View>
          )}
        </>
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
  downloading: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  fab: {
    position: "absolute",
    borderRadius: 999,
    margin: 16,
    backgroundColor: Colors.light.tint,
  },
});
