import { IconButton, Stack } from "@mui/material";
import Header from "../components/Header";
import { dbClient } from "../Api/Client";
import { useEffect, useState } from "react";
import { MailOutline, Phone } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Colors } from "../Constents/Colors";

const ContactAdmin = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    dbClient.get("adminContactList").then((res) => setData(res.data));
  }, []);
  return (
    <Stack flex={1} sx={{ backgroundColor: "#fff" }}>
      <Header name={"Contact Admin"} />
      <Stack p={2} spacing={2}>
        {data.map((item, i) => (
          <CustomButton key={i} item={item} />
        ))}
      </Stack>
    </Stack>
  );
};

const CustomButton = ({ item }) => {
  return (
    <Stack className="adminInfo">
      {Object.keys(item).map((label, i) => {
        if (label === "ID") return;
        return <p key={i}>{item[label]}</p>;
      })}
      <Stack py={1} direction={"row"}>
        <IconButton>
          <Link
            to={`tel:${item.Number}`}
            style={{ width: 25, height: 25, color: Colors.Primary }}
          >
            <Phone sx={{ fontSize: 20 }} />
          </Link>
        </IconButton>
        <IconButton>
          <Link
            to={`mailto:${item.Email}`}
            style={{ width: 25, height: 25, color: Colors.Primary }}
          >
            <MailOutline sx={{ fontSize: 20 }} />
          </Link>
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default ContactAdmin;
