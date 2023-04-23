import { Stack } from "@mui/material";
import React from "react";
import { LogoutRounded, Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Header from "./Header";
import { useWindowDimensions } from "../Hooks/useWindowDimensions";
import { useDataContext } from "../Contexts/DataContext";
import ViewProfile from "../assets/SVG/View_Profile.svg";
import ChangePassword from "../assets/SVG/Change_Password.svg";
import Teams from "../assets/SVG/Teams.svg";
import ContactAdmin from "../assets/SVG/Contact_Admin.svg";
import AboutApp from "../assets/SVG/About_App.svg";
import SettingImg from "../assets/SVG/Settings.svg";
import useResponsiveSizes from "../Hooks/useResponsivesizes";

const Setting = () => {
  const { width, height } = useWindowDimensions();
  const { setCurrentUser } = useDataContext();
  const { sm } = useResponsiveSizes();
  const WIDTH = sm ? width : 500;

  const handleLogout = () => {
    if (confirm("Confirm Logout ?")) {
      localStorage.removeItem("accessToken");
      setCurrentUser(null);
    } else {
    }
  };

  return (
    <Stack flex={1} sx={{ color: "#f2f2f2" }}>
      <Header name={"Settings"} Icon={Settings} />
      <Stack flex={1} justifyContent={"space-around"} alignItems={"center"}>
        <img src={SettingImg} width={height / 5} />
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#000", fontSize: 14 }}>
            OFFSHORE SUPPORT PTE LTD
          </p>
          <p style={{ color: "gray" }}>Mobile Salary Share App</p>
        </div>
      </Stack>
      <Stack
        py={5}
        direction={"row"}
        sx={{ px: "10px", flexWrap: "wrap" }}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
      >
        {settingsData.map((item, i) => (
          <CustomLinkButton key={i} item={item} />
        ))}
        <div style={{ width: WIDTH / 2 - 15 }} onClick={handleLogout}>
          <Stack p={2} className="customSettingsPage">
            <LogoutRounded sx={{ fontSize: 28 }} />
            <p>Logout</p>
          </Stack>
        </div>
      </Stack>
    </Stack>
  );
};

const CustomLinkButton = ({ item }) => {
  const { name, linkTo, imgSrc } = item;
  const { width } = useWindowDimensions();
  const { sm } = useResponsiveSizes();
  const WIDTH = sm ? width : 500;
  return (
    <Link to={linkTo} style={{ width: WIDTH / 2 - 15, textDecoration: "none" }}>
      <Stack p={2} className="customSettingsPage">
        <img src={imgSrc} width={40} />
        <p>{name}</p>
      </Stack>
    </Link>
  );
};

export default Setting;

const settingsData = [
  { name: "View Profile", linkTo: "profile", imgSrc: ViewProfile },
  { name: "Change Password", linkTo: "changePassword", imgSrc: ChangePassword },
  { name: "Teams", linkTo: "teams", imgSrc: Teams },
  { name: "Contact Admin", linkTo: "contactAdmin", imgSrc: ContactAdmin },
  { name: "About App", linkTo: "aboutApp", imgSrc: AboutApp },
];
