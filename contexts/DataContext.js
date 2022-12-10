import { createContext, useContext, useState } from "react";
import { LogBox } from "react-native";
import { fetchDataFromApi } from "../utils/ApiCall";
import { isAuthApi, uriFetchApi, Data } from "../utils/StaticData";

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

LogBox.ignoreLogs(["AsyncStorage"]);
LogBox.ignoreLogs(["Setting a timer"]);

const DataContextProvider = (props) => {
  const [isAuth, setAuth] = useState(false);
  const [currentPdf, setCurrentPdf] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [contactLists, setContactLists] = useState({});
  const [queryParam, setQueryParam] = useState({
    id: "",
    month: "",
    year: "",
    type: "PAY",
  });

  const SignInWithId = (user, callback) => {
    fetchDataFromApi(user, isAuthApi, (res) => {
      const { cred, cont } = JSON.parse(res);
      console.log(res);
      if (cred) {
        setCurrentUser(cred);
        setContactLists(cont);
        callback(true);
      } else {
        callback(false);
      }
    });
  };

  const getPDF = (data, callback) => {
    fetchDataFromApi(data, uriFetchApi, (link) => {
      callback(link);
    });
  };

  const singOut = () => {
    setAuth(false);
    setCurrentPdf(null);
    setCurrentUser({});
    setContactLists({});
    setQueryParam({ id: "", month: "", year: "", type: "PAY" });
  };

  const value = {
    Data,
    isAuth,
    setAuth,
    SignInWithId,
    singOut,
    currentUser,
    setCurrentUser,
    currentPdf,
    setCurrentPdf,
    getPDF,
    queryParam,
    setQueryParam,
    contactLists,
  };
  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};

export default DataContextProvider;
