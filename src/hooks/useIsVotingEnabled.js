import { useState } from "react";
import getWebSocket from "../services/WebSocketService";

const socket = getWebSocket();

const useIsVotingEnabled = () => {
  const [isVotingEnabled, setIsVotingEnabled] = useState(false);

  socket.addListener("startvoting", () => {
    setIsVotingEnabled(true);
  });

  socket.addListener("clear", () => {
    setIsVotingEnabled(false);
  });

  return isVotingEnabled;
};

export { useIsVotingEnabled };
