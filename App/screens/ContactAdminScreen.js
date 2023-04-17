import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import Colors from "../constants/Colors";
import { Linking } from "react-native";
import { font } from "../constants/SIzes";
import { dbClient } from "../Api/Client";
const { width, height } = Dimensions.get("window");

const ContactAdminScreen = () => {
  const [btnWidth, setBtnWidth] = useState(width - width / 12.5);
  const [data, setData] = useState([]);

  useEffect(() => {
    dbClient.get("adminContactList").then((res) => {
      setData(res.data);
    });
  }, []);

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
          size={width / 20}
          onPress={() => setBtnWidth(width - width / 12.5)}
          style={{ marginVertical: 0 }}
        />
        <IconButton
          icon="view-grid"
          iconColor={Colors.light.tint}
          size={width / 20}
          onPress={() => setBtnWidth((width - width / 10) / 2)}
          style={{ marginVertical: 0 }}
        />
      </View>
      <View style={styles.manuBox}>
        {data.map((item, i) => (
          <CustomButton key={i} item={item} btnWidth={btnWidth} />
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
            if (_ === "ID" || _ === "src") return;
            return (
              <Text key={i} numberOfLines={1} style={styles.manuText}>
                {item[_]}
              </Text>
            );
          })}
        </View>
        <IconButton
          size={width / 15}
          icon={"account"}
          style={{ backgroundColor: Colors.light.tintOpacity }}
        />
      </View>

      <View style={styles.btnBox}>
        <IconButton
          icon="phone"
          iconColor={Colors.light.tint}
          size={width / 20}
          onPress={() => Linking.openURL(`tel:${item.Number}`)}
          style={{ margin: 0 }}
        />
        <IconButton
          icon="email-outline"
          iconColor={Colors.light.tint}
          size={width / 20}
          onPress={() => Linking.openURL(`mailto:${item.Email}`)}
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
    padding: width / 25,
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
    ...font,
  },
  btnBox: {
    marginTop: 5,
    flexDirection: "row",
  },
});
