import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { IPlaceLMK } from "moduleTypes";

interface ISelectPlaceProps {
  attributs: IPlaceLMK[];
  setAttribut: React.Dispatch<React.SetStateAction<number>>;
  setPlace: React.Dispatch<React.SetStateAction<string>>;
  options?: string;
  placeholder: string;
  valueProps?: string;
}

const SelectPlace: React.FC<ISelectPlaceProps> = ({
  attributs,
  setAttribut,
  setPlace,
  options,
  placeholder,
  valueProps,
}) => {
  const [value, setValue] = useState(valueProps || "");

  const handleChange = (event: SelectChangeEvent) => {
    const selectedPlace = attributs.find(
      (place) => `${place.name}   ${place.zone}` === event.target.value
    );

    if (selectedPlace) {
      setValue(event.target.value);
      setPlace(event.target.value);
      setAttribut(selectedPlace.id);
      console.log(selectedPlace.id)
    }
  };

  return (
    <Box sx={{ minWidth: options == null ? "100%" : options, marginRight: 3 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{"Place LMK"}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={value}
          placeholder={placeholder}
          label={"Place LMK"}
          onChange={handleChange}
        >
          {attributs.map((data: IPlaceLMK) => (
            <MenuItem key={data.id} value={`${data.name}   ${data.zone}`}>
              {`${data.room_number} ${
                data.name == null ? "" : `${data.name}   ${data.zone}`
              }`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectPlace;
