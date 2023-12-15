import NVD3Chart from "react-nvd3";

import { useVotes } from "../hooks/useVotes";

const ResultChart = () => {
  const { tabulatedVotes, showVotes } = useVotes();

  const showChart = showVotes && tabulatedVotes.length > 0;

  if (!showChart) return false;

  return (
    <NVD3Chart
      id="pieChart"
      type="pieChart"
      options={{ showLegend: false }}
      datum={tabulatedVotes}
      x="text"
      y="value"
    />
  );
};

export default ResultChart;
