import { createTheme, ThemeProvider } from "@mui/material/styles";
import DataContextProvider from "./contexts/DataContext";
import "./App.css";
import RootRouter from "./Routes/RootRouter";
import { ToastContainer } from "react-toastify";

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
const toastConfig = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "colored",
};

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <DataContextProvider>
        <RootRouter />
        <ToastContainer {...toastConfig} />
      </DataContextProvider>
    </ThemeProvider>
  );
}

export default App;
