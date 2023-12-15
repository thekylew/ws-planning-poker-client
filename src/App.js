import { useState } from "react";
import { Helmet } from "react-helmet";
import {
  AppBar,
  Box,
  Grid,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import GetUserInfo from "./components/GetUserInfo";
import PlanningPoker from "./components/PlanningPoker";
import useSessionId from "./hooks/useSessionId";

function App() {
  const [colorMode, setColorMode] = useState("light");

  const [userInfo, setUserInfo] = useState(false);
  const { sessionId, cleanSessionId } = useSessionId();

  const addSessionIdAndSetUserInfo = (info) => {
    setUserInfo({
      ...info,
      sessionId: sessionId,
    });
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#222222",
      },
      text: {
        primary: "#F7F7F7",
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: "#3B3B3B",
          },
        },
      },
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return (
    <ThemeProvider theme={colorMode === "light" ? lightTheme : darkTheme}>
      <Helmet>
        <title>{cleanSessionId} Planning Poker</title>
      </Helmet>
      <Paper>
        <Box height="100vh">
          <AppBar position="static">
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item>
                <Typography variant="h6" style={{ margin: "5px" }}>
                  {cleanSessionId} Planning Poker
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  sx={{ ml: 1 }}
                  onClick={() =>
                    setColorMode(colorMode === "light" ? "dark" : "light")
                  }
                  color="inherit"
                >
                  {colorMode === "light" ? (
                    <Brightness4Icon />
                  ) : (
                    <Brightness7Icon />
                  )}
                </IconButton>
              </Grid>
            </Grid>
          </AppBar>
          <Box m={2}>
            {userInfo ? (
              <PlanningPoker userInfo={userInfo} />
            ) : (
              <GetUserInfo setUserInfo={addSessionIdAndSetUserInfo} />
            )}
          </Box>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
