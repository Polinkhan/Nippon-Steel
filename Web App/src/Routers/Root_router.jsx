import { HashRouter, Route, Routes } from "react-router-dom";
import { useDataContext } from "../Contexts/DataContext";
import PreventRoute from "./Private Route/PreventRoute";
import PrivateRoute from "./Private Route/PrivateRoute";
import LoginPage from "../Pages/LoginPage";
import useResponsiveSizes from "../Hooks/useResponsivesizes";
import { Stack } from "@mui/material";
import HomePage from "../Pages/HomePage";
import { useEffect, useState } from "react";
import { authClient } from "../Api/Client";
import Loading from "../components/Loading";
import PDFViewPage from "../Pages/PDFViewPage";
import { useWindowDimensions } from "../Hooks/useWindowDimensions";
import OTPVerifyPage from "../Pages/OTPVerifyPage";

function Root_router() {
  const token = localStorage.getItem("accessToken");
  const { md } = useResponsiveSizes();
  const { setCurrentUser } = useDataContext();
  const [loading, setLoading] = useState(true);

  const width = md ? "500px" : "100vw";
  // const height = md ? "95%" : "100%";

  useEffect(() => {
    authClient
      .get("/", { headers: { Authorization: token } })
      .then(({ data }) => setCurrentUser(data.currentUser))
      .catch((err) => {})
      .finally(() => setTimeout(() => setLoading(false), 500));
  }, []);
  const { height } = useWindowDimensions();
  const { regulerFontSize } = useResponsiveSizes();

  if (loading) return <Loading height={height} width={width} />;

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
              <Route path="/" element={<HomePage />} />
              <Route path="view" element={<PDFViewPage />} />
            </Route>
            <Route path="/" element={<PreventRoute />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="otp" element={<OTPVerifyPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </Stack>
    </Stack>
  );
}

export default Root_router;
