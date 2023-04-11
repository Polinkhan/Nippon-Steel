import { Search } from "@mui/icons-material";
import { Stack } from "@mui/material";

const DashboardPage = () => {
  return (
    <Stack direction={"row"} className="rightContainer" spacing={1}>
      <Stack flex={3} className="dashboardBody" spacing={1}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          className="header"
        >
          <p>Dashboard</p>
          <Search />
        </Stack>
        <Stack flex={1} sx={{ backgroundColor: "#fff" }}></Stack>
      </Stack>
      <Stack flex={1} className="userInfoBody"></Stack>
    </Stack>
  );
};

export default DashboardPage;
