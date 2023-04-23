import React from "react";
import { Navigate, Outlet } from "react-router";
import { useDataContext } from "../../Contexts/DataContext";

const PreventRoute = () => {
  const { currentUser } = useDataContext();
  return currentUser ? <Navigate to="/" /> : <Outlet />;
};

export default PreventRoute;
