import React from "react";
import { Navigate, Outlet } from "react-router";
import { useDataContext } from "../../contexts/DataContext";

const PrivateRoute = () => {
  const { currentUser } = useDataContext();
  return currentUser ? <Outlet /> : <Navigate to="login" />;
};

export default PrivateRoute;
