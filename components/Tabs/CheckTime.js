import { Button, Center, useToast, VStack } from "native-base";
import Picker from "../Picker";
import { useState } from "react";
import { useDataContext } from "../../contexts/DataContext";
import { getDownloadURL, list } from "firebase/storage";

const CheckTime = ({ navigation }) => {
  const { requestforPdf, setPdfList } = useDataContext();
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [btnLoad, setBtnLoad] = useState(false);
  const toast = useToast();

  const handleRequst = () => {
    setBtnLoad(true);
    const list = [];
    requestforPdf(year, month)
      .then((res) => {
        if (res.items.length === 0) {
          toast.show({
            description: "Directory Not Found !!",
          });
        } else {
          //
        }
        res.items.forEach((item) => {
          getDownloadURL(item)
            .then((url) => {
              list.push(url);
            })
            .finally(() => {
              if (res.items.length === list.length) {
                setPdfList(list);
                navigation.navigate("service");
              }
              setBtnLoad(false);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setBtnLoad(false);
      });
  };

  return (
    <VStack
      h={"100%"}
      bg={"white"}
      justifyContent={"center"}
      alignItems={"center"}
      space={40}
    >
      <VStack space={6}>
        <Picker name={"year"} value={year} setValue={setYear} />
        <Picker name={"month"} value={month} setValue={setMonth} />
      </VStack>

      <Button
        w={"70%"}
        h={12}
        borderRadius={"full"}
        colorScheme={"blue"}
        _text={{ fontSize: "xl", fontFamily: "Nunito-SemiBold" }}
        onPress={handleRequst}
        isLoading={btnLoad}
      >
        View
      </Button>
    </VStack>
  );
};

export default CheckTime;
