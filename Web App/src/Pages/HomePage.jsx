import { HomeRounded, Search, Settings } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Stack } from "@mui/material";
import React, { useState } from "react";
import SearchReport from "../components/SearchReport";
import Home from "../components/Home";
import Setting from "../components/Setting";

const HomePage = () => {
  const [bottomRoute, setBottomRoute] = useState(0);
  return (
    <Stack height={"100%"}>
      <Stack flex={1} sx={{ backgroundColor: "#fff" }}>
        {bottomRoute === 0 && <Home />}
        {bottomRoute === 1 && <SearchReport />}
        {bottomRoute === 2 && <Setting />}
      </Stack>
      <BottomNavigation
        sx={{ backgroundColor: "#eee" }}
        showLabels
        value={bottomRoute}
        onChange={(event, newValue) => setBottomRoute(newValue)}
      >
        <BottomNavigationAction label="Home" icon={<HomeRounded />} />
        <BottomNavigationAction label="Search" icon={<Search />} />
        <BottomNavigationAction label="Settings" icon={<Settings />} />
      </BottomNavigation>
    </Stack>
  );
};

export default HomePage;
