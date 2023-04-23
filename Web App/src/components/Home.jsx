import { Stack } from "@mui/material";
import React from "react";
import { Colors } from "../Constents/Colors";
import { HomeRounded } from "@mui/icons-material";
import { useDataContext } from "../Contexts/DataContext";
import avaterImg from "../assets/SVG/Avater.svg";
import Header from "./Header";

const Home = () => {
  const { currentUser } = useDataContext();
  const { FullName, Title } = currentUser;
  console.log(currentUser);
  return (
    <Stack flex={1} sx={{ color: "#fff" }}>
      <Header name={"Home"} Icon={HomeRounded} />
      <Stack flex={1} spacing={2} sx={{ p: 2 }}>
        <Stack flex={2} className="homeHeaderDiv">
          <Stack p={3} direction={"row"} justifyContent={"space-between"}>
            <Stack spacing={1}>
              <p style={{ fontSize: 16 }}>Hello , {FullName}</p>
              <p>{Title}</p>
            </Stack>
            <Stack>
              <img src={avaterImg} className="avater" width={50} />
            </Stack>
          </Stack>
        </Stack>
        <Stack
          flex={3}
          sx={{ backgroundColor: "blue", borderRadius: 2 }}
        ></Stack>
        <Stack
          flex={3}
          sx={{ backgroundColor: "green", borderRadius: 2 }}
        ></Stack>
      </Stack>
    </Stack>
  );
};

export default Home;
