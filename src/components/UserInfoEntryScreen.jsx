import { useState } from "react";

import {
  Button,
  Container,
  FormGroup,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import useTeamId from "../hooks/useTeamId";

function UserInfoEntryScreen({ setUserInfo }) {
  const [name, setName] = useState("");
  const [isScrumMaster, setIsScrumMaster] = useState(false);
  const { teamId } = useTeamId();

  return (
    <Container maxWidth="sm">
      <FormGroup column="true">
        <TextField
          autoFocus
          id="standard-basic"
          label="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="isScrumMaster"
              color="primary"
              value={isScrumMaster}
              onChange={(e) => setIsScrumMaster(e.target.checked)}
            />
          }
          label="Scrum Master"
        />
        <Button
          disabled={!name}
          variant="contained"
          color="primary"
          onClick={() => setUserInfo({ name, isScrumMaster, teamId: teamId })}
        >
          Join Planning
        </Button>
      </FormGroup>
    </Container>
  );
}

export default UserInfoEntryScreen;
