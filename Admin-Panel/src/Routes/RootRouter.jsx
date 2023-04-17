import PrivateRoute from "./Private Route/PrivateRoute";
import PreventRoute from "./Private Route/PreventRoute";
import LoginPage from "./LoginPage";
import NotFound from "./NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDataContext } from "../contexts/DataContext";
import { useEffect, useState } from "react";
import DashboardPage from "./DashboardPage";
import ViewDatabasePage from "./ViewDatabasePage";
import RegisterPage from ".//RegisterPage";
import Loading from "../components/Loading";
import ManageUser from "./ManageUser/";
import AppSettings from "./AppSettings";
import RootPage from "./RootPage";
import BlockList from "./BlockList";
import { authClient } from "../Api/Client";

function RootRouter() {
  const token = localStorage.getItem("accessToken");
  const [loadind, setLoadind] = useState(true);
  const { setCurrentUser } = useDataContext();

  useEffect(() => {
    authClient
      .get("/", { headers: { Authorization: token } })
      .then(({ data }) => setCurrentUser(data))
      .catch((err) => console.log(err))
      .finally(() => setTimeout(() => setLoadind(false), 1000));
  }, []);

  if (loadind) {
    return <Loading size={250} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<RootPage />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="manageUser" element={<ManageUser />} />
            <Route path="blockList" element={<BlockList />} />
            <Route path="database" element={<ViewDatabasePage />} />
            <Route path="appSettings" element={<AppSettings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
        <Route element={<PreventRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RootRouter;
