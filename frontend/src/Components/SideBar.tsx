import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../App";
import ExitButton from "../ExitButton/ExitButton";
import {
  Box,
  Avatar,
  Divider,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import BarChartIcon from "@mui/icons-material/BarChart";
import "@fontsource/roboto/400.css";

const SideBar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [user] = useAtom(userAtom);
  const userName = localStorage.getItem("name");
  const navigate = useNavigate();
  const toCalendar = () => {
    setSelectedIndex(0);
    navigate(`/${user.id}/employeCalendar`);
  };

  const toUserPage = () => {
    setSelectedIndex(1);
    navigate("/userPage");
  };

  const toAnalitycs = () => {
    setSelectedIndex(2);
    navigate("/analitycs");
  };

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
        width: 56,
        height: 56,
        bgcolor: stringToColor(name),
      },
    };
  }

  return (
    <Box sx={{ bgcolor: "paper" }}>
      <Box sx={{ padding: "2vh" }}>
        <Avatar {...stringAvatar(user.name + " " + user.surname)} />
      </Box>
      <Box sx={{ pl: "2vh", mb: "2vh" }}>
        <Typography variant="h6" gutterBottom>
          {user.name}
          <br />
        </Typography>

        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ mt: "-1vh", mb: "-1vh" }}
        >
          {user.surname}
          <br />
        </Typography>
      </Box>
      <Box>
        <Divider />
        <List
          component="nav"
          aria-label="main mailbox folders"
          sx={{ bgcolor: "background.paper" }}
        >
          <ListItemButton selected={selectedIndex === 0} onClick={toCalendar}>
            <ListItemIcon>
              <CalendarMonthSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItemButton>
          <ListItemButton selected={selectedIndex === 1} onClick={toUserPage}>
            <ListItemIcon>
              <AccountCircleSharpIcon />
            </ListItemIcon>
            <ListItemText primary="My Cabinet" />
          </ListItemButton>
          <ListItemButton selected={selectedIndex === 2} onClick={toAnalitycs}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Organizations" />
          </ListItemButton>
        </List>
        <Box sx={{ width: "40%", ml: "auto", mr: "auto" }}>
          <ExitButton />
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
