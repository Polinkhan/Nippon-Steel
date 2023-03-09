import {
  View,
  StyleSheet,
  useColorScheme,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { HStack, Text, VStack } from "../Components/Elements";
import { Color } from "../Healpers/Colors";
import Skeleton from "../Components/Skeleton";
import { client } from "../Api/Client";
import { Fontisto, Ionicons } from "@expo/vector-icons";

const ContactScreen = () => {
  const [data, setData] = useState([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    (async () => {
      const res = await client.get("db/contacts/all");
      const { data } = res.data;
      setData(data);
    })();
  }, []);

  return (
    <VStack style={styles.container}>
      <ScrollView style={{ flex: 0.8 }} showsVerticalScrollIndicator={false}>
        {data.map((elem, i) => (
          <List key={i} elem={elem} />
        ))}
      </ScrollView>
    </VStack>
  );
};

const List = ({ elem }) => {
  const colorScheme = useColorScheme();
  const width = Dimensions.get("window").width - 40;

  return elem ? (
    <View
      style={[
        styles.listContainer,
        { backgroundColor: Color[colorScheme].bar },
      ]}
    >
      <VStack style={{ backgroundColor: Color[colorScheme].bar, flex: 0.65 }}>
        <Text numberOfLines={1} style={{ fontFamily: "boldPop", fontSize: 16 }}>
          {elem.Name}
        </Text>
        <Text numberOfLines={1} style={{ color: "gray", fontSize: 14 }}>
          {elem.Email}
        </Text>
        <Text numberOfLines={1} style={{ color: "gray", fontSize: 14 }}>
          {elem.Tel}
        </Text>
      </VStack>
      {/* <Divider /> */}
      <HStack
        style={{
          backgroundColor: Color[colorScheme].bar,

          flex: 0.35,
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={[styles.icon, { backgroundColor: Color[colorScheme].primary }]}
          onPress={() => Linking.openURL(`mailto:${elem.Email}`)}
        >
          <Fontisto name="email" color={Color[colorScheme].text} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.icon, { backgroundColor: Color[colorScheme].primary }]}
          onPress={() => Linking.openURL(`tel:${elem.Tel}`)}
        >
          <Ionicons
            name="call-outline"
            color={Color[colorScheme].text}
            size={20}
          />
        </TouchableOpacity>
      </HStack>
    </View>
  ) : (
    <Skeleton height={100} width={width} style={{ marginVertical: 10 }} />
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "space-between",
  },
  imgBox: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    height: 100,
    padding: 20,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
  },
  icon: {
    padding: 14,
    borderRadius: 14,
  },
});
