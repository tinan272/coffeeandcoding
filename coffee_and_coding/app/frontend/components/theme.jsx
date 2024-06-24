import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        pink: {
            main: "#F08E80",
            light: "#FDF0E6",
            dark: "#F4AC9F",
            contrastText: "#242105",
        },
        blue: {
            main: "#0A0E63",
        },
    },
});

export default theme;
