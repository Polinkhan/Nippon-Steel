import "./rootRouter.css";
import RootPage from "../RootPage/RootPage";
import loading from "../../assets/Lottie/DefaultLoading.json";
import PrivateRoute from "../Private Route/PrivateRoute";
import PreventRoute from "../Private Route/PreventRoute";
import LoginPage from "../LoginPage/LoginPage";
import NotFound from "../NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDataContext } from "../../contexts/DataContext";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";

function RootRouter() {
  const [loadind, setLoadind] = useState(true);
  const { currentUser, setCurrentUser } = useDataContext();

  useEffect(() => {
    setTimeout(() => {
      // setCurrentUser(true);
      setLoadind(false);
    }, 2000);
  }, []);

  if (loadind) {
    return (
      <div className="loadingDiv">
        <Lottie animationData={loading} loop={true} style={{ width: 250 }} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<RootPage />}>
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
