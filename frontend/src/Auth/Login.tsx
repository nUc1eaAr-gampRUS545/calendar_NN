import React, { useState, FormEvent } from "react";
import { Box, Button, FormControl, FormHelperText, Input } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import { LoginTrelProps } from "moduleTypes";

const LoginTrel: React.FC<LoginTrelProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [usernameErrText, setUsernameErrText] = useState<string>("");
  const [passwordErrText, setPasswordErrText] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString().trim() || ""; // Используем || '' для избежания ошибки при вызове trim() на null
    const password = formData.get("password")?.toString().trim() || "";

    let err = false;

    if (!email) {
      err = true;
      setUsernameErrText("Please fill this field");
    }
    if (!password) {
      err = true;
      setPasswordErrText("Please fill this field");
    }

    if (err) return;

    setLoading(true);

    try {
      const res: any = await authApi.login({ email, password });
      setLoading(false);
      localStorage.setItem("token", res.token);
      setIsLoggedIn(true);
      navigate(`/${res.id}/employeCalendar`);
    } catch (err: any) {
      const errors = err.data.errors;
      if (errors) {
        errors.forEach((e: any) => {
          if (e.param === "email") {
            setUsernameErrText(e.msg);
          }
          if (e.param === "password") {
            setPasswordErrText(e.msg);
          }
        });
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} noValidate>
        <FormControl fullWidth margin="normal" error={!!usernameErrText}>
          <Input
            required
            id="email"
            name="email"
            placeholder="Логин"
            disabled={loading}
          />
          {usernameErrText && (
            <FormHelperText>{usernameErrText}</FormHelperText>
          )}
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
          {passwordErrText && (
            <FormHelperText>{passwordErrText}</FormHelperText>
          )}
        </FormControl>
        <Button
          sx={{ mt: 4, mb: 3 }}
          color="primary"
          variant="contained"
          type="submit"
          disabled={loading}
        >
          Войти
        </Button>
      </Box>
      <Button
        color="primary"
        variant="outlined"
        component={Link}
        to="/Signup"
        sx={{ textTransform: "none", width: "100%" }}
      >
        Нет аккаунта? Регистрация
      </Button>
    </>)
  
};

export default LoginTrel;
