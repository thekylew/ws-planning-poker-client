import { useVotes } from "../hooks/useVotes";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ResultTable = () => {
  const { tabulatedVotes, showVotes } = useVotes();

  return (
    <>
      <h3>Results</h3>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Points</TableCell>
              <TableCell align="right">Votes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tabulatedVotes.map((vote) => (
                <TableRow
                  key={`${vote.text}-${vote.value}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {showVotes ? vote.text : '?'}
                  </TableCell>
                  <TableCell align="right">{showVotes ? vote.value : '?'}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ResultTable;
