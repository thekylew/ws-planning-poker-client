import { useEffect, useState } from "react";

import getWebSocket from "../services/WebSocketService";

import useSound from "use-sound";

import bell from "../sounds/bell.mp3";
import chimeHigh from "../sounds/chime-high.mp3";
import chimeMid from "../sounds/chime-mid.mp3";

import { useVotes } from "./useVotes";

const socket = getWebSocket();

const useSfx = () => {
  let votePlayed = false;

  const [playChimeMid] = useSound(chimeMid, { playbackRate:0.75 });
  const [playChimeHigh] = useSound(chimeHigh);
  const [playBell] = useSound(bell);

  const [userList, setUserList] = useState([]);

  const { votes } = useVotes();

  useEffect(() => {
    let voteFinishedPlayed = false;

    if (!voteFinishedPlayed && Object.values(votes).length === userList.length)
      playChimeHigh();

    voteFinishedPlayed = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votes]);

  socket.addListener("startvoting", () => {
    if (!votePlayed) playChimeMid();

    votePlayed = true;
  });

  socket.addListener("clear", () => {
    votePlayed = false;
  });

  socket.addListener("userlist", (msg) => {
    if (!msg) return;

    setUserList(msg.filter((u) => !u.isAdmin));
  });

  return [playBell, playChimeMid, playChimeHigh];
};

export default useSfx;
