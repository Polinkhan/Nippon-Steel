import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { IconButton } from "react-native-paper";
import { useWindowDimensions } from "react-native";
import Colors from "../constants/Colors";
import { Linking } from "react-native";

const ContactAdminScreen = () => {
  const { width } = useWindowDimensions();
  const [btnWidth, setBtnWidth] = useState((width - 30) / 2);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <IconButton
          icon="format-list-bulleted"
          iconColor={Colors.light.tint}
          size={20}
          onPress={() => setBtnWidth(width - 20)}
          style={{ marginVertical: 0 }}
        />
        <IconButton
          icon="view-grid"
          iconColor={Colors.light.tint}
          size={20}
          onPress={() => setBtnWidth((width - 30) / 2)}
          style={{ marginVertical: 0 }}
        />
      </View>
      <View style={styles.manuBox}>
        {data.map((item) => (
          <CustomButton key={item.id} item={item} btnWidth={btnWidth} />
        ))}
      </View>
    </View>
  );
};

const CustomButton = ({ item, btnWidth }) => {
  return (
    <View style={[styles.manuContainer, { width: btnWidth }]}>
      <View style={styles.manuItem}>
        <View style={{ flex: 1 }}>
          {Object.keys(item).map((_, i) => {
            if (_ === "id" || _ === "src") return;
            return (
              <Text key={i} numberOfLines={1} style={styles.manuText}>
                {item[_]}
              </Text>
            );
          })}
        </View>
        <View
          style={{
            backgroundColor: Colors.light.tintOpacity,
            padding: 10,
            borderRadius: 999,
            height: 50,
          }}
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={{
              uri: "http://www.eventfulnigeria.com/wp-content/uploads/2021/04/Avatar-PNG-Free-Download.png",
            }}
          />
        </View>
      </View>
      <View style={styles.btnBox}>
        <IconButton
          icon="phone"
          iconColor={Colors.light.tint}
          size={20}
          onPress={() => Linking.openURL(`tel:${item.number}`)}
          style={{ margin: 0 }}
        />
        <IconButton
          icon="email-outline"
          iconColor={Colors.light.tint}
          size={20}
          onPress={() => Linking.openURL(`mailto:${item.email}`)}
          style={{ margin: 0 }}
        />
      </View>
    </View>
  );
};

export default ContactAdminScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  manuBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    flex: 2,
  },
  manuContainer: {
    marginTop: 10,
    borderRadius: 8,
    padding: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 1,
  },
  manuItem: {
    flexDirection: "row",
  },
  manuText: {
    color: "gray",
    fontFamily: "Poppins",
  },
  btnBox: {
    marginTop: 10,
    flexDirection: "row",
  },
});

const data = [
  {
    id: 1,
    name: "Admin-1",
    number: "123456789",
    email: "admin@nse.co",
    src: "",
  },
  {
    id: 2,
    name: "Admin-2",
    number: "123456789",
    email: "admin@nse.co",
    src: "",
  },
  {
    id: 3,
    name: "Admin-3",
    number: "123456789",
    email: "admin@nse.co",
    src: "",
  },
  {
    id: 4,
    name: "Admin-4",
    number: "123456789",
    email: "admin@nse.co",
    src: "",
  },
];
