import { Link, Outlet, useLocation } from "react-router-dom";
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Stack } from "@mui/material";
import Navbar from "../components/Navbar";

const toastConfig = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "colored",
};

const RootPage = () => {
  return (
    <Stack
      height={"calC(100vh - 16px)"}
      spacing={1}
      p={1}
      sx={{ backgroundColor: "#ddd" }}
    >
      <Navbar />
      <Stack direction={"row"} flex={1} spacing={1}>
        <Sidebar />
        <Stack flex={1}>
          <Outlet />
          <ToastContainer {...toastConfig} />
        </Stack>
      </Stack>
    </Stack>
  );
};

const Sidebar = () => {
  return (
    <Stack justifyContent={"space-between"} className="sideContainer">
      <Stack spacing={1}>
        {data.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </Stack>
      <div style={{ width: "100%" }}>
        <Stack
          direction={"row"}
          className="sidebarItem"
          style={{ cursor: "pointer" }}
        >
          <LogoutOutlinedIcon style={{ flex: 1 }} color={"white"} />
          <p style={{ flex: 2, color: "#fff" }}>Sign out</p>
        </Stack>
      </div>
    </Stack>
  );
};

const SidebarItem = ({ item }) => {
  const location = useLocation();
  const currentUri = decodeURI(location.pathname);

  const isSelected = currentUri === item.routeName;
  const linearBackground =
    "linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%)";

  if (isSelected) {
    return (
      <Stack
        direction={"row"}
        className="sidebarItem"
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
    <Link to={item.routeName} style={{ textDecoration: "none" }}>
      <Stack direction={"row"} className="sidebarItem">
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
    name: "View mySQL Data",
    routeName: "/database",
    activeIcon: (props) => <StorageRoundedIcon {...props} />,
    inActiveIcon: (props) => <StorageRoundedIcon {...props} />,
  },
  {
    id: 5,
    name: "App Settings",
    routeName: "/appSettings",
    activeIcon: (props) => <AppSettingsAltRoundedIcon {...props} />,
    inActiveIcon: (props) => <AppSettingsAltOutlinedIcon {...props} />,
  },
];
