import {
  Button,
  Divider,
  Drawer,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { authClient, dbClient } from "../Api/Client";
import { toast } from "react-toastify";
import { Block, Delete, Edit } from "@mui/icons-material";
import { useDataContext } from "../contexts/DataContext";

const ManageAdmin = () => {
  const [adminData, setAdminData] = useState([]);
  const [drawerState, setDrawerState] = useState({ state: false });

  const FETCH = () => {
    dbClient
      .get("adminData")
      .then(({ data }) => {
        setAdminData(data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  useEffect(() => {
    FETCH();
  }, []);

  const handleUpdate = (ID, updatedData) => {
    dbClient.post("updateAdmin", updatedData).then(({ data }) => {
      setDrawerState({ state: false });
      FETCH();
      toast.success(data.message);
    });
  };

  const handleDelete = (ID, updatedData) => {
    dbClient.delete(`deleteAdmin/${ID}`).then(({ data }) => {
      setDrawerState({ state: false });
      toast.success(`${updatedData.AccountLavel} Deleted Successfully`);
      FETCH();
    });
  };

  const handleClick = async (type, data) => {
    if (type === "edit") {
      setDrawerState({
        data,
        state: true,
        action: "UPDATE",
        method: handleUpdate,
        message: "Change and click update to modify the data",
      });
    } else if (type === "delete") {
      console.log(data);
      setDrawerState({
        data,
        state: true,
        action: "confirm delete",
        method: handleDelete,
        message: `Are you sure you want to delete the ${data.AccountLavel} data?`,
      });
    }
  };

  return (
    <Stack className="rightContainer" spacing={1}>
      <div className="header">
        <p>Manage Admin Data</p>
      </div>
      <Stack direction={"row"} spacing={1} flex={1}>
        <CreateForm FETCH={FETCH} />
        <ModifyForm adminData={adminData} handleClick={handleClick} />
      </Stack>
      <Drawer
        anchor={"right"}
        open={drawerState.state}
        onClose={() => setDrawerState((prev) => ({ ...prev, state: false }))}
      >
        <UpdateForm state={drawerState} />
      </Drawer>
    </Stack>
  );
};

const CreateForm = ({ FETCH }) => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    pass: "",
    accountLabel: "Moderator",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    authClient
      .post("createAdmin", formData)
      .then(({ data }) => {
        const { message } = data;
        FETCH();
        setFormData({
          email: "",
          fullName: "",
          pass: "",
          accountLabel: "Moderator",
        });
        toast.success(message);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <Stack
      flex={1}
      p={4}
      alignItems={"center"}
      spacing={5}
      style={{ backgroundColor: "#fff" }}
    >
      <p>Create An Admin</p>
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <Stack alignItems={"center"} spacing={3}>
          <TextField
            required
            autoFocus
            id="Email"
            label={"Email"}
            sx={{ width: "80%" }}
            value={formData.email}
            onChange={(val) => {
              setFormData((prev) => ({ ...prev, email: val.target.value }));
            }}
          />
          <TextField
            required
            id="fullName"
            label={"Full Name"}
            sx={{ width: "80%" }}
            value={formData.fullName}
            onChange={(val) => {
              setFormData((prev) => ({ ...prev, fullName: val.target.value }));
            }}
          />
          <TextField
            required
            label={"Password"}
            sx={{ width: "80%" }}
            value={formData.pass}
            onChange={(val) => {
              setFormData((prev) => ({ ...prev, pass: val.target.value }));
            }}
          />
          <Select
            value={formData.accountLabel}
            sx={{ width: "80%" }}
            onChange={(val) => {
              console.log(val);
              setFormData((prev) => ({
                ...prev,
                accountLabel: val.target.value,
              }));
            }}
          >
            <MenuItem value={"Admin"}>Admin</MenuItem>
            <MenuItem value={"Moderator"}>Moderator</MenuItem>
          </Select>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              margin: "50px 0",
            }}
          >
            <Button
              type="submit"
              sx={{ width: "80%", py: 1.5 }}
              variant="contained"
            >
              Create Admin
            </Button>
          </div>
        </Stack>
      </form>
    </Stack>
  );
};

const ModifyForm = ({ adminData, handleClick }) => {
  const { currentUser } = useDataContext();

  return (
    <Stack flex={2} p={4} spacing={5} style={{ backgroundColor: "#fff" }}>
      <p style={{ textAlign: "center" }}>Modify Admin</p>
      <Stack spacing={1} divider={<Divider />}>
        <Label />
        {adminData.map((item, i) => (
          <Stack
            direction={"row"}
            key={i}
            divider={<Divider orientation="vertical" />}
            alignItems={"center"}
          >
            {keys.map(({ name, flex }, i) => (
              <p key={i} style={{ flex, textAlign: "center" }}>
                {name === "Password" && item.AccountLavel === "System Admin"
                  ? "*****"
                  : item[name]}
              </p>
            ))}
            <Stack
              flex={1}
              direction={"row"}
              spacing={2}
              justifyContent={"center"}
            >
              <CustomIconButton
                disabled={
                  item.AccountLavel === "System Admin" &&
                  currentUser.AccountLavel !== "System Admin"
                }
                color="info"
                onClick={() => handleClick("edit", item)}
              >
                <Edit />
              </CustomIconButton>

              <CustomIconButton
                color="error"
                disabled={
                  item.AccountLavel === "System Admin" ||
                  item.ID === currentUser.ID
                }
                onClick={() => handleClick("delete", item)}
              >
                <Delete />
              </CustomIconButton>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

const Label = () => {
  return (
    <Stack
      direction={"row"}
      divider={<Divider orientation="vertical" />}
      sx={{ fontWeight: "bold", width: "100%" }}
    >
      {keys.map(({ name, flex }, i) => (
        <p key={i} style={{ flex, textAlign: "center", padding: 5 }}>
          {name}
        </p>
      ))}
      <p style={{ flex: 1, textAlign: "center", padding: 5 }}>Modify</p>
    </Stack>
  );
};

const CustomIconButton = (props) => {
  return (
    <Button
      variant="outlined"
      style={{
        maxWidth: "30px",
        maxHeight: "30px",
        minWidth: "30px",
        minHeight: "30px",
      }}
      {...props}
    />
  );
};

const UpdateForm = ({ state }) => {
  const { action, data, method, message } = state;
  console.log(data);
  const [updatedData, setUpdatedData] = useState(data);

  return (
    <Stack p={5} spacing={3} width={500} divider={<Divider />}>
      <Stack justifyContent={"center"} alignItems={"center"}>
        <p style={{ fontWeight: "bold" }}>{message}</p>
      </Stack>
      <form
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
        onSubmit={(e) => {
          e.preventDefault();
          method(data.ID, updatedData);
        }}
      >
        <Stack spacing={3}>
          {keys.map(({ name, isDasabled, type }, i) => (
            <Stack key={i} direction={"row"} alignItems={"center"}>
              <p style={{ flex: 1 }}>{name}</p>
              <p style={{ width: 20 }}>:</p>
              <TextField
                id={name}
                type={type}
                disabled={isDasabled || action !== "UPDATE"}
                sx={{ flex: 3 }}
                label={name}
                value={updatedData[name]}
                size="small"
                onChange={(e) =>
                  setUpdatedData((prev) => ({
                    ...prev,
                    [name]: e.target.value,
                  }))
                }
              />
            </Stack>
          ))}
          <Button
            type="submit"
            size="large"
            variant="contained"
            color={action === "UPDATE" ? "info" : "error"}
          >
            {action}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default ManageAdmin;

const keys = [
  { name: "FullName", type: "text", isDasabled: false, flex: 1 },
  { name: "Email", type: "text", isDasabled: true, flex: 1.5 },
  { name: "Password", type: "text", isDasabled: false, flex: 1 },
  { name: "AccountLavel", type: "text", isDasabled: true, flex: 1 },
];

const AccountLabelString = ["Moderator", "Admin", "Administrator"];
