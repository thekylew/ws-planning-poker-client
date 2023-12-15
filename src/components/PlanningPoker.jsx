import React from "react";

import { Grid, Container } from "@mui/material";
import getWebSocket from "../services/WebSocketService";

import AdminState from "./AdminState";
import AdminMenu from "./AdminMenu";
import VoterMenu from "./VoterMenu";
import VoteDisplay from "./VoteDisplay";
import ResultTable from "./ResultTable";
import ResultChart from "./ResultChart";

const socket = getWebSocket();

function PlanningPoker({ userInfo }) {
  socket.sendMessage("setuserinfo", userInfo);  

  return (
    <Container>
      {userInfo.isAdmin && <AdminMenu />}
      <Grid
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        container
        spacing={8}
      >
        <Grid item xs>
          {userInfo.isAdmin ? <AdminState /> : <VoterMenu />}
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
