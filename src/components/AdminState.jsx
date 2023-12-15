import { useState } from "react";
import { useIsVotingEnabled } from "../hooks/useIsVotingEnabled";
import { useVotes } from "../hooks/useVotes";
import getWebSocket from "../services/WebSocketService";

const socket = getWebSocket();

const AdminState = () => {
  const [storyName, setStoryName] = useState("");

  const { showVotes } = useVotes();
  const isVotingEnabled = useIsVotingEnabled();

  const votingStart = () => {
    if (showVotes)
      return "ended.";
    else if (isVotingEnabled)
      return "started.";
    else
      return "not started."
  }

  socket.addListener("setstoryname", (msg) => {
    setStoryName(msg.storyName);
  });

  socket.addListener("clear", () => {
    setStoryName("");
  });

  return (
    <>
      <h3>{storyName ? storyName : "None"}</h3>
      <h4>Voting has {votingStart()}</h4>
    </>
  );
};

export default AdminState;
