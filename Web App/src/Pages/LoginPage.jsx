import React, { useState } from "react";

import useResponsivesizes from "../Hooks/useResponsivesizes";
import {
  Stack,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Snackbar,
} from "@mui/material";
import { useDataContext } from "../Contexts/DataContext";
import { authClient } from "../Api/Client";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const LoginPage = () => {
  const { font_size, lg, md, sm, xl } = useResponsivesizes();
  const [id, setID] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setCurrentUser } = useDataContext();
  const [snakeBarStare, setSnakeBarStare] = useState({ state: false });
  const navigate = useNavigate();

  const handle_submit = (e) => {
    e.preventDefault();
    setLoading(true);
    authClient
      .post("/login", { id, pass })
      .then(async ({ data }) => {
        const { OtpService, accessToken, User, Email } = data;
        if (OtpService) {
          navigate({
            pathname: "/otp",
            search: createSearchParams({
              params: JSON.stringify({ id, pass, Email }),
            }).toString(),
          });
        } else {
          localStorage.setItem("accessToken", accessToken);
          setCurrentUser(User);
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.message || err.message || err;
        setSnakeBarStare({ state: true, message });
      })
      .finally(() => setLoading(false));
  };

  return (
    <form className="LoginForm" onSubmit={handle_submit}>
      <Stack className="Login_Body" justifyContent={"space-around"}>
        <Stack>
          <p style={{ fontSize: 26, fontWeight: "bold" }}>Welcome</p>
          <p style={{ fontSize: 14, letterSpacing: 2 }}>
            Nippon Steel Engineering
          </p>
        </Stack>
        <Stack spacing={2}>
          <TextField
            id="UserID"
            autoFocus
            type="text"
            required
            label="User ID"
            value={id}
            onChange={(e) => setID(e.target.value)}
          />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              required
              value={pass}
              id="outlined-adornment-password"
              onChange={(e) => setPass(e.target.value)}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remamber Me"
          />
        </Stack>
        <Stack>
          <Button
            type="submit"
            variant="contained"
            sx={{ padding: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress color="white" size={22} /> : " Login"}
          </Button>
        </Stack>
      </Stack>
      <Snackbar
        open={snakeBarStare.state}
        autoHideDuration={6000}
        onClose={() => setSnakeBarStare({ state: false })}
        message={snakeBarStare.message}
      />
    </form>
  );
};
export default LoginPage;
