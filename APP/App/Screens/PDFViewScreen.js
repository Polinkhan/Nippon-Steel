import { View, StyleSheet, Dimensions, useColorScheme } from "react-native";
import { FAB, Portal, Provider } from "react-native-paper";
import React, { useState } from "react";
import { shareAsync } from "expo-sharing";
import PDFReader from "rn-pdf-reader-js";
import * as FileSystem from "expo-file-system";
import { Text } from "../Components/Elements";
import { Color } from "../Healpers/Colors";

const PDFViewScreen = ({ route }) => {
  const { fileUrl } = route.params;
  const [state, setState] = useState({ open: false });
  const [downloadProgress, setDownloadProgress] = useState(0);
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const colorScheme = useColorScheme();

  const share = async () => {
    const { uri } = await FileSystem.downloadAsync(
      fileUrl,
      FileSystem.documentDirectory + "Share_Document.pdf"
    );
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

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
          "Document",
          "application/pdf"
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, fileString, {
              encoding: FileSystem.EncodingType.Base64,
            });
            alert("Download Successfull");
          })
          .catch((e) => {})
          .finally(() => setDownloadProgress(0));
      } catch (e) {
        throw new Error(e);
      }
    }
  };

  const callback = (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setDownloadProgress(progress);
  };

  const downloadResumable = FileSystem.createDownloadResumable(
    fileUrl,
    FileSystem.documentDirectory + "Document.pdf",
    {},
    callback
  );

  return (
    <Provider>
      <View
        style={[
          styles.container,
          { backgroundColor: Color[colorScheme].background },
        ]}
      >
        <PDFReader
          source={{
            uri: fileUrl,
          }}
          withPinchZoom
          withScroll
          customStyle={{
            readerContainerZoomContainerButton: styles.fab,
          }}
        />

        <Portal>
          <FAB.Group
            open={open}
            visible
            icon={open ? "close" : "menu"}
            actions={[
              {
                icon: "share",
                label: "Share",
                onPress: share,
              },
              {
                icon: "download",
                label: "Download",
                onPress: saveAndroidFile,
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
        <View style={styles.download}>
          {downloadProgress !== 0 && (
            <Text style={{ color: "white" }}>{`Downloading : ${
              parseInt(downloadProgress) * 100
            }%`}</Text>
          )}
        </View>
      </View>
    </Provider>
  );
};

export default PDFViewScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    display: "none",
  },
  download: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});
