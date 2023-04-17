import Lottie from "lottie-react";
import login from "../assets/Lottie/login.json";
import TextField from "@mui/material/TextField";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Stack,
} from "@mui/material";
import { useDataContext } from "../contexts/DataContext";
import { useState } from "react";
import { authClient } from "../Api/Client";

const LoginPage = () => {
  const { setCurrentUser } = useDataContext();

  const handleSubmit = (data, callback) => {
    const { email, pass } = data;
    authClient
      .post("login", { email, pass })
      .then(() => {
        callback({ loading: false, isOTPSend: true });
      })
      .catch((err) => {
        callback({ loading: false, isOTPSend: false });
        console.log(err?.response?.data);
      });
  };

  const varifyOTP = (data, callback) => {
    const { OTP, email, pass, remember } = data;
    authClient
      .post("verifyOtp", { OTP, email, pass })
      .then(({ data }) => {
        const { accessToken, currentUser } = data;
        if (remember) localStorage.setItem("accessToken", accessToken);
        setCurrentUser(currentUser);
      })
      .catch((err) => {
        callback({ loading: false, isOTPMatched: false });
        console.log(err?.response?.data);
      });
  };

  return (
    <Stack className="container">
      <Stack direction={"row"} className="outerBox">
        <Stack flex={4} className="leftBox">
          <Lottie
            animationData={login}
            loop={true}
            style={{ width: "calc(30vw - 80px)" }}
          />
        </Stack>
        <Stack flex={3} className="RightBox">
          <Stack spacing={2} style={{ flex: 1, justifyContent: "center" }}>
            <p style={{ fontSize: 24 }}>Nippon Steel Engineering</p>
            <p>Admin Login</p>
          </Stack>
          <LoginForm handleSubmit={handleSubmit} varifyOTP={varifyOTP} />
        </Stack>
      </Stack>
    </Stack>
  );
};

const LoginForm = ({ handleSubmit, varifyOTP }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passType, setPassType] = useState(true);
  const [OTP, setOTP] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [OTPSend, setOTPSend] = useState(false);

  if (OTPSend) {
    return (
      <form
        className="form"
        onSubmit={(e) => {
          setLoading(true);
          e.preventDefault();
          varifyOTP(
            { OTP, email, pass, remember },
            ({ loading, isOTPMatched }) => {
              setLoading(loading);
            }
          );
        }}
      >
        <Stack spacing={3}>
          <TextField
            label="Enter OTP Code"
            autoFocus
            variant="standard"
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: 10, padding: "10px" }}
          >
            {loading ? <CircularProgress color="white" size={20} /> : "Submit"}
          </Button>
        </Stack>
        <Stack spacing={1} direction={"row"} justifyContent={"center"}>
          <p style={{ fontSize: 12 }}>A OTP has been sent to your email</p>
        </Stack>
      </form>
    );
  }

  return (
    <form
      className="form"
      onSubmit={(e) => {
        setLoading(true);
        e.preventDefault();
        handleSubmit({ email, pass }, ({ loading, isOTPSend }) => {
          setLoading(loading);
          setOTPSend(isOTPSend);
        });
      }}
    >
      <Stack spacing={2}>
        <TextField
          type="Email"
          label="Email"
          id="formEmail"
          autoFocus
          placeholder="example@mail.com"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type={passType ? "password" : "text"}
          label="Password"
          placeholder="Password"
          variant="outlined"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              onChange={(e) => setRemember(e.target.checked)}
            />
          }
          label="Remember me"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: 10, padding: "10px" }}
        >
          {loading ? <CircularProgress color="white" size={20} /> : "Sign in"}
        </Button>
      </Stack>
      <Stack spacing={1} direction={"row"} justifyContent={"center"}>
        <p style={{ fontSize: 12 }}>Don,t have a account?</p>
      </Stack>
    </form>
  );
};

export default LoginPage;
