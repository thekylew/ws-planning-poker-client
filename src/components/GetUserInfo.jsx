import { useState } from "react";

import {
  Button,
  Container,
  FormGroup,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import useSessionId from '../hooks/useSessionId';

function GetUserInfo({ setUserInfo }) {
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { sessionId } = useSessionId();

  return (
    <Container maxWidth="sm">
      <FormGroup column="true">
        <TextField autoFocus id="standard-basic" label="Name" required value={name} onChange={e => setName(e.target.value)} />
        <FormControlLabel
          control={<Checkbox name="isAdmin" color="primary" value={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />}
          label="Admin"
        />
        <Button disabled={!name} variant="contained" color="primary" onClick={() => setUserInfo({ name, isAdmin, sessionId:sessionId })}>
          Join Planning
        </Button>
      </FormGroup>
    </Container>
  );
}

export default GetUserInfo;
