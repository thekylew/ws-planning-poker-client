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
      if (a.isScrumMaster === b.isScrumMaster) return a.name?.localeCompare(b.name);

      return a.isScrumMaster < b.isScrumMaster ? 1 : -1;
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
        {userList.map(({ name, isScrumMaster, connectionId }) => {
          return (
            <ListItem disableGutters key={`${connectionId}`}>
              <Grid container direction="row" spacing={2}>
                <Grid item>
                  <span>{name}</span>
                </Grid>
                <Grid item>
                  {isScrumMaster && (
                      <AdminPanelSettingsIcon />
                  )}
                  {!isScrumMaster &&
                    !showVotes &&
                    isVotingEnabled &&
                    !votes[connectionId] && (
                        <PendingIcon />
                    )}
                  {!isScrumMaster &&
                    !showVotes &&
                    isVotingEnabled &&
                    votes[connectionId] &&
                    votes[connectionId] !== "Need More Info" && (
                        <ThumbUpIcon />
                    )}
                  {!isScrumMaster &&
                    !showVotes &&
                    isVotingEnabled &&
                    votes[connectionId] &&
                    votes[connectionId] === "Need More Info" && (
                        <LocalCafeIcon />
                    )}
                  {!isScrumMaster && showVotes && (
                    
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
