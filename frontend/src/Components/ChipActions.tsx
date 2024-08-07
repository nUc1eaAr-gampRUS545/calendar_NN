import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Dispatch } from "react";

interface clickableChipsProps {
  pageState: boolean;
  setPageState: Dispatch<React.SetStateAction<boolean>>;
}

const ClickableChips: React.FC<clickableChipsProps> = ({
  pageState,
  setPageState,
}) => {
  const handleClick = () => {
    console.info("You clicked the Chip.");
    setPageState(!pageState);
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      margin={"40px auto"}
      width={"100%"}
      justifyContent="center"
    >
      <Chip
        label="Заявки на пропуск"
        onClick={handleClick}
        // variant={!pageState ? "outlined" : "filled"}
        sx={{backgroundColor:!pageState ? "#a9cdff" : "#efefef"}}
      />
      <Chip
        label="Заявки на регистрацию"
        // variant={pageState ? "outlined" : "filled"}
        sx={{backgroundColor:pageState ? "#a9cdff" : "#efefef"}}
        onClick={handleClick}
      />
    </Stack>
  );
};
export default ClickableChips;