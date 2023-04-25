import { HomeRounded, Search, Settings } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Colors } from "../Constents/Colors";

const RootPage = () => {
  const [bottomRoute, setBottomRoute] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ pathname: "/home" });
  }, []);

  return (
    <Stack height={"100%"}>
      <Stack flex={1} sx={{ backgroundColor: "#fff" }} overflow={"auto"}>
        <Outlet />
      </Stack>
      <BottomNavigation
        sx={{ backgroundColor: "#eee" }}
        showLabels
        value={bottomRoute}
        onChange={(event, i) => {
          setBottomRoute(i);
          navigate({ pathname: routes[i] });
        }}
      >
        <BottomNavigationAction
          icon={
            <HomeRounded
              color={bottomRoute === 0 ? "white" : "primary"}
              sx={bottomRoute === 0 ? activeIcon : {}}
            />
          }
        />
        <BottomNavigationAction
          icon={
            <Search
              color={bottomRoute === 1 ? "white" : "primary"}
              sx={bottomRoute === 1 ? activeIcon : {}}
            />
          }
        />
        <BottomNavigationAction
          icon={
            <Settings
              color={bottomRoute === 2 ? "white" : "primary"}
              sx={bottomRoute === 2 ? activeIcon : {}}
            />
          }
        />
      </BottomNavigation>
    </Stack>
  );
};

export default RootPage;

const activeIcon = {
  px: "20px",
  py: "4px",
  backgroundColor: Colors.Primary,
  borderRadius: 999,
};

const routes = ["home", "search", "setting"];
