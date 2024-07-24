import { useAtom } from "jotai";
import { logInAtom, userAtom } from "../App";
import { Box, Avatar, Grid, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import authApi from "../api/authApi";

const UserPage = () => {
  const [user, setUser] = useAtom(userAtom);

  function stringToColor(string: string) {
    let hash = 0;
    let i;
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
        fontSize: "10vh",
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  // useEffect(() => {
  //   authApi
  //     .verifyToken()
  //     .then((response) => setUser(response.data));
  // }, [logInAtom]);

  return (
    <Box sx={{ padding: "7vh" }}>
      <Grid container spacing={8}>
        <Grid item xs={12} md={4}>
          <Avatar {...stringAvatar(user.name + " " + user.surname)} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ padding: "2vh" }}>
            <Typography variant="h2" gutterBottom>
              {user.name} {user.surname}
            </Typography>
            <Typography variant="h4" gutterBottom>
              Role: {user.role}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Email: {user.email}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Phone: {user.tell}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Work Mode: {user.work_mode}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: "5vh" }}></Box>
    </Box>
  );
};

export default UserPage;
