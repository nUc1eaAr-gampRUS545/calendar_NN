import { useAtom } from "jotai";
import { userAtom } from "../App";
import { Box, Avatar, Grid, Paper, Typography } from "@mui/material";
import stringToColor from "../helpers/colorIconUser";

const UserPage = () => {
  const [user, setUser] = useAtom(userAtom);

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
