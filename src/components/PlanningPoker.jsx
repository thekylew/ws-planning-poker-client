import React from "react";

import { Grid, Container } from "@mui/material";
import getWebSocket from "../services/WebSocketService";

import ScrumMasterState from "./ScrumMasterState";
import ScrumMasterScreen from "./ScrumMasterScreen";
import DeveloperScreen from "./DeveloperScreen";
import VoteDisplay from "./VoteDisplay";
import ResultTable from "./ResultTable";
import ResultChart from "./ResultChart";

const socket = getWebSocket();

function PlanningPoker({ userInfo }) {
  socket.sendMessage("setuserinfo", userInfo);  

  return (
    <Container>
      {userInfo.isScrumMaster && <ScrumMasterScreen />}
      <Grid
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        container
        spacing={8}
      >
        <Grid item xs>
          {userInfo.isScrumMaster ? <ScrumMasterState /> : <DeveloperScreen />}
        </Grid>
        <Grid item xs>
          <VoteDisplay />
        </Grid>
        <Grid item xs>
          <ResultTable />
        </Grid>
      </Grid>
      <Grid
        direction="row"
        alignItems="flex-start"
        justifyContent="center"
        container
        spacing={6}
      >
        <Grid item xs={6}>
          <ResultChart />
        </Grid>
      </Grid>
    </Container>
  );
}

export default PlanningPoker;
