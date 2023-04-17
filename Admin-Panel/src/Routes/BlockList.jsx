import {
  Button,
  Divider,
  Drawer,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { dbClient } from "../Api/Client";
import { Delete, Edit, PublishedWithChanges } from "@mui/icons-material";

const BlockList = () => {
  const [data, setData] = useState([]);
  const [snakeBarStare, setSnakeBarStare] = useState(false);

  const FETCHDATA = async () => {
    try {
      const { data } = await dbClient.get("/viewData/block");
      setData(data);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    FETCHDATA();
  }, []);

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

  const handleClick = async (data) => {
    await dbClient
      .post("/blockUser/unblock", { UserID: data.UserID })
      .then(() => {
        setSnakeBarStare(true);
        FETCHDATA();
      })
      .catch(() => {});
  };

  return (
    <Stack className="rightContainer" spacing={1}>
      <div className="header">
        <p>Block List</p>
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
      </Stack>
      <Snackbar
        open={snakeBarStare}
        autoHideDuration={6000}
        onClose={() => setSnakeBarStare(false)}
        message="User Removed from Blocklist"
      />
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
        <CustomIconButton color="info" onClick={() => handleClick(data)}>
          <PublishedWithChanges />
        </CustomIconButton>
      </Stack>
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
      <p style={{ flex: 1, padding: "0 10px" }}>Unblock</p>
    </Stack>
  );
};
export default BlockList;

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
