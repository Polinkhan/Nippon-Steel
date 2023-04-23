import { Stack } from "@mui/material";
import loading from "../assets/Lottie/DefaultLoading.json";
import Lottie from "lottie-react";

const Loading = ({ height, width }) => {
  return (
    <Stack sx={{ height: "100vh", justifyContent: "center" }}>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ height, width, backgroundColor: "#fff" }}
      >
        <Lottie animationData={loading} loop={true} style={{ width: 200 }} />
      </Stack>
    </Stack>
  );
};
export default Loading;
