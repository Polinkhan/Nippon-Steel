import Lottie from "lottie-react";
import login from "../assets/Lottie/login.json";
import TextField from "@mui/material/TextField";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { useDataContext } from "../contexts/DataContext";

const LoginPage = () => {
  const { setCurrentUser } = useDataContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentUser({});
  };

  return (
    <div className="container">
      <div className="outerBox">
        <div className="leftBox">
          <Lottie
            animationData={login}
            loop={true}
            style={{ width: "calc(30vw - 80px)" }}
          />
        </div>
        <div className="RightBox">
          <div>
            <p style={{ fontSize: 24 }}>Nippon Steel Engineering</p>
            <p>Admin Login</p>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <TextField
              label="User ID or Email"
              variant="outlined"
              sx={{ marginTop: 2 }}
            />
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              sx={{ marginTop: 2 }}
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember me"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: 999,
                marginTop: 10,
                padding: "10px",
              }}
            >
              Sign in
            </Button>
          </form>
          <div></div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
