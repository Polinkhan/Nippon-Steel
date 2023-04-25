import React from "react";
import { Navigate, Outlet } from "react-router";
import { useDataContext } from "../../Contexts/DataContext";

const PreventRoute = () => {
  const { currentUser } = useDataContext();
  console.log(currentUser);
  return currentUser ? <Navigate to="/home" /> : <Outlet />;
};

export default PreventRoute;
