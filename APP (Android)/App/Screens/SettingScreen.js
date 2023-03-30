import { StyleSheet } from "react-native";
import React from "react";
import { HStack, Text, VStack } from "../Components/Elements";
import Avater from "../Components/Avater";
import { Divider } from "react-native-paper";
import MenuButton from "../Components/MenuButton";
import { SettingsList } from "../Healpers/StaticData";
import { MaterialIcons } from "@expo/vector-icons";
import { useDataContext } from "../Contexts/DataContext";
import * as SecureStore from "expo-secure-store";

const SettingScreen = ({ navigation }) => {
  const { setCurrentUser, currentUser } = useDataContext();
  return (
    <VStack style={styles.container}>
      <HStack>
        <Avater />
        <VStack style={styles.headerText}>
          <Text style={{ fontFamily: "boldPop", fontSize: 20 }}>
            {currentUser.Name}
          </Text>
          <Text style={{ color: "gray" }}>{currentUser.Email}</Text>
        </VStack>
      </HStack>
      <Divider style={{ marginVertical: 20 }} />
      {SettingsList.map((elem, i) => (
        <MenuButton
          key={i}
          data={elem}
          onPress={() => navigation.navigate("stack", { screen: elem.route })}
        />
      ))}
      <MenuButton
        data={{ label: "log Out", iconProvider: MaterialIcons, icon: "logout" }}
        onPress={async () => {
          await SecureStore.deleteItemAsync("accessToken");
          setCurrentUser(null);
        }}
      />
    </VStack>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  headerText: {
    flex: 1,
    paddingLeft: 20,
    justifyContent: "space-around",
  },
});
