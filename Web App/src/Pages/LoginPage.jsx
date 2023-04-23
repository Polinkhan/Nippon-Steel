import React, { useState } from "react";

import useResponsivesizes from "../Hooks/useResponsivesizes";
import {
  Stack,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  CircularProgress,
} from "@mui/material";
import { useDataContext } from "../Contexts/DataContext";
import { authClient } from "../Api/Client";
import { createSearchParams, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { font_size, lg, md, sm, xl } = useResponsivesizes();
  const [id, setID] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { setCurrentUser } = useDataContext();
  const navigate = useNavigate();

  const handle_submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError();
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
      .catch((err) => setError(err?.response?.data?.message))
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
            error={error !== undefined}
            onChange={(e) => setID(e.target.value)}
          />
          <TextField
            id="Password"
            label="Password"
            type="password"
            required
            value={pass}
            error={error !== undefined}
            onChange={(e) => setPass(e.target.value)}
            helperText={error}
          />
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
    </form>
  );
};
export default LoginPage;
