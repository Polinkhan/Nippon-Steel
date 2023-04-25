import { Button, CircularProgress, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { HomeRounded, PictureAsPdfRounded } from "@mui/icons-material";
import { useDataContext } from "../Contexts/DataContext";
import avaterImg from "../assets/SVG/Avater.svg";
import Header from "./Header";
import { dbClient } from "../Api/Client";
import { createSearchParams, useNavigate } from "react-router-dom";

const Home = () => {
  const { currentUser } = useDataContext();
  const { UserID, FullName, Title } = currentUser;
  const [pdfHistory, setPdfHistory] = useState([]);
  const [loading, setLoading] = useState(-1);
  const [imageData, setImageData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    dbClient.get("dashboardPicture").then(({ data }) => {
      setImageData(data);
    });

    const pdfViewed = JSON.parse(localStorage.getItem("pdfViewed")) || [];
    setPdfHistory(pdfViewed);
  }, []);

  return (
    <Stack flex={1} sx={{ color: "#fff" }} overflow={"auto"}>
      <Header name={"Home"} Icon={HomeRounded} />
      <Stack flex={1} spacing={2} sx={{ p: 2 }} overflow={"auto"}>
        <Stack flex={2} className="homeHeaderDiv">
          <Stack p={3} direction={"row"} justifyContent={"space-between"}>
            <Stack spacing={1}>
              <p style={{ fontSize: 16 }}>Hello , {FullName}</p>
              <p>{Title}</p>
            </Stack>
            <div
              onClick={() => {
                navigate({ pathname: "/profile" });
              }}
            >
              <img src={avaterImg} className="avater" width={50} />
            </div>
          </Stack>
        </Stack>
        <Stack
          direction={"row"}
          flex={3}
          sx={{ borderRadius: 2 }}
          overflow={"auto"}
          className="imageBox"
        >
          {imageData.map(({ url }, i) => (
            <img key={i} src={url} width={"100%"} />
          ))}
        </Stack>
        <Stack flex={3} className="pdfHistoryBox">
          <Stack
            pb={2}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <p>Recently Viewed Documents</p>
            <Button
              onClick={() => {
                localStorage.removeItem("pdfViewed");
                setPdfHistory([]);
              }}
            >
              Clear
            </Button>
          </Stack>
          <Stack spacing={2} overflow={"auto"}>
            {pdfHistory.map(({ Type, Month, Year }, i) => (
              <div
                key={i}
                onClick={() => {
                  setLoading(i);
                  dbClient
                    .post(`getPayslipData/${UserID}`, {
                      type: Type,
                      month: Month,
                      year: Year,
                    })
                    .then(async ({ data }) => {
                      navigate({
                        pathname: "/view",
                        search: createSearchParams({
                          uri: JSON.stringify(data),
                        }).toString(),
                      });
                    })
                    .finally(() => setLoading(-1));
                }}
              >
                <Stack direction={"row"} spacing={1} className="historyBox">
                  <PictureAsPdfRounded />
                  <p>{`${Month} ${Year} (${Type})`}</p>
                  {loading === i && (
                    <CircularProgress color="white" size={18} />
                  )}
                </Stack>
              </div>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Home;
