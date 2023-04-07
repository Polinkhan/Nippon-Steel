import { createTheme, ThemeProvider } from "@mui/material/styles";
import RootRouter from "./Routes/RootRouter/RootRouter";
import DataContextProvider from "./contexts/DataContext";
// import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";

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
  },
});

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <DataContextProvider>
        <RootRouter />
      </DataContextProvider>
    </ThemeProvider>
  );
}

export default App;
