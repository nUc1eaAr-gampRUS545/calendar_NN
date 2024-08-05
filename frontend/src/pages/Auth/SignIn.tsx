import React, { useState, FormEvent } from "react";
import { Box, Button, FormControl, FormHelperText, Input } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import authApi from "../../api/authApi";
import { LoginAuthResponse, LoginTrelProps } from "moduleTypes";
const SignInPage: React.FC<LoginTrelProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [usernameErrText, setUsernameErrText] = useState<string>("");
  const [passwordErrText, setPasswordErrText] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim() || "";
    const password = formData.get("password")?.toString().trim() || "";

    if (!email) {
      setUsernameErrText("Please fill this field");
    }
    if (!password) {
      setPasswordErrText("Please fill this field");
    }
    if (!email || !password) return;

    setLoading(true);

    try {
      const response: AxiosResponse<LoginAuthResponse> = await authApi.login({ email, password });
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      navigate("user_page");
    } catch (error: any) {
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err: any) => {
          if (err.param === "email") {
            setUsernameErrText(err.msg);
          }
          if (err.param === "password") {
            setPasswordErrText(err.msg);
          }
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" sx={{ mt: 1, width: '50%' }} onSubmit={handleSubmit} noValidate>
      <img 
        src="https://novonordisk.service-now.com/3f4212d01b3221502fcddce0b24bcbd4.iix" 
        style={{ width: "40%", height: "40%", margin: "0 30%" }} 
        alt="Logo"
      />
      <FormControl fullWidth margin="normal" error={!!usernameErrText}>
        <Input
          required
          id="email"
          name="email"
          placeholder="Логин"
          disabled={loading}
        />
        {usernameErrText && <FormHelperText>{usernameErrText}</FormHelperText>}
      </FormControl>
      <FormControl fullWidth margin="normal" error={!!passwordErrText}>
        <Input
          required
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          disabled={loading}
        />
        {passwordErrText && <FormHelperText>{passwordErrText}</FormHelperText>}
      </FormControl>
      <Button
     
        color="primary"
        variant="contained"
        type="submit"
        sx={{ textTransform: "none", width: "100%", mt: 4, mb: 3 }}
        disabled={loading}
      >
        Войти
      </Button>
      <Button
        color="primary"
        variant="outlined"
        component={Link}
        to="/sign_up"
        sx={{ textTransform: "none", width: "100%" }}
      >
        Нет аккаунта? Регистрация
      </Button>
    </Box>
  );
};

export default SignInPage;
