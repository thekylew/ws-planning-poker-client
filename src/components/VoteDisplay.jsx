import { useState, useEffect } from "react";
import { Grid, List, ListItem } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PendingIcon from "@mui/icons-material/Pending";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";

import getWebSocket from "../services/WebSocketService";
import { useVotes } from "../hooks/useVotes";
import { useIsVotingEnabled } from "../hooks/useIsVotingEnabled";

const socket = getWebSocket();

const VoteDisplay = () => {
  const isVotingEnabled = useIsVotingEnabled();
  const [userList, setUserList] = useState([]);
  const { votes, showVotes } = useVotes();

  socket.addListener("userlist", (msg) => {
    if (!msg) return;

    msg.sort(function (a, b) {
      if (a.isAdmin === b.isAdmin) return a.name?.localeCompare(b.name);

      return a.isAdmin < b.isAdmin ? 1 : -1;
    });

    setUserList(msg);
  });

  // force a re-render when votes update
  // it really is a side effect!
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setUserList([...userList]), [votes]);

  return (
    <>
      <h3>User List</h3>
      <List>
        {userList.map(({ name, isAdmin, connectionId }) => {
          return (
            <ListItem disableGutters key={`${connectionId}`}>
              <Grid container direction="row" spacing={2}>
                <Grid item>
                  <span>{name}</span>
                </Grid>
                <Grid item>
                  {isAdmin && (
                      <AdminPanelSettingsIcon />
                  )}
                  {!isAdmin &&
                    !showVotes &&
                    isVotingEnabled &&
                    !votes[connectionId] && (
                        <PendingIcon />
                    )}
                  {!isAdmin &&
                    !showVotes &&
                    isVotingEnabled &&
                    votes[connectionId] &&
                    votes[connectionId] !== "Need More Info" && (
                        <ThumbUpIcon />
                    )}
                  {!isAdmin &&
                    !showVotes &&
                    isVotingEnabled &&
                    votes[connectionId] &&
                    votes[connectionId] === "Need More Info" && (
                        <LocalCafeIcon />
                    )}
                  {!isAdmin && showVotes && (
                    
                      <b>
                        {votes[connectionId] === "Need More Info" ? (
                          <LocalCafeIcon />
                        ) : (
                          votes[connectionId]
                        )}
                      </b>
                  )}
                </Grid>
              </Grid>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default VoteDisplay;
