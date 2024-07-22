import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { InputProps } from "moduleTypes";

export default function Form({
  value,
  onChange,
  onBlur,
  ...props
}: InputProps) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "35ch" },
      }}
      autoComplete="off"
    >
      <TextField onBlur={onBlur} onChange={onChange} value={value} {...props} />
    </Box>
  );
}
