import { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  RadioGroup,
  Radio,
  Button,
} from "@mui/material";
import getWebSocket from "../services/WebSocketService";
import { POINT_OPTIONS } from "./OptionPicker";
import useTeamId from '../hooks/useTeamId';

const socket = getWebSocket();

const DeveloperScreen = () => {
  const [storyName, setStoryName] = useState("");
  const [isVotingEnabled, setIsVotingEnabled] = useState(false);
  const [chosenSize, setChosenSize] = useState("");

  const { teamId } = useTeamId();

  socket.addListener("setstoryname", (msg) => {
    setStoryName(msg.storyName);
  });

  socket.addListener("startvoting", () => {
    setIsVotingEnabled(true);
  });

  socket.addListener("clear", () => {
    setStoryName("");
    setIsVotingEnabled(false);
  });

  const handleChoice = (e) => {
    setChosenSize(e.target.value);
  };

  const sendVote = () => {
    socket.sendMessage("vote", {
      choice: chosenSize,
      teamId: teamId,
      storyName,
    });
  };

  return (
    <Grid
      container
      alignItems="flex-start"
      justifyContent="center"
      direction="column"
    >
      <h3>{storyName}</h3>
      <Grid item>
        <FormControl component="fieldset">
          <FormLabel component="legend">Points</FormLabel>
          <RadioGroup aria-label="size" name="size" onChange={handleChoice}>
            {POINT_OPTIONS.map((opt) => (
              <FormControlLabel
                disabled={!isVotingEnabled}
                id={opt}
                value={opt}
                key={opt}
                control={<Radio size="small" />}
                label={opt}
              />
            ))}
          </RadioGroup>
          <Button
            disabled={!isVotingEnabled}
            variant="contained"
            color="primary"
            onClick={() => sendVote()}
          >
            Vote
          </Button>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default DeveloperScreen;
