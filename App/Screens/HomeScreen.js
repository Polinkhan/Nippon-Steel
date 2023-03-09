import { StyleSheet, useColorScheme } from "react-native";
import React from "react";
import { BoldText, HStack, Input, Text, VStack } from "../Components/Elements";
import Avater from "../Components/Avater";
import { Searchbar } from "react-native-paper";
import { Color } from "../Healpers/Colors";
import { useDataContext } from "../Contexts/DataContext";

const HomeScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const { currentUser } = useDataContext();
  return (
    <VStack style={styles.container}>
      <HStack style={styles.header}>
        <VStack style={{ justifyContent: "space-between" }}>
          <BoldText style={{ fontSize: 24 }}>Welcome,</BoldText>
          <Text style={{ paddingVertical: 4, color: "gray" }}>
            {currentUser.Name}
          </Text>
        </VStack>
        <Avater
          onPress={() => navigation.navigate("stack", { screen: "profile" })}
        />
      </HStack>
      <VStack>
        {/* <Input label={"search"} /> */}
        <Searchbar style={{ backgroundColor: Color[colorScheme].bar }} />
        <Text style={{ padding: 4, fontSize: 16 }}>
          Recenctly Viewed Documents
        </Text>
      </VStack>
    </VStack>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    // backgroundColor: "red",
  },
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  test: {
    color: "red",
  },
});
