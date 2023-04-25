import { Navigate, Outlet } from "react-router";

const Redirect = ({ name }) => {
  return <Navigate to={name} />;
};
export default Redirect;
