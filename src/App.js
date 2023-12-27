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

import UserInfoEntryScreen from "./components/UserInfoEntryScreen";
import PlanningPoker from "./components/PlanningPoker";
import useTeamId from "./hooks/useTeamId";

function App() {
  const [colorMode, setColorMode] = useState("light");

  const [userInfo, setUserInfo] = useState(false);
  const { teamId, cleanTeamId } = useTeamId();

  const addteamIdAndSetUserInfo = (info) => {
    setUserInfo({
      ...info,
      teamId: teamId,
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
        <title>{cleanTeamId} Planning Poker</title>
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
                  {cleanTeamId} Planning Poker
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
              <UserInfoEntryScreen setUserInfo={addteamIdAndSetUserInfo} />
            )}
          </Box>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
