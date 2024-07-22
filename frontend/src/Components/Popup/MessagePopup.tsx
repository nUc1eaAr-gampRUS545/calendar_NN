import React from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Grid } from "@mui/material";

interface PositionedSnackbarProps {
  open: boolean;
  messages: string[];
  onClose: () => void;
}

const PositionedSnackbar: React.FC<PositionedSnackbarProps> = ({
  open,
  messages,
  onClose,
}) => {
  return (
    <Box sx={{ width: "100%", position: "fixed", top: 0, zIndex: 1300 }}>
    
        {messages.map((message, index) => (
          <Grid item key={index}>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={open}
              autoHideDuration={6000}
              onClose={onClose}
            >
              <Alert onClose={onClose} severity="error">
                {message}
              </Alert>
            </Snackbar>
          </Grid>
        ))}
 
    </Box>
  );
};

export default PositionedSnackbar;
