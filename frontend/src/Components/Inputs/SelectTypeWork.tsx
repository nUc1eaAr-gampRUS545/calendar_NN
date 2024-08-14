import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useAtom } from "jotai";
import { typesWork } from "../../App";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

function getStyles(name: string, selectedNames: readonly string[], theme: Theme) {
  return {
    fontWeight:
      selectedNames.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface SelectTypeWorkProps {
  setListTypesWorks: React.Dispatch<React.SetStateAction<number[]>>;
  listTypesWorks: number[];
}

const SelectTypeWork: React.FC<SelectTypeWorkProps> = ({ setListTypesWorks, listTypesWorks }) => {
  const theme = useTheme();
  const [types] = useAtom(typesWork);

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;

    const valueArray = typeof value === "string" ? value.split(",").map(Number) : value;
    setListTypesWorks(valueArray);
    console.log(value);
  };

  if (!Array.isArray(types)) {
    return null; // or handle it with a loading spinner or error message
  }

  return (
    <FormControl sx={{ m: 0, width: "100%", marginLeft: 1 }}>
      <InputLabel id="demo-multiple-chip-label">Types work</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={listTypesWorks}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Types work" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={types.find((type) => type.id === value)?.description || value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {types.map((type) => (
          <MenuItem 
            key={type.id} 
            value={type.id} 
            style={getStyles(type.description, listTypesWorks.map(String), theme)}
          >
            {type.description}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectTypeWork;
