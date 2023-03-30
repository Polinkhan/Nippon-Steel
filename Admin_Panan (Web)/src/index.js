import React from "react";
import ReactDOM from "react-dom/client";
import DataContextProvider from "./contexts/DataContext";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DataContextProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </DataContextProvider>
);
