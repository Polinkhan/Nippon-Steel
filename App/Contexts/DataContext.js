import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { client } from "../Api/Client";

export const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

const DataContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isFetched, setFetched] = useState(false);

  useEffect(() => {
    (async () => {
      const accessToken = await SecureStore.getItemAsync("accessToken");
      client
        .get("auth", {
          headers: { Authorization: accessToken },
        })
        .then((res) => setCurrentUser(res.data))
        .catch((err) => {
          console.log(err.response.data);
        })
        .finally(() => setFetched(true));
    })();
  }, []);

  const value = { isFetched, currentUser, setCurrentUser };
  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};

export default DataContextProvider;
