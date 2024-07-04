import { useAtom } from "jotai";
import { userAtom } from "../App";
import { Box, Avatar, Grid, Paper, Typography } from "@mui/material";

const UserPage = () => {
  const [user] = useAtom(userAtom);

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        width: "30vh",
        height: "30vh",
        bgcolor: stringToColor(name),
      },
    };
  }

  return (
    <Box sx={{ padding: "7vh" }}>
      <Grid container spacing={8}>
        <Grid item xs={5} md={2.5}>
          <Avatar {...stringAvatar(user.name + " " + user.surname)} />
        </Grid>
        <Grid item xs={5} md={9.5}>
          <Paper elevation={0}>
            <Typography variant="h2" gutterBottom sx={{}}>
              {user.name}
              {"   "}
              {user.surname}
            </Typography>
            <Typography variant="h4" gutterBottom sx={{}}>
              role: {user.role}
            </Typography>
          </Paper>
          <Paper elevation={0}></Paper>
        </Grid>
        <Grid item xs={7} md={2.5}></Grid>
        <Grid item xs={7} md={4}>
          <Paper elevation={1}></Paper>
        </Grid>
      </Grid>
      <Box></Box>
    </Box>
  );
};

export default UserPage;
