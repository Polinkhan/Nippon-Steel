import { IconButton, Snackbar, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Lottie from "lottie-react";
import OTP from "../assets/Lottie/OTP.json";
import loadingLottie from "../assets/Lottie/DefaultLoading.json";
import { useWindowDimensions } from "../Hooks/useWindowDimensions";
import { ChevronRightRounded } from "@mui/icons-material";
import { authClient } from "../Api/Client";
import { useDataContext } from "../Contexts/DataContext";

const OTPVerifyPage = () => {
  const [searchparams] = useSearchParams();
  const { id, pass, Email } = JSON.parse(searchparams.get("params"));
  const { height } = useWindowDimensions();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [snakeBarStare, setSnakeBarStare] = useState({ state: false });
  const navigate = useNavigate();

  const { setCurrentUser } = useDataContext();

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    authClient
      .post("/verifyOtp", { id, pass, otp })
      .then(async ({ data }) => {
        const { accessToken, User } = data;
        localStorage.setItem("accessToken", accessToken);
        setCurrentUser(User);
        navigate({ pathname: "/" });
      })
      .catch((err) => {
        const message = err?.response?.data?.message || err.message || err;
        setSnakeBarStare({ state: true, message });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <Header name={"Enter OTP Code"} />
      <Stack
        flex={1}
        sx={{ px: 6, py: 4, backgroundColor: "#fff" }}
        alignItems={"center"}
        spacing={6}
      >
        <Lottie
          animationData={loading ? loadingLottie : OTP}
          loop={true}
          style={{ width: height / 7 }}
        />

        <Stack alignItems={"center"}>
          <p>A 4 digit OTP will be sent in this email soon</p>
          <p>({Email})</p>
          <form className="OTPForm" onSubmit={handleSubmit}>
            <TextField
              id="OTP"
              value={otp}
              variant="standard"
              label={"Enter OTP (4 digit)"}
              sx={{ width: "100%", mb: 4 }}
              onChange={(e) => setOtp(e.target.value)}
            />
            <IconButton
              sx={{ backgroundColor: "#eee" }}
              type="submit"
              disabled={loading}
            >
              <ChevronRightRounded sx={{ fontSize: 32 }} />
            </IconButton>
          </form>
        </Stack>
        <Stack alignItems={"center"}>
          <p style={{ fontSize: 10, fontWeight: "bold", color: "gray" }}>
            Sending OTP may take upto (2 minutes)
          </p>
          <p style={{ fontSize: 10, fontWeight: "bold", color: "gray" }}>
            Please check your email (Spam/Junk) folder also
          </p>
        </Stack>
        <Snackbar
          open={snakeBarStare.state}
          autoHideDuration={6000}
          onClose={() => setSnakeBarStare({ state: false })}
          message={snakeBarStare.message}
        />
      </Stack>
    </>
  );
};

export default OTPVerifyPage;
