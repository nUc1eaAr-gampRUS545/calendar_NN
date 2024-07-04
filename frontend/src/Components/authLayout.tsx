import { Container, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authUtils from "../api/authUtils";

const AuthLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthenticated();
      if (!isAuth) {
        setLoading(false);
        //navigate('/login')
        console.log("nado reg");
      } else {
        //navigate('/')
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <Box
      marginTop="8px"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
