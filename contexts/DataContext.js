import { useToast } from "native-base";
import { createContext, useContext, useEffect, useState } from "react";
import { LogBox } from "react-native";
import { fetchDataFromApi, fetcher } from "../utils/ApiCall";
import { api } from "../utils/StaticData";
import * as SecureStore from "expo-secure-store";
// import * as Network from "expo-network";

export const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

LogBox.ignoreLogs(["AsyncStorage"]);
LogBox.ignoreLogs(["Setting a timer"]);

const DataContextProvider = (props) => {
  const toast = useToast();
  const appName = "Nippon Steel Engineering [Ver 1.2.2].apk";
  const [currentUser, setCurrentUser] = useState(null);
  const [contactLists, setContactLists] = useState([]);
  const [adData, setAdData] = useState([]);
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
  const [payslipData, setPayslipData] = useState(null);
  const [initialFetch, setInitialFetch] = useState(null);

  useEffect(() => {
    // const networkStatus = await Network.getNetworkStateAsync();
    // console.log(networkStatus);

    (async () => {
      if (currentUser) {
        fetcher
          .get(`db/${currentUser.UserID}`)
          .then((res) => {
            const { contact_res } = res.data;
            setContactLists(contact_res);
          })
          .catch((err) => makeToast(err.message))
          .finally(() => setInitialFetch({ fetchErrorStatus: true }));
      } else {
        const accessToken = await SecureStore.getItemAsync("accessToken");
        fetcher
          .get("auth", {
            headers: { Authorization: accessToken },
          })
          .then((res) => setCurrentUser(res.data.user))
          .catch((err) => {
            const { error } = err.response.data;
            setInitialFetch({
              fetchErrorStatus: error.status === 401 ? true : false,
              ...error,
            });
          });
      }
    })();
  }, [currentUser]);
  // const checkFforUpdate = (callback) => {
  //   fetchDataFromApi({ name: appName }, uriUpdateApi, (res) => {
  //     uriUpdateApi;
  //     callback(res);
  //   });
  // };

  // useEffect(() => {
  //   fetchDataFromApi({}, uriAdApi, (res) => {
  //     setAdData(JSON.parse(res));
  //   });
  // }, []);

  const makeToast = (message) => {
    return toast.show({
      description: message,
    });
  };

  const value = {
    currentUser,
    setCurrentUser,
    queryParam,
    setQueryParam,
    contactLists,
    adData,
    selectOptions,
    payslipData,
    setPayslipData,
    makeToast,
    initialFetch,
  };
  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};

export default DataContextProvider;
