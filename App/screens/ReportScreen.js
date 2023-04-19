import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { font } from "../constants/SIzes";
import { Button, TextInput } from "react-native-paper";
import Colors from "../constants/Colors";
import { useDataContext } from "../hooks/useDataContext";
import { useState } from "react";
import { dbClient } from "../Api/Client";
const { width, height } = Dimensions.get("window");

const ReportScreen = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState();
  const [isSubmitted, setSubmitted] = useState(false);
  const { currentUser } = useDataContext();
  const { UserID } = currentUser;

  const handleSubmit = () => {
    setError();
    if (subject || description) {
      dbClient
        .post("reportProblem", { UserID, subject, description, data })
        .then(() => setSubmitted(true))
        .catch((err) => {});
    } else {
      setError("Fillup atleast one field");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          height: height * (1 / 3),
          width: "100%",
          justifyContent: "space-around",
          marginBottom: width / 20,
        }}
      >
        <TextInput
          mode="outlined"
          activeOutlineColor={Colors.light.tint}
          label={"Subject"}
          disabled={isSubmitted}
          style={{ backgroundColor: "#f2f2f2" }}
          onChangeText={(text) => setSubject(text)}
        />
        <TextInput
          mode="outlined"
          activeOutlineColor={Colors.light.tint}
          multiline={true}
          disabled={isSubmitted}
          label={"Tell us about the problem"}
          numberOfLines={4}
          style={{ backgroundColor: "#f2f2f2" }}
          onChangeText={(text) => setDescription(text)}
        />
        {error && (
          <Text style={{ ...font, textAlign: "right", color: "#DB4437" }}>
            {error}
          </Text>
        )}
        <Button
          mode="contained"
          disabled={isSubmitted}
          buttonColor={Colors.light.tint}
          labelStyle={{ ...font, paddingVertical: width / 50 }}
          style={{ borderRadius: 10 }}
          onPress={handleSubmit}
        >
          {isSubmitted ? "We recieved your report" : "Submit Your Report"}
        </Button>
      </View>
      <View
        style={{
          width: "100%",
          height: height * (1 / 3),
          backgroundColor: "#fff",
          elevation: 2,
          borderRadius: 12,
          padding: width / 20,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Text
          style={{
            ...font,
            paddingVertical: width / 50,
            paddingHorizontal: width / 20,
            marginBottom: width / 50,
            backgroundColor: "#eee",
            borderRadius: 999,
          }}
        >
          Device Information
        </Text>

        {data.map(({ label, value }, i) => (
          <View key={i} style={{ flexDirection: "row" }}>
            <Text style={{ flex: 5, ...font }}>{label}</Text>
            <Text style={{ flex: 1, ...font }}>:</Text>
            <Text style={{ flex: 8, ...font }}>{value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
export default ReportScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: width / 20,
  },
});

const data = [
  {
    label: "Model",
    value:
      Platform.OS === "ios"
        ? `IPhone`
        : `${Platform.constants.Brand} (${Platform.constants.Model})`,
  },

  { label: "Device Height", value: height },
  { label: "Device Width", value: width },
  { label: "OS", value: Platform.OS },
  {
    label: Platform.OS === "ios" ? "IOS Version" : "Android Version",
    value:
      Platform.OS === "ios"
        ? Platform.constants.osVersion
        : Platform.constants.Release,
  },
  { label: "Api Version", value: Platform.constants.Version },
];
