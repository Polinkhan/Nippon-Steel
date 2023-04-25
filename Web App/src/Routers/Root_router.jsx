import { HashRouter, Route, Routes } from "react-router-dom";
import { useDataContext } from "../Contexts/DataContext";
import PreventRoute from "./Private Route/PreventRoute";
import PrivateRoute from "./Private Route/PrivateRoute";
import LoginPage from "../Pages/LoginPage";
import useResponsiveSizes from "../Hooks/useResponsivesizes";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { authClient } from "../Api/Client";
import Loading from "../components/Loading";
import PDFViewPage from "../Pages/PDFViewPage";
import { useWindowDimensions } from "../Hooks/useWindowDimensions";
import OTPVerifyPage from "../Pages/OTPVerifyPage";
import Redirect from "./Private Route/Redirect";
import AboutPage from "../Pages/AboutPage";
import ViewProfilePage from "../Pages/ViewProfilePage";
import TeamPage from "../Pages/TeamPage";
import Home from "../components/Home";
import SearchReport from "../components/SearchReport";
import Setting from "../components/Setting";
import RootPage from "../Pages/RootPage";
import ContactAdmin from "../Pages/ContactAdmin";
import ChangePassword from "../Pages/ChangePassword";

function Root_router() {
  const token = localStorage.getItem("accessToken");
  const { md } = useResponsiveSizes();
  const { setCurrentUser } = useDataContext();
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);

  const width = md ? "500px" : "100vw";
  // const height = md ? "95%" : "100%";

  useEffect(() => {
    authClient
      .get("/", { headers: { Authorization: token } })
      .then(({ data }) => setCurrentUser(data.currentUser))
      .catch((err) => {
        if (err.code === "ERR_BAD_RESPONSE") {
          setServerError(err?.response?.data);
        }
      })
      .finally(() => setTimeout(() => setLoading(false), 500));
  }, []);
  const { height } = useWindowDimensions();
  const { regulerFontSize } = useResponsiveSizes();

  if (loading) return <Loading height={height} width={width} />;
  else if (serverError) {
    return (
      <Stack
        sx={{ height, width }}
        justifyContent={"center"}
        alignItems={"center"}
        fontSize={regulerFontSize}
        spacing={1}
      >
        <p>Error Code : {serverError.status}</p>
        <p> Details : {serverError.message}</p>
        <p style={{ color: "gray", fontSize: 12 }}>
          Refresh the page or Try again later ↻
        </p>
      </Stack>
    );
  }

  return (
    <Stack
      sx={{
        height: height,
        justifyContent: "center",
        fontSize: regulerFontSize,
      }}
    >
      <Stack sx={{ height, width }}>
        <HashRouter>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<RootPage />}>
                <Route path="home" element={<Home />} />
                <Route path="search" element={<SearchReport />} />
                <Route path="view" element={<PDFViewPage />} />
                <Route path="setting" element={<Setting />} />
                <Route path="aboutApp" element={<AboutPage />} />
                <Route path="profile" element={<ViewProfilePage />} />
                <Route path="contactAdmin" element={<ContactAdmin />} />
                <Route path="changePassword" element={<ChangePassword />} />
                <Route path="teams" element={<TeamPage />} />
              </Route>
              <Route path="*" element={<Redirect name={"home"} />} />
            </Route>
            <Route path="/" element={<PreventRoute />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="otp" element={<OTPVerifyPage />} />
              <Route path="*" element={<Redirect name={"login"} />} />
            </Route>
          </Routes>
        </HashRouter>
      </Stack>
    </Stack>
  );
}

export default Root_router;
