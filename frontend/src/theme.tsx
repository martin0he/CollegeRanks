import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: ["Jost", "serif"].join(","),
    allVariants: {
      color: "#880C79",
    },
  },
  palette: {
    background: {
      default: "#ede7d8",
    },
  },
});
