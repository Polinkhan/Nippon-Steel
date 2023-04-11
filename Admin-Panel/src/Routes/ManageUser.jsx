import { Button, Divider, Drawer, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { dbClient } from "../Api/Client";
import { Delete, Edit } from "@mui/icons-material";

const ManageUser = () => {
  const [data, setData] = useState([]);
  const [drawerState, setDrawerState] = useState({ state: false });

  const FETCHDATA = async () => {
    try {
      const { data } = await dbClient.get("/viewData");
      setData(data);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    FETCHDATA();
  }, []);

  const handleSubmit = async (id, updatedData) => {
    try {
      const res = await dbClient.post(`/updateUser/${id}`, updatedData);
      FETCHDATA();
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await dbClient.delete(`/deleteUser/${id}`);
      FETCHDATA();
      setDrawerState({ state: false });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  const handleSearch = async (e) => {
    const text = e.target.value;
    if (text) {
      try {
        const { data } = await dbClient.get(`/viewData/query/${text}`);
        setData(data);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
    } else {
      FETCHDATA();
    }
  };

  const handleClick = async (type, data) => {
    if (type === "edit") {
      setDrawerState({
        data,
        state: true,
        action: "UPDATE",
        method: handleSubmit,
        message: "Change and click update to modify the data",
      });
    } else {
      setDrawerState({
        data,
        state: true,
        action: "confirm delete",
        method: handleDelete,
        message: "Are you sure you want to delete the user data?",
      });
    }
  };

  return (
    <Stack className="rightContainer" spacing={1}>
      <div className="header">
        <p>Modify User Data</p>
      </div>

      <Stack flex={1} direction={"row"} spacing={1}>
        <Stack
          flex={1}
          sx={{ backgroundColor: "#fff", padding: 2 }}
          divider={<Divider />}
          spacing={1}
        >
          <Stack sx={{ py: 1, px: 2 }}>
            <TextField
              onChange={handleSearch}
              label={"Search by ID or Email ..."}
            />
          </Stack>
          <Label />
          {data.map((item, i) => (
            <UserData key={i} data={item} handleClick={handleClick} />
          ))}
        </Stack>
        <Drawer
          anchor={"right"}
          open={drawerState.state}
          onClose={() => setDrawerState((prev) => ({ ...prev, state: false }))}
        >
          <UpdateForm state={drawerState} />
        </Drawer>
      </Stack>
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

const UserData = ({ data, handleClick }) => {
  return (
    <Stack
      // width={250}
      className="userData"
      direction={"row"}
      divider={<Divider orientation="vertical" />}
      alignItems={"center"}
    >
      {keys.map(({ name, flex }, i) => (
        <p key={i} style={{ flex }}>
          {data[name]}
        </p>
      ))}
      <Stack
        flex={1}
        px={"10px"}
        flexDirection={"row"}
        justifyContent={"space-around"}
      >
        <CustomIconButton
          color="info"
          onClick={() => handleClick("edit", data)}
        >
          <Edit />
        </CustomIconButton>
        <CustomIconButton
          color="error"
          onClick={() => handleClick("delete", data)}
        >
          <Delete />
        </CustomIconButton>
      </Stack>
    </Stack>
  );
};

const UpdateForm = ({ state }) => {
  const { action, data, method, message } = state;
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
          method(data.UserID, updatedData);
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

const Label = () => {
  return (
    <Stack
      direction={"row"}
      divider={<Divider orientation="vertical" />}
      sx={{ fontWeight: "bold" }}
      className="userData"
    >
      {keys.map(({ name, flex }, i) => (
        <p key={i} style={{ flex }}>
          {name}
        </p>
      ))}
      <p style={{ flex: 1, padding: "0 10px" }}>Modify</p>
    </Stack>
  );
};
export default ManageUser;

const keys = [
  { name: "UserID", type: "text", isDasabled: true, flex: 1 },
  { name: "FullName", type: "text", isDasabled: false, flex: 1 },
  { name: "Email", type: "text", isDasabled: false, flex: 1.5 },
  { name: "DateOfBirth", type: "date", isDasabled: false, flex: 1 },
  { name: "Title", type: "text", isDasabled: false, flex: 1 },
  { name: "Type", type: "text", isDasabled: false, flex: 1 },
  { name: "Mobile", type: "text", isDasabled: false, flex: 1 },
  { name: "Company", type: "text", isDasabled: false, flex: 1.5 },
  { name: "Nationality", type: "text", isDasabled: false, flex: 1 },
  { name: "Bank", type: "text", isDasabled: false, flex: 1.5 },
];
