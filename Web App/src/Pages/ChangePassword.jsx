import {
  Button,
  CircularProgress,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import Header from "../components/Header";
import { useState } from "react";
import { authClient } from "../Api/Client";
import { useDataContext } from "../Contexts/DataContext";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const { currentUser } = useDataContext();
  const [needOTP, setNeedOTP] = useState(false);
  const [isVerified, setVerified] = useState(false);
  const [snakeBarStare, setSnakeBarStare] = useState({ state: false });
  const navigate = useNavigate();

  const Verify = (pass, setLoading) => {
    setLoading(true);
    authClient
      .post("/login", { id: currentUser.UserID, pass })
      .then(async ({ data }) => {
        setVerified({ pass });
        const { OtpService, accessToken, User, Email } = data;
        OtpService && setNeedOTP({ Email });
      })
      .catch((err) => {
        const message = err?.response?.data?.message || err.message || err;
        setSnakeBarStare({ state: true, message });
      })
      .finally(() => setLoading(false));
  };

  const VerifyOTP = (otp, setLoading) => {
    const { UserID } = currentUser;
    const { pass } = isVerified;
    setLoading(true);
    authClient
      .post("/verifyOtp", { id: UserID, pass, otp })
      .then(() => setNeedOTP(false))
      .catch((err) => {
        const message = err?.response?.data?.message || err.message || err;
        setSnakeBarStare({ state: true, message });
      })
      .finally(() => setLoading(false));
  };

  const ChnagePassword = (pass, setLoading) => {
    setLoading(true);
    authClient
      .post("/changePassword", { id: currentUser.UserID, pass })
      .then(async ({ data }) => {
        const { accessToken } = data;
        localStorage.setItem("accessToken", accessToken);
        setSnakeBarStare({
          state: true,
          message: "Password has changed successfully",
        });
        navigate({ pathname: "/setting" });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Stack flex={1}>
      {isVerified ? (
        needOTP ? (
          <OTPScreen VerifyOTP={VerifyOTP} />
        ) : (
          <ChangePass ChnagePassword={ChnagePassword} />
        )
      ) : (
        <VerifyPassword Verify={Verify} />
      )}
      <Snackbar
        open={snakeBarStare.state}
        autoHideDuration={6000}
        onClose={() => setSnakeBarStare({ state: false })}
        message={snakeBarStare.message}
      />
    </Stack>
  );
};

const VerifyPassword = ({ Verify }) => {
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <Stack>
      <Header name={"Enter Current Password"} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          Verify(pass, setLoading);
        }}
      >
        <Stack p={4} spacing={4}>
          <p>Enter Your Current Password</p>
          <TextField
            autoComplete="off"
            label={"Current Password"}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ p: 1.5 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={22} /> : "Submit"}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

const OTPScreen = ({ VerifyOTP }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <Stack>
      <Header name={"Enter OTP Code"} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          VerifyOTP(otp, setLoading);
        }}
      >
        <Stack p={4} spacing={4}>
          <p>An OTP has been sent to your email</p>
          <TextField
            autoComplete="off"
            label={"Enter OTP"}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ p: 1.5 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={22} /> : "Submit"}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

const ChangePass = ({ ChnagePassword }) => {
  const [newPass, setNewPass] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <Stack>
      <Header name={"Enter New Password"} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ChnagePassword(newPass, setLoading);
        }}
      >
        <Stack p={4} spacing={4}>
          <p>Enter Your New Password</p>
          <TextField
            autoComplete="off"
            label={"New Password"}
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ p: 1.5 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={22} /> : "Submit"}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
export default ChangePassword;
