import {
  Button,
  Divider,
  Drawer,
  IconButton,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { dbClient } from "../Api/Client";
import { Block, Close, CloseSharp, Delete, Edit } from "@mui/icons-material";
import useResponsiveSizes from "../hooks/useResponsiveSizes";

const ManageUser = () => {
  const [data, setData] = useState([]);
  const [drawerState, setDrawerState] = useState({ state: false });
  const [snakeBarStare, setSnakeBarStare] = useState({ state: false });

  const FETCHDATA = async () => {
    try {
      const { data } = await dbClient.get("/viewData/unblock");
      console.log(data);
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
      setDrawerState({ state: false });
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
        closeDrawer: () => setDrawerState({ state: false }),
        message: "Change and click update to modify the data",
      });
    } else if (type === "delete") {
      setDrawerState({
        data,
        state: true,
        action: "confirm delete",
        method: handleDelete,
        closeDrawer: () => setDrawerState({ state: false }),
        message: "Are you sure you want to delete the user data?",
      });
    } else if (type === "block") {
      await dbClient
        .post("/blockUser/block", { UserID: data.UserID })
        .then(() => {
          setSnakeBarStare({ state: true, id: data.UserID });
          FETCHDATA();
        })
        .catch(() => {});
    }
  };

  const handleUndo = async () => {
    await dbClient.post("/blockUser/unblock", { UserID: snakeBarStare.id });
    setSnakeBarStare({ state: false });
    FETCHDATA();
  };

  const action = (
    <Fragment>
      <Button color="white" size="small" onClick={handleUndo}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setSnakeBarStare({ state: false })}
      >
        <Close />
      </IconButton>
    </Fragment>
  );

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
          overflow={"auto"}
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
        <Snackbar
          open={snakeBarStare.state}
          autoHideDuration={6000}
          onClose={() => setSnakeBarStare({ state: false })}
          message="User Moved to Blocklist"
          action={action}
        />
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
  const { lg } = useResponsiveSizes();
  const ShowData = lg ? keys : mobkeys;
  return (
    <Stack
      className="userData"
      direction={"row"}
      divider={<Divider orientation="vertical" />}
      alignItems={"center"}
    >
      {ShowData.map(({ name, flex }, i) => (
        <p key={i} style={{ flex }}>
          {data[name]}
        </p>
      ))}

      <Stack
        flex={1.5}
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
        <CustomIconButton
          color="warning"
          onClick={() => handleClick("block", data)}
        >
          <Block />
        </CustomIconButton>
      </Stack>
    </Stack>
  );
};

const UpdateForm = ({ state }) => {
  const { action, data, method, message, closeDrawer } = state;
  const [updatedData, setUpdatedData] = useState(data);
  const { lg } = useResponsiveSizes();

  return (
    <Stack py={5} spacing={3} width={lg ? 500 : "100vw"} divider={<Divider />}>
      <Stack direction={"row"} alignItems={"center"}>
        <Stack style={{ flex: 1 }} alignItems={"center"}>
          <CustomIconButton onClick={closeDrawer}>
            <CloseSharp />
          </CustomIconButton>
        </Stack>
        <p style={{ flex: 5, fontWeight: "bold" }}>{message}</p>
      </Stack>
      <form
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
        onSubmit={(e) => {
          e.preventDefault();
          method(data.UserID, updatedData);
        }}
      >
        <Stack p={3} spacing={3}>
          {keys.map(({ name, isDasabled, type }, i) => (
            <Stack key={i} direction={"row"} alignItems={"center"}>
              <p style={{ flex: 1.5 }}>{name}</p>
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
  const { lg } = useResponsiveSizes();
  const ShowData = lg ? keys : mobkeys;
  return (
    <Stack
      direction={"row"}
      divider={<Divider orientation="vertical" />}
      sx={{ fontWeight: "bold" }}
      className="userData"
    >
      {ShowData.map(({ name, flex }, i) => (
        <p key={i} style={{ flex }}>
          {name}
        </p>
      ))}
      <p style={{ flex: 1.5, padding: "0 10px" }}>Modify</p>
    </Stack>
  );
};

export default ManageUser;

const keys = [
  { name: "UserID", type: "text", isDasabled: true, flex: 1 },
  { name: "FullName", type: "text", isDasabled: false, flex: 1 },
  { name: "Email", type: "text", isDasabled: false, flex: 1.5 },
  { name: "Password", type: "text", isDasabled: false, flex: 1 },
  { name: "DateOfBirth", type: "date", isDasabled: false, flex: 1 },
  { name: "Title", type: "text", isDasabled: false, flex: 1 },
  { name: "Type", type: "text", isDasabled: false, flex: 1 },
  { name: "Mobile", type: "text", isDasabled: false, flex: 1 },
  { name: "Company", type: "text", isDasabled: false, flex: 1.5 },
  { name: "Nationality", type: "text", isDasabled: false, flex: 1 },
  { name: "Bank", type: "text", isDasabled: false, flex: 1.5 },
];

const mobkeys = [
  { name: "UserID", type: "text", isDasabled: true, flex: 1 },
  { name: "FullName", type: "text", isDasabled: false, flex: 2 },
];
