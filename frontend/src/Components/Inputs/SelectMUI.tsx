import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { BasicSelectProps, OrganizationType } from "moduleTypes";
import { useState } from "react";

const BasicSelect: React.FC<BasicSelectProps> = ({
  attributs,
  setAttribut,
  options,
  placeholder,
  valueProps
}) => {
  const [value,setValue] = useState(valueProps);
  
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value)
    setAttribut(event.target.value as unknown as number);
  };

  return (
    <Box sx={{ minWidth:options==null ? "100%" : options ,marginRight:3}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{placeholder}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="organization"
          name="organization"
          value={value}
          placeholder={placeholder}
          label={placeholder}
          onChange={handleChange}
        >
          {attributs.map(
            (data: OrganizationType | string, index: number) => {
              if (typeof data === "string") {
                return (
                  <MenuItem key={index} value={data}>
                    {data}
                  </MenuItem>
                );
              } else {
                return (
                  <MenuItem key={data.id} value={data.id}>
                    {`${data.name} ${data.surname == null ? '' : data.surname}`}
                  </MenuItem>
                );
              }
            }
          )}
        </Select>
      </FormControl>
    </Box>
  );
};
export default BasicSelect;
