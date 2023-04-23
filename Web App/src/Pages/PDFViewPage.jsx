import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Link, useSearchParams } from "react-router-dom";
import { Stack } from "@mui/material";
import { Download, PictureAsPdf } from "@mui/icons-material";
import { Colors } from "../Constents/Colors";

const PDFViewPage = () => {
  const [searchparams] = useSearchParams();
  const { name, fileUrl } = JSON.parse(searchparams.get("uri"));

  return (
    <Stack flex={1} sx={{ color: "#fff", backgroundColor: "#eee" }}>
      <Stack
        px={2}
        top={0}
        zIndex={1}
        position={"sticky"}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ height: "60px", backgroundColor: Colors.Primary }}
      >
        <Stack direction={"row"} spacing={1}>
          <PictureAsPdf color="white" />
          <p>{name}</p>
        </Stack>
        <Link
          to={fileUrl}
          style={{
            width: 70,
            height: 35,
            backgroundColor: "#eee",
            borderRadius: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Download sx={{ fontSize: 25 }} color="primary" />
        </Link>
      </Stack>
      <Stack m={2}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer defaultScale={1} fileUrl={fileUrl} />
        </Worker>
      </Stack>
    </Stack>
  );
};

export default PDFViewPage;
