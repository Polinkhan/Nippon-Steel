import React from "react";
import { Navigate, Outlet } from "react-router";
import { useDataContext } from "../../Contexts/DataContext";


const PrivateRoute = () => {
  const { currentUser } = useDataContext();
  console.log(currentUser);
  return currentUser ? <Outlet /> : <Navigate to="login" />;
};

export default PrivateRoute;