import React, { useEffect, useState } from "react";
import BigCalendar from "./Calendar/Calendar";
import { Box } from "@mui/material";

const CalendarLayout = () => {
  return (
    <Box>
      <BigCalendar />
    </Box>
  );
};

export default CalendarLayout;
