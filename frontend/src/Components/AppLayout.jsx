import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Grid } from "@mui/material";
import { userAtom, scheduleController } from "../App";
import { useAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";
import apiAxoisInstance from "../api/apiSetup";
import SideBar from "./SideBar";
import authUtils from "../api/authUtils";

const AppLayout = () => {
  const [, setUserData] = useAtom(userAtom);

  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      console.log(user);
      if (!user) {
        console.log("no aser for app");
       // navigate("/login");
      } else {
        // save user
        setUserData({
          id: user.id,
          name: user.username,
          role: user.role,
        });
        console.log("vse good", user);
        //navigate('/')
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={1.5}>
          <SideBar />
        </Grid>
        <Grid item xs={10.5}>
          <Outlet />
        </Grid>
      </Grid>
      <Box>
        <Box></Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
