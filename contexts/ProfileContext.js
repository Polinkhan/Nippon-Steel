import { createContext, useContext, useEffect, useState } from "react";

const ProfileContext = createContext();
export const useProfileContext = () => useContext(ProfileContext);

const ProfileContextProvider = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [isValidate, setValidate] = useState(false);

  const value = { showModal, setShowModal, isValidate, setValidate };
  return (
    <ProfileContext.Provider value={value}>
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
