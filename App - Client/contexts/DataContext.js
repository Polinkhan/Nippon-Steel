import { View, Text } from "react-native";
import React, { createContext, useState } from "react";

export const DataContext = createContext({
  currentUser: {},
  setCurrentUser: () => {},
});

const DataContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const value = { currentUser, setCurrentUser };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContextProvider;
