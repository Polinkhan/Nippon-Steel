import { Stack } from "@mui/material";
import logo from "../assets/Untitled.svg";

const Navbar = () => {
  return (
    <Stack direction={"row"} alignItems={"center"} className="navbar">
      <Stack flex={1}>
        <img className="navLogo" src={logo} />
      </Stack>
      <Stack flex={1}></Stack>
    </Stack>
  );
};
export default Navbar;
