import { Button, Stack } from "@mui/material";
import logo from "../assets/Untitled.svg";
import { Menu } from "@mui/icons-material";
import useResponsiveSizes from "../Hooks/useResponsivesizes";

const Navbar = ({ setDrawer }) => {
  const { lg } = useResponsiveSizes();
  return (
    <Stack direction={"row"} alignItems={"center"} className="navbar">
      {!lg && (
        <Stack flex={1} alignItems={"center"}>
          <CustomIconButton onClick={() => setDrawer(true)}>
            <Menu color="white" />
          </CustomIconButton>
        </Stack>
      )}
      <Stack flex={5}>
        <img className="navLogo" src={logo} />
      </Stack>
    </Stack>
  );
};

const CustomIconButton = (props) => {
  return (
    <Button
      variant="outlined"
      color="white"
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

export default Navbar;
