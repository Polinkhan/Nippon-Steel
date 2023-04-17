import { dbClient } from "../Api/Client";
import { useEffect, useState } from "react";
import { FormControl, MenuItem, Select, Stack } from "@mui/material";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ViewDatabasePage = () => {
  // const [data, setData] = useState([]);
  // const [databaseName, setDatabaseName] = useState("Credentials");
  // console.log(data);

  // useEffect(() => {
  //   dbClient
  //     .get(`/viewTable/${databaseName}`)
  //     .then(({ data }) => {
  //       setData(data);
  //     })
  //     .catch((err) => {});
  // }, [databaseName]);

  return (
    <Stack className="rightContainer" spacing={1}>
      <Stack className="header" direction={"row"} alignItems={"center"}>
        <p>Database Data</p>
        {/* <FormControl>
          <Select
            defaultValue="Credentials"
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={databaseName}
            onChange={(e) => setDatabaseName(e.target.value)}
            inputProps={{}}
            sx={{ backgroundColor: "#fff" }}
          >
            <MenuItem value={"Credentials"}>Credentials</MenuItem>
            <MenuItem value={"Information"}>Information</MenuItem>
            <MenuItem value={"AdminContactList"}>AdminContactList</MenuItem>
            <MenuItem value={"DocumentTypes"}>DocumentTypes</MenuItem>
          </Select>
        </FormControl> */}
      </Stack>
      <Stack flex={1} sx={{ backgroundColor: "#fff" }}></Stack>
    </Stack>
  );
};

export default ViewDatabasePage;
