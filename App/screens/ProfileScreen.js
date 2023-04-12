import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDataContext } from "../hooks/useDataContext";
import { dbClient } from "../Api/Client";
import React from "react";
import LottieView from "lottie-react-native";
const ProfileCard = require("../assets/lottie/profileCard.json");
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";
import Colors from "../constants/Colors";

const ProfileScreen = () => {
  const [data, setData] = useState(null);
  const { currentUser } = useDataContext();
  const { UserID } = currentUser;
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await dbClient.get(`/viewData/${UserID}`);
        setData(data);
      } catch (err) {
        console.log(err.response.data);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Image
          source={{ uri: image }}
          style={{ width: 100, height: 100, borderRadius: 999 }}
        />
        {/* <LottieView autoPlay style={{ height: 150 }} source={ProfileCard} /> */}
        <Button
          mode="contained"
          buttonColor={Colors.light.tint}
          labelStyle={{ top: 1, fontFamily: "Poppins" }}
          style={{ borderRadius: 8, borderColor: Colors.light.tint }}
          onPress={pickImage}
        >
          Upload Picture
        </Button>
      </View>

      {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}

      <View
        style={{
          width: "80%",
          borderBottomWidth: 1,
          borderColor: "#eee",
          marginBottom: 20,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        {data
          ? Object.keys(data).map((label, i) => (
              <View key={i} style={styles.item}>
                <Text numberOfLines={1} style={[styles.itemFont, { flex: 5 }]}>
                  {label}
                </Text>
                <Text style={[styles.itemFont, { flex: 1 }]}>:</Text>
                <Text numberOfLines={1} style={[styles.itemFont, { flex: 10 }]}>
                  {data[label]}
                </Text>
              </View>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
              <View key={i} style={styles.item} />
            ))}
      </ScrollView>
    </View>
  );
};
export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    marginBottom: 10,
    paddingHorizontal: 20,
    height: 60,
    alignItems: "center",
    backgroundColor: "#f2f2f5",
    elevation: 1,
    borderRadius: 8,
  },
  itemFont: {
    fontFamily: "Poppins",
    fontSize: 14,
  },
});
