import { useToast } from "native-base";
import { createContext, useContext, useEffect, useState } from "react";
import { LogBox } from "react-native";
import { fetcher } from "../utils/ApiCall";
import * as Network from "expo-network";
import * as SecureStore from "expo-secure-store";
// import * as Network from "expo-network";

export const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

LogBox.ignoreLogs(["AsyncStorage"]);
LogBox.ignoreLogs(["Setting a timer"]);

const DataContextProvider = (props) => {
  const toast = useToast();
  const appName = "Nippon Steel Engineering [Ver 1.2.2].apk";
  const [cacheData, setCacheData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [contactLists, setContactLists] = useState([]);
  const [adPictures, setSdPictures] = useState(null);
  const [selectOptions, setSelectOptions] = useState({
    month: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    year: ["2022", "2023", "2024"],
    type: ["Payslip", "Timesheet", "Others"],
  });
  const [queryParam, setQueryParam] = useState({});
  const [initialFetch, setInitialFetch] = useState(null);

  useEffect(() => {
    (async () => {
      // const networkStatus = await Network.getNetworkStateAsync();
      if (currentUser) {
        fetcher
          .get(`db/${currentUser.UserID}`)
          .then((res) => {
            setSdPictures(res.data.images);
            setContactLists(res.data.admin);
          })
          .catch((err) => {
            // makeToast(err.message);
          })
          .finally(() => setInitialFetch(true));
      } else {
        const accessToken = await SecureStore.getItemAsync("accessToken");
        fetcher
          .get("auth", {
            headers: { Authorization: accessToken },
          })
          .then((res) => setCurrentUser(res.data.user))
          .catch((err) => {
            const { error } = err.response.data;
          })
          .finally(() => setInitialFetch(true));
      }
    })();
  }, [currentUser]);

  const makeToast = (message) => {
    return toast.show({
      description: message,
    });
  };

  const value = {
    adPictures,
    cacheData,
    setCacheData,
    currentUser,
    setCurrentUser,
    queryParam,
    setQueryParam,
    contactLists,
    selectOptions,
    makeToast,
    initialFetch,
  };
  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};

export default DataContextProvider;
