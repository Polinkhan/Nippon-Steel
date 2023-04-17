import { Launch, Person, Search } from "@mui/icons-material";
import { Divider, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import AreaChartView from "../components/AreaChartView";
import { useDataContext } from "../contexts/DataContext";

const DashboardPage = () => {
  const { currentUser } = useDataContext();
  return (
    <Stack direction={"row"} className="rightContainer" spacing={1}>
      <Stack flex={4} spacing={1}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          className="header"
        >
          <p>Dashboard</p>
          <Search />
        </Stack>
        <Stack flex={1} className="dashboardBody" divider={<Divider />}>
          <Stack
            flex={1}
            direction={"row"}
            justifyContent={"center"}
            spacing={5}
            flexWrap={"wrap"}
            alignItems={"flex-start"}
          >
            {data.map((elem, i) => (
              <Stack key={i} direction={"row"} className="dashboardItemBox">
                <Stack flex={1} justifyContent={"space-between"}>
                  <p style={{ fontSize: 18, fontWeight: "bold" }}>
                    {elem.header}
                  </p>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <p>{elem.message}</p>
                    {elem.count && (
                      <p style={{ fontWeight: "bold", fontSize: 32 }}>
                        {elem.count}
                      </p>
                    )}
                  </Stack>
                </Stack>
                {elem.linkTo && (
                  <Link to={elem.linkTo} style={{ zIndex: 2 }}>
                    <Launch className="dashboardItemIcon" />
                  </Link>
                )}
                <div className="dashboardItemBoxHover" />
              </Stack>
            ))}
            <div className="dashboardAbsolute" />
          </Stack>
          <Stack flex={2} py={1}>
            <div>Summary</div>
            <AreaChartView ChartData={ChartData} />
          </Stack>
        </Stack>
      </Stack>
      <Stack flex={1} spacing={2} className="userInfoBody">
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          style={{
            border: "1px solid black",
            width: "60px",
            height: "60px",
            borderRadius: 999,
          }}
        >
          <Person sx={{ fontSize: 50 }} />
        </Stack>
        <p>{currentUser.AccountType}</p>
        <p>{currentUser.FullName}</p>
        <p>{currentUser.Email}</p>
      </Stack>
    </Stack>
  );
};

export default DashboardPage;

const data = [
  { header: "Total Registered User", message: "Total User", count: 265 },
  { header: "Active User", message: "Active User", count: 26 },
  {
    header: "Manage User",
    message: "Navigate to Manage User",
    linkTo: "/manageUser",
  },
  {
    header: "App Settings",
    message: "Navigate to App Settings",
    linkTo: "/appSettings",
  },
];

const ChartData = [
  {
    name: "Page A",
    price: 4000,
    // pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    price: 3000,
    // pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    price: 2000,
    // pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    price: 2780,
    // pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    price: 1890,
    // pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    price: 2390,
    // pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    price: 3490,
    pv: 4300,
    amt: 2100,
  },
];
