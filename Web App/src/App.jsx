import "./App.css";
import { Stack, ThemeProvider, createTheme } from "@mui/material";
import DataContextProvider from "./Contexts/DataContext";
import Root_router from "./Routers/Root_router";

function App() {
  const THEME = createTheme({
    typography: {
      fontFamily: `"Poppins", sans-serif`,
      fontSize: 13,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
    palette: {
      primary: { main: "#3b4d61" },
      secondary: { main: "#5e81f4" },
      gray: { main: "gray" },
      white: { main: "#fff" },
      light: { main: "rgba(255,255,255,0.5)" },
    },
  });

  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  return (
    <ThemeProvider theme={THEME}>
      <Stack alignItems={"center"} className="root">
        <DataContextProvider>
          <Root_router />
        </DataContextProvider>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
