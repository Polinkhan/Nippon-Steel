import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../utlis/GlobalData";

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

const DataContextProvider = (props) => {
  const toast = useToast();
  const [isDataFetched, setDataFetched] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userAllData, setUserAllData] = useState([]);
  const [recyclebinData, setRecyclebinData] = useState([]);
  const [appSettingsData, setAppSettingsData] = useState({});
  const [csvData, setCsvData] = useState([]);

  const init = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    axios
      .get(`${api}/auth`, { headers: { Authorization: accessToken } })
      .then((res) => setCurrentUser(res.data.user))
      .catch((res) => {
        axios
          .post(`${api}/auth/refresh-token`, { refreshToken })
          .then((res) => {
            setCurrentUser(res.data.user);
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
          });
      })
      .finally(() => {
        setDataFetched(true);
      });
  };

  const fetchUserAllData = () => {
    axios.post(`${api}/db/getAllUserData`).then((res) => {
      setUserAllData(res.data.userData);
    });
  };

  const fetchRecyleData = () => {
    axios.post(`${api}/db/getRecycleData`).then((res) => {
      setRecyclebinData(res.data.userData);
    });
  };

  const fetchAppSettingsData = () => {
    axios.post(`${api}/db/appSettingsData`).then((res) => {
      setAppSettingsData(res.data);
    });
  };

  const fetchPayslipTableData = () => {
    axios.post(`${api}/db/payslip`).then((res) => {
      setCsvData(res.data.result);
    });
  };

  useEffect(() => {
    init();
  }, []); //eslint-disable-line

  useEffect(() => {
    currentUser && fetchUserAllData();
    currentUser && fetchRecyleData();
    currentUser && fetchAppSettingsData();
    currentUser && fetchPayslipTableData();
  }, [currentUser]); //eslint-disable-line

  const makeToast = (status, msg) => {
    return toast({
      title: status,
      description: msg,
      status: status,
      duration: 6000,
      isClosable: true,
      position: "bottom-left",
    });
  };

  const value = {
    isDataFetched,
    currentUser,
    setCurrentUser,
    fetchUserAllData,
    fetchRecyleData,
    userAllData,
    recyclebinData,
    makeToast,
    appSettingsData,
    csvData,
    setCsvData,
    fetchAppSettingsData,
  };

  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};

export default DataContextProvider;
