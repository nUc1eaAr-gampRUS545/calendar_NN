import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { BasicSelectProps, IPlaceLMK, OrganizationType } from "moduleTypes";
import { useState } from "react";
interface ISelectPlaceProps{
    attributs:IPlaceLMK[],
    setAttribut: React.Dispatch<React.SetStateAction<number>>,
    options?: string,
    placeholder: string,
    valueProps?: string,
}
const SelectPlace: React.FC<ISelectPlaceProps> = ({
  attributs,
  setAttribut,
  options,
  placeholder,
  valueProps,
}) => {
  const [value, setValue] = useState(valueProps);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    setAttribut(event.target.value as unknown as number);
  };

  return (
    <Box sx={{ minWidth: options == null ? "100%" : options, marginRight: 3 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{"Place LMK"}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="organization"
          name="organization"
          value={value}
          placeholder={placeholder}
          label={"Place LMK"}
          onChange={handleChange}
        >
          {attributs.map((data: IPlaceLMK) => 
            (
            <MenuItem key={data.id} value={data.id}>
                {`${data.room_number} ${
                  data.name == null ? "" : `${data.name}   ${data.zone}`
                }`}
              </MenuItem>))
          }
        </Select>
      </FormControl>
    </Box>
  );
};
export default SelectPlace;
