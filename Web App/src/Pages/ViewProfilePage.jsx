import { Divider, Stack } from "@mui/material";
import Header from "../components/Header";
import imgSrc from "../assets/SVG/View_Profile.svg";
import { useWindowDimensions } from "../Hooks/useWindowDimensions";
import { useEffect, useState } from "react";
import { useDataContext } from "../Contexts/DataContext";
import { dbClient } from "../Api/Client";

const ViewProfilePage = () => {
  const { height } = useWindowDimensions();
  const [data, setData] = useState([]);
  const { currentUser } = useDataContext();
  const { UserID } = currentUser;

  useEffect(() => {
    dbClient
      .get(`/viewData/${UserID}`)
      .then(({ data }) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Stack flex={1} sx={{ backgroundColor: "#fff" }}>
      <Header name={"View Profile "} style={{ position: "sticky", top: 0 }} />
      <Stack flex={1} p={2} spacing={2} divider={<Divider />}>
        <Stack
          alignItems={"center"}
          sx={{ position: "sticky", top: 50, backgroundColor: "#fff" }}
        >
          <img src={imgSrc} width={height / 6} style={{ margin: "20px 0" }} />
        </Stack>
        <Stack flex={1} spacing={2}>
          {Object.keys(data).map((label, i) => (
            <Stack key={i} p={2} direction={"row"} className="ProfileInfo">
              <p style={{ flex: 5 }}>{label}</p>
              <p style={{ flex: 1 }}>:</p>
              <p style={{ flex: 10 }}>{data[label]}</p>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ViewProfilePage;
