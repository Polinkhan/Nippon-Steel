import { Link, Outlet, useLocation } from "react-router-dom";
import BlockIcon from "@mui/icons-material/Block";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import AppSettingsAltRoundedIcon from "@mui/icons-material/AppSettingsAltRounded";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import AppSettingsAltOutlinedIcon from "@mui/icons-material/AppSettingsAltOutlined";
import "react-toastify/dist/ReactToastify.css";
import { Drawer, Stack } from "@mui/material";
import Navbar from "../components/Navbar";
import { useDataContext } from "../contexts/DataContext";
import useResponsiveSizes from "../hooks/useResponsiveSizes";
import { useState } from "react";

const RootPage = () => {
  const { lg, regulerFontSize } = useResponsiveSizes();
  const [drawer, setDrawer] = useState(false);
  return (
    <Stack
      height={"calC(100vh - 16px)"}
      spacing={1}
      p={1}
      sx={{ backgroundColor: "#ddd" }}
      fontSize={regulerFontSize}
    >
      <Navbar setDrawer={setDrawer} />
      <Stack direction={"row"} flex={1} spacing={1}>
        {lg ? (
          <Sidebar />
        ) : (
          <Drawer
            anchor={"left"}
            open={drawer}
            onClose={() => setDrawer(false)}
          >
            <Sidebar setDrawer={setDrawer} />
          </Drawer>
        )}
        <Stack flex={1} overflow={"auto"}>
          <Outlet />
        </Stack>
      </Stack>
    </Stack>
  );
};

const Sidebar = ({ setDrawer }) => {
  const { currentUser, setCurrentUser } = useDataContext();
  const { regulerFontSize } = useResponsiveSizes();
  return (
    <div className="sideContainer">
      <Stack spacing={1}>
        {data.map((item) => {
          if (
            item.name === "Manage Admin" &&
            currentUser.AccountLavel === "Moderator"
          )
            return;
          return (
            <SidebarItem key={item.id} item={item} setDrawer={setDrawer} />
          );
        })}
      </Stack>
      <div
        className="sidebarItem"
        style={{
          display: "flex",
          width: "100%",
          cursor: "pointer",
          alignItems: "center",
        }}
        onClick={() => {
          localStorage.removeItem("accessToken");
          setCurrentUser(null);
        }}
      >
        <LogoutOutlinedIcon style={{ flex: 1 }} color={"white"} />
        <p style={{ fontSize: regulerFontSize, flex: 2, color: "#fff" }}>
          Sign out
        </p>
        {/* </Stack> */}
      </div>
    </div>
  );
};

const SidebarItem = ({ item, setDrawer }) => {
  const location = useLocation();
  const currentUri = decodeURI(location.pathname);
  const { regulerFontSize } = useResponsiveSizes();

  const isSelected = currentUri === item.routeName;
  const linearBackground =
    "linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%)";

  if (isSelected) {
    return (
      <Stack
        fontSize={regulerFontSize}
        direction={"row"}
        className="sidebarItem"
        alignItems={"center"}
        style={{
          cursor: "pointer",
          borderWidth: 3,
          background: linearBackground,
        }}
      >
        <item.activeIcon style={{ margin: "0 20px" }} color={"white"} />
        <p style={{ flex: 1, color: "#fff", marginLeft: 15 }}>{item.name}</p>
      </Stack>
    );
  }

  return (
    <Link
      to={item.routeName}
      style={{ textDecoration: "none", fontSize: regulerFontSize }}
      onClick={() => {
        setDrawer && setDrawer(false);
      }}
    >
      <Stack direction={"row"} className="sidebarItem" alignItems={"center"}>
        <item.inActiveIcon style={{ margin: "0 20px" }} color={"light"} />
        <p className="text" style={{ flex: 1, color: "rgba(255,255,255,0.5)" }}>
          {item.name}
        </p>
      </Stack>
    </Link>
  );
};
export default RootPage;

const data = [
  {
    id: 1,
    name: "Dashboard",
    routeName: "/dashboard",
    activeIcon: (props) => <SpaceDashboardIcon {...props} />,
    inActiveIcon: (props) => <SpaceDashboardOutlinedIcon {...props} />,
  },
  {
    id: 2,
    name: "Register User",
    routeName: "/register",
    activeIcon: (props) => <PersonAddRoundedIcon {...props} />,
    inActiveIcon: (props) => <PersonAddOutlinedIcon {...props} />,
  },
  {
    id: 3,
    name: "Manage User",
    routeName: "/manageUser",
    activeIcon: (props) => <PeopleAltRoundedIcon {...props} />,
    inActiveIcon: (props) => <PeopleAltOutlinedIcon {...props} />,
  },
  {
    id: 4,
    name: "User Block List",
    routeName: "/blockList",
    activeIcon: (props) => <BlockIcon {...props} />,
    inActiveIcon: (props) => <BlockIcon {...props} />,
  },
  {
    id: 5,
    name: "Manage Admin",
    routeName: "/manageAdmin",
    activeIcon: (props) => <PeopleAltRoundedIcon {...props} />,
    inActiveIcon: (props) => <PeopleAltOutlinedIcon {...props} />,
  },
  {
    id: 6,
    name: "App Settings",
    routeName: "/appSettings",
    activeIcon: (props) => <AppSettingsAltRoundedIcon {...props} />,
    inActiveIcon: (props) => <AppSettingsAltOutlinedIcon {...props} />,
  },
];
