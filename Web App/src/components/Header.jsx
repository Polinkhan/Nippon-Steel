import { Stack } from "@mui/material";
import React from "react";
import { Colors } from "../Constents/Colors";
import { HomeRounded } from "@mui/icons-material";

const Header = ({ name, Icon, style = {} }) => {
  return (
    <Stack
      style={style}
      px={2}
      spacing={1}
      direction={"row"}
      alignItems={"center"}
      sx={{ height: "50px", color: "#fff", backgroundColor: Colors.Primary }}
    >
      {Icon && <Icon color="white" />}
      <p>{name}</p>
    </Stack>
  );
};

export default Header;
