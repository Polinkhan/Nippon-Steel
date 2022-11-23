import { createContext, useContext, useEffect, useState } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase_init";
import { LogBox } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import {
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

LogBox.ignoreLogs(["AsyncStorage"]);
LogBox.ignoreLogs(["Setting a timer"]);

const Data = {
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
  year: ["2018", "2019", "2020", "2021", "2022", "2023"],
};

const DataContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [pdfList, setPdfList] = useState([]);
  const [isFirebaseLoaded, setFirebaseLoded] = useState(false);

  const requestforPdf = async (year, month) => {
    return listAll(ref(storage, `${currentUser.id}/${year}/${month}/`));
  };

  const SignInWithId = async (id, pass) => {
    return signInWithEmailAndPassword(auth, id + "@dev.bd", pass);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const id = user.email.slice(0, 4);
        const snap = await getDoc(doc(db, "UserData", id));
        setCurrentUser(snap.data());
      }
      setFirebaseLoded(true);
    });
    return () => unSubscribe();
  }, []);

  const singOut = () => {
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const value = {
    currentUser,
    SignInWithId,
    Data,
    pdfList,
    setPdfList,
    requestforPdf,
    singOut,
    isFirebaseLoaded,
  };
  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};

export default DataContextProvider;
