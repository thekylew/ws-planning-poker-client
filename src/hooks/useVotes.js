import { useState } from "react";
import getWebSocket from "../services/WebSocketService";

const socket = getWebSocket();

const useVotes = () => {
  const [votes, setVotes] = useState([]);
  const [showVotes, setShowVotes] = useState(false);
  const [tabulatedVotes, setTabulatedVotes] = useState([]);

  socket.addListener("showvotes", () => {
    setShowVotes(true);
  });

  socket.addListener("startvoting", () => {
    setShowVotes(false);
  });

  socket.addListener("votesupdated", ({ votes }) => {
    setVotes(votes);
    tabulateVotes(votes);
  });

  socket.addListener("clear", () => {
    setTabulatedVotes([]);
    setVotes([]);
    setShowVotes(false);
  });

  const tabulateVotes = (untabulatedVotes) => {
    let resultObject = {};
    let resultArray = [];

    for (let vote of Object.values(untabulatedVotes)) {
      if (!resultObject[vote]) resultObject[vote] = 0;

      resultObject[vote] = resultObject[vote] + 1;
    }

    for (let choice of Object.keys(resultObject)) {
      resultArray.push({ text: choice, value: resultObject[choice] });
    }

    resultArray.sort((a, b) => a.value > b.value);

    setTabulatedVotes([...resultArray]);
  };

  return { votes, tabulatedVotes, showVotes };
};

export { useVotes };
