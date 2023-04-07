import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

const DataContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const value = {
    currentUser,
    setCurrentUser,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContextProvider;
