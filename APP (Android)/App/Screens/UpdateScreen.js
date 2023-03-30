import { ActivityIndicator, StyleSheet, useColorScheme } from "react-native";
import React, { useEffect, useState } from "react";
import { HStack, Text, VStack } from "../Components/Elements";
import { Color } from "../Healpers/Colors";

const UpdateScreen = () => {
  const [timedOut, setTimedOut] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    setTimeout(() => {
      setTimedOut(true);
    }, 3000);
  }, []);

  return (
    <VStack style={styles.container}>
      <HStack>
        <Text style={{ padding: 10 }}>
          {timedOut
            ? "The latest version has already installed"
            : "Checking For Update"}
        </Text>
        {!timedOut && (
          <ActivityIndicator
            animating={true}
            color={Color[colorScheme].text}
            size={16}
          />
        )}
      </HStack>
    </VStack>
  );
};

export default UpdateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
