//TODO: Implement custom options

import { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const T_SHIRT_OPTIONS = [
  "Extra Small",
  "Small",
  "Medium",
  "Large",
  "Extra Large",
  "2XL",
  "coffee"
];

const POINT_OPTIONS = [ "1", "2", "3", "5", "8", "13", "21", "34", "Need More Info" ];

function OptionPicker({ options, setOptions }) {
  const [selectedVotingStyle, setSelectedVotingStyle] =
    useState("points");

  if (!options) setOptions(T_SHIRT_OPTIONS);

  const setVotingStyle = (votingStyle) => {
    setSelectedVotingStyle(votingStyle);

    switch (votingStyle) {
      case "t-shirt-sizes":
        setOptions(T_SHIRT_OPTIONS);
        break;
      case "points":
        setOptions(POINT_OPTIONS);
        break;
      default:
        setOptions(T_SHIRT_OPTIONS);
        break;
    }
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Voting Options</FormLabel>
      <RadioGroup
        aria-label="voting-options"
        name="voting-options"
        value={selectedVotingStyle}
        onChange={(e) => setVotingStyle(e.currentTarget.value)}
      >        
        <FormControlLabel value="points" control={<Radio />} label="Points" />
        <FormControlLabel
          value="t-shirt-sizes"
          control={<Radio />}
          label="T-Shirt Sizes"
        />
      </RadioGroup>
    </FormControl>
  );
}

export { OptionPicker, T_SHIRT_OPTIONS, POINT_OPTIONS };
