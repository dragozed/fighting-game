import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2942b0",
      contrastText: "rgba(12,10,10,0.87)",
    },
    secondary: {
      main: "#53cccc",
    },
    background: {
      default: "#7a7a7a",
      paper: "#414146",
    },
    divider: "rgba(243,239,239,0.12)",
    text: {
      primary: "rgba(239,232,232,0.87)",
      secondary: "rgba(255,255,255,0.54)",
      disabled: "rgba(181,119,119,0.38)",
    },
  },
});
