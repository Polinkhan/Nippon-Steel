import { PersonAdd, Search, RotateLeft } from "@mui/icons-material";
import {
  Button,
  Divider,
  Fade,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { dbClient } from "../Api/Client";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [Credentials, setCredentials] = useState({});
  const [Information, setInformation] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await dbClient.post("/userRegistration", {
        Credentials,
        Information,
      });
      toast.success(data?.message);
    } catch ({ response }) {
      const { message } = response.data;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack className="rightContainer" spacing={1}>
      <div className="header">
        <p>User Registration</p>
      </div>
      <form className="registerBody" onSubmit={handleSubmit}>
        <Stack
          divider={<Divider orientation="horizontal" flexItem />}
          sx={{ height: "100%" }}
        >
          <Stack
            direction={"row"}
            flex={8}
            className="registerInputBody"
            divider={<Divider orientation="vertical" flexItem />}
            style={loading ? { filter: "blur(4px)" } : { filter: "blur(0px)" }}
          >
            <Stack flex={1} alignItems={"center"}>
              <p style={{ flex: 1, fontSize: 20, margin: "50px 0" }}>
                Credentials
              </p>
              <Stack flex={10} justifyContent={"space-around"}>
                {credentials.map((item, i) => (
                  <InputWithLabel
                    key={i}
                    item={item}
                    setData={setCredentials}
                  />
                ))}
              </Stack>
            </Stack>
            <Stack flex={2} alignItems={"center"}>
              <p style={{ flex: 1, fontSize: 20, margin: "50px 0" }}>
                User Information
              </p>
              <Stack
                flex={10}
                direction={"row"}
                flexWrap={"wrap"}
                justifyContent={"space-around"}
                alignItems={"center"}
              >
                {information.map((item, i) => (
                  <InputWithLabel
                    key={i}
                    item={item}
                    setData={setInformation}
                  />
                ))}
              </Stack>
            </Stack>
          </Stack>
          <Stack
            flex={3}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={5}
          >
            <Button
              type="reset"
              size="large"
              endIcon={<RotateLeft color="white" />}
              variant="contained"
              color="error"
            >
              Reset
            </Button>
            <Button
              type="submit"
              size="large"
              endIcon={<PersonAdd color="white" />}
              variant="contained"
            >
              Add User
            </Button>
          </Stack>
          {loading && (
            <div className="loadingBox">
              <Loading size={150} />
            </div>
          )}
        </Stack>
      </form>
    </Stack>
  );
};
export default RegisterPage;

const InputWithLabel = ({ item, setData }) => {
  return (
    <TextField
      className="input"
      id={item.key}
      required
      type={item.type}
      label={item.placeholder}
      variant="outlined"
      // focused={item.key === "dateOfBirth" && true}
      onChange={(e) => {
        setData((prev) => ({ ...prev, [item.key]: e.target.value }));
      }}
    />
  );
};

const information = [
  {
    id: 1,
    key: "fullName",
    placeholder: "Full Name",
    type: "text",
  },

  {
    id: 3,
    key: "dateOfBirth",
    placeholder: "Date",
    type: "date",
  },
  {
    id: 4,
    key: "company",
    placeholder: "Company Name",
    type: "text",
  },
  {
    id: 5,
    key: "title",
    placeholder: "Job Title",
    type: "text",
  },
  {
    id: 6,
    key: "mobile",
    placeholder: "Mobile",
    type: "text",
  },
  {
    id: 7,
    key: "nationality",
    placeholder: "Nationality",
    type: "text",
  },
  {
    id: 8,
    key: "type",
    placeholder: "Type",
    type: "text",
  },
  {
    id: 9,
    key: "bank",
    placeholder: "Bank Information",
    type: "text",
  },
];

const credentials = [
  {
    id: 1,
    key: "UserID",
    placeholder: "User ID",
    type: "text",
  },
  {
    id: 2,
    key: "email",
    placeholder: "Email",
    type: "text",
  },
  {
    id: 3,
    key: "password",
    placeholder: "Password",
    type: "text",
  },
];
