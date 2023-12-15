import { useState } from "react";
import { Button, TextField, Grid } from "@mui/material";
import getWebSocket from "../services/WebSocketService";

const socket = getWebSocket();

const keepalive = () => {
  socket.sendMessage("sendmessage", { command: "keepalive" });
};

setInterval(keepalive, 60000);

function AdminMenu() {
  const [storyName, setStoryName] = useState("");
  const [intervalId, setIntervalId] = useState(false);

  const clear = () => {
    setIntervalId(false);
    socket.sendMessage("sendmessage", { command: "clear" });
  };

  const sendStoryName = () => {
    socket.sendMessage("sendmessage", { command: "setstoryname", storyName });
  };

  const voteInterval = () => {
    sendStoryName();
    socket.sendMessage("sendmessage", { command: "startvoting" });
  };

  const startVoting = () => {
    clear();
    const id = setInterval(voteInterval, 500);
    setIntervalId(id);
  };

  const showVotes = () => {
    socket.sendMessage("sendmessage", { command: "showvotes" });
  };

  const stopVoting = () => {
    if (intervalId) clearInterval(intervalId);
    setIntervalId(false);
    setStoryName("");
    setTimeout(showVotes, 500);
  };

  return (
    <Grid direction="row" justifyContent="center" alignItems="center" spacing={2} container>
      <Grid item xs={6}>
        <TextField
          id="standard-basic"
          label="Story Name"
          required
          autoFocus
          value={storyName}
          fullWidth={true}
          onChange={(e) => setStoryName(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Button
          disabled={!storyName}
          variant="contained"
          color="primary"
          onClick={() => {
            if (intervalId) {
              stopVoting();
            } else {
              startVoting();
            }
          }}
        >
          {intervalId ? "Show Votes" : "Start Voting"}
        </Button>
      </Grid>
    </Grid>
  );
}

export default AdminMenu;
