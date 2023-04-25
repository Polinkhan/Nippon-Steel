import { IconButton, Stack } from "@mui/material";
import Header from "../components/Header";
import logo from "/Logo.svg";
import { useWindowDimensions } from "../Hooks/useWindowDimensions";
import { EmailRounded, FacebookRounded } from "@mui/icons-material";
import { Colors } from "../Constents/Colors";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const { height } = useWindowDimensions();
  return (
    <Stack flex={1} sx={{ backgroundColor: "#fff" }}>
      <Header name={"About App"} />
      <Stack flex={1} px={6} py={4}>
        <Stack flex={1} alignItems={"center"} spacing={2}>
          <img src={logo} alt="Nippon Steel Engineering" width={height / 10} />
          <p style={{ color: "gray", fontWeight: "bold", letterSpacing: 1 }}>
            NIPPON STEEL ENGINEERING CO.,LTD.
          </p>
          <p style={{ fontSize: 12, color: "gray" }}>Version : 1.1.13</p>
          <p style={{ fontSize: 12, color: "gray" }}>www.eng.nipponsteel.com</p>
        </Stack>
        <Stack spacing={2}>
          <Stack spacing={2} direction={"row"} justifyContent={"center"}>
            <CustomIconButton Icon={EmailRounded} />
            <CustomIconButton Icon={FacebookRounded} />
          </Stack>
          <CustomLabel text={"Developed by : Md Naeem Khan"} />
        </Stack>
      </Stack>
    </Stack>
  );
};

const CustomIconButton = ({ Icon }) => {
  return (
    <IconButton sx={{ backgroundColor: "#eee" }}>
      <Link
        to={"https://www.facebook.com/it.naeem"}
        style={{ width: 25, height: 25, color: Colors.Primary }}
      >
        <Icon />
      </Link>
    </IconButton>
  );
};

const CustomLabel = ({ text }) => {
  return (
    <Stack
      p={1}
      alignItems={"center"}
      sx={{ backgroundColor: Colors.Primary, color: "#fff", borderRadius: 999 }}
    >
      {text}
    </Stack>
  );
};

export default AboutPage;
