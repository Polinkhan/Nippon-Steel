import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import PreventRoute from "./components/Auth Route/PreventRoute";
import PrivateRoute from "./components/Auth Route/PrivateRoute";
// import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/LandingPage/Login";
import DashBoard from "./components/Home/DashBoard";
import { useDataContext } from "./contexts/DataContext";
import Overview from "./components/Home/Overview";
import RegisterUser from "./components/Home/RegisterUser/RegisterUser";
import ManageUser from "./components/Home/ManageUsers/ManageUser";
import NotFound from "./components/Not Found/NotFound";
import { AnimatePresence } from "framer-motion";
import Recyclebin from "./components/Home/RecycleBin/RecycleBin";
import AppSettings from "./components/Home/App Settings/AppSettings";
import PayslipTable from "./components/Home/PaySlipTable.js/PayslipTable";
import View from "./components/Home/PaySlipTable.js/View";

function App() {
  const { isDataFetched } = useDataContext();

  return (
    isDataFetched && (
      <HashRouter>
        <AnimatePresence>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<DashBoard />}>
                <Route path="Overview" element={<Overview />} />
                <Route path="Register User" element={<RegisterUser />} />
                <Route path="Manage Users" element={<ManageUser />} />
                <Route path="Recycle Bin" element={<Recyclebin />} />
                <Route path="App Settings" element={<AppSettings />} />
                <Route path="Payslip Data" element={<PayslipTable />} />
                <Route path="view" element={<View />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>
            <Route element={<PreventRoute />}>
              {/* <Route path="/home" element={<LandingPage />} /> */}
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </HashRouter>
    )
  );
}

//eslint-disable-next-line

export default App;
