import {
  View,
  StyleSheet,
  useColorScheme,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { HStack, Text, VStack } from "../Components/Elements";
import Avater from "../Components/Avater";
import { Divider } from "react-native-paper";
import { Color } from "../Healpers/Colors";
import Skeleton from "../Components/Skeleton";
import { client } from "../Api/Client";
import { useDataContext } from "../Contexts/DataContext";

const MyProfileScreen = () => {
  const [data, setData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const { currentUser } = useDataContext();

  useEffect(() => {
    (async () => {
      const res = await client.get(`db/myprofile/${currentUser.UserID}`);
      const { data } = res.data;
      setData(data);
    })();
  }, []);

  return (
    <VStack style={styles.container}>
      <View style={styles.imgBox}>
        <Avater size={80} />
      </View>
      <Divider style={{ marginVertical: 16 }} />
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
      <Text style={{ flex: 0.25 }}>{elem.key}</Text>
      <Text style={{ flex: 0.1 }}>:</Text>
      <Text style={{ flex: 0.65 }}>{elem.value}</Text>
    </View>
  ) : (
    <Skeleton height={60} width={width} style={{ marginVertical: 10 }} />
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  imgBox: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    height: 60,
    paddingHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
  },
});
