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
  const [queryParam, setQueryParam] = useState({
    id: "",
    month: "",
    year: "",
    type: "",
  });

  const SignInWithId = (user, callback) => {
    fetchDataFromApi(user, isAuthApi, (flag) => {
      if (flag === "false") {
        callback(false);
      } else {
        console.log(flag);
        setCurrentUser(JSON.parse(flag));
        callback(true);
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
  };
  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};

export default DataContextProvider;
