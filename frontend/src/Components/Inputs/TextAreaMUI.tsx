import Textarea from "@mui/joy/Textarea";
import React, { Dispatch, InputHTMLAttributes, SetStateAction } from "react";

interface TextAreaMUIProps {
  placeholder: string;
  minRows: number;
  value: string;
  options?: string;
  onChange: Dispatch<SetStateAction<string | any>>;
}

const TextAreaMUI: React.FC<TextAreaMUIProps> = ({
  placeholder,
  minRows,
  options,
  value,
  onChange,
}) => {
  return (
    <Textarea
      sx={{ width: options ? options : "50%", marginRight: 3 }}
      minRows={minRows}
      onClick={onChange}
      size="lg"
      value={value !== undefined ? value : ""}
      variant="soft"
      placeholder={placeholder}
    />
  );
};

export default TextAreaMUI;
