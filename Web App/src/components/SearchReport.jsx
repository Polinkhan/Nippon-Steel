import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { dbClient } from "../Api/Client";
import { yearData, monthData } from "../Constents/StaticData";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useDataContext } from "../Contexts/DataContext";
import { Colors } from "../Constents/Colors";
import { Search } from "@mui/icons-material";
import img from "../assets/SVG/OFS_Search.svg";
import { useWindowDimensions } from "../Hooks/useWindowDimensions";
import Header from "./Header";

const SearchReport = () => {
  const [typeData, setTypeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snakeBarStare, setSnakeBarStare] = useState({ state: false });
  const [selected, setSelected] = useState({ Type: "", Year: "", Month: "" });
  const { currentUser } = useDataContext();
  const { UserID } = currentUser;

  useEffect(() => {
    dbClient
      .get("app/typeList")
      .then((res) => setTypeData(res.data))
      .catch((err) => toast.error(err?.response?.data?.message));
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const { Type, Month, Year } = selected;
    dbClient
      .post(`getPayslipData/${UserID}`, {
        type: Type,
        month: Month,
        year: Year,
      })
      .then(async ({ data }) => {
        console.log(data);
        navigate({
          pathname: "/view",
          search: createSearchParams({
            uri: JSON.stringify(data),
          }).toString(),
        });
      })
      .catch((err) => {
        setSnakeBarStare({ state: true, message });
      })
      .finally(() => setLoading(false));
  };

  const { height } = useWindowDimensions();

  return (
    <>
      <form className="SearchForm" onSubmit={handleSubmit}>
        <Header name={"Search Report"} Icon={Search} />
        <Stack
          flex={1}
          justifyContent={"center"}
          alignItems={"center"}
          color={"#000"}
        >
          <img src={img} width={height / 7} />
          <p>OFS Crew Document Search</p>
        </Stack>
        <Stack flex={2} sx={{ px: 8, py: 4 }} justifyContent={"space-between"}>
          <Stack spacing={3}>
            <CustomSelect
              data={typeData}
              name={"Type"}
              selected={selected}
              setSelected={setSelected}
            />
            <CustomSelect
              data={yearData}
              name={"Year"}
              selected={selected}
              setSelected={setSelected}
            />
            <CustomSelect
              data={monthData}
              name={"Month"}
              selected={selected}
              setSelected={setSelected}
            />
          </Stack>
          <Stack>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ padding: "12px" }}
            >
              {loading ? (
                <CircularProgress color="white" size={23} />
              ) : (
                "Search"
              )}
            </Button>
          </Stack>
        </Stack>
        <Snackbar
          open={snakeBarStare.state}
          autoHideDuration={6000}
          onClose={() => setSnakeBarStare({ state: false })}
          message={snakeBarStare.message}
          // action={action}
        />
      </form>
    </>
  );
};

const CustomSelect = ({ data, name, selected, setSelected }) => {
  return (
    <FormControl>
      <InputLabel>{name}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selected[name]}
        label="Age"
        onChange={(e) =>
          setSelected((prev) => ({ ...prev, [name]: e.target.value }))
        }
      >
        {data.map((item, i) => {
          if (name === "Type") {
            const { Type } = item;
            return (
              <MenuItem key={i} value={Type}>
                {Type}
              </MenuItem>
            );
          } else {
            const { name, value } = item;
            return (
              <MenuItem key={i} value={value}>
                {name}
              </MenuItem>
            );
          }
        })}
      </Select>
    </FormControl>
  );
};

export default SearchReport;
