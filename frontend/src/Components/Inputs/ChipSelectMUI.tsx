import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Dispatch, SetStateAction } from "react";
import { User } from "moduleTypes";

interface MultipleSelectChipProps {
  users: User[];
  setExecutors: Dispatch<SetStateAction<string[]>>;
}

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

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultipleSelectChip: React.FC<MultipleSelectChipProps> = ({
  users,
  setExecutors,
}) => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    const valueArray = typeof value === "string" ? value.split(",") : value;
    setPersonName(valueArray);
    setExecutors(valueArray);
  };
  return (
    <div>
      <FormControl sx={{ m: 0, width: 345, marginRight: 3 }}>
        <InputLabel id="demo-multiple-chip-label">Executors</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Executors" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {users.map((user) => (
            <MenuItem
              key={user.email}
              value={user.id}
              style={getStyles(user.name, personName, theme)}
            >
              {`${user.name} ${user.surname}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default MultipleSelectChip;
