import React, { useState, FormEvent } from 'react';
import { Box, Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [usernameErrText, setUsernameErrText] = useState<string>('');
  const [passwordErrText, setPasswordErrText] = useState<string>('');
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsernameErrText('');
    setPasswordErrText('');
    setConfirmPasswordErrText('');

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username')?.toString().trim() || '';
    const password = formData.get('password')?.toString().trim() || '';
    const confirmPassword = formData.get('confirmPassword')?.toString().trim() || '';
    const role = formData.get('role')?.toString().trim() || '';

    let errs = false;

    if (username === '') {
      errs = true;
      setUsernameErrText('Please fill this field');
    }
    if (password === '') {
      errs = true;
      setPasswordErrText('Please fill this field');
    }
    if (confirmPassword === '') {
      errs = true;
      setConfirmPasswordErrText('Please fill this field');
    }
    if (password !== confirmPassword) {
      errs = true;
      setConfirmPasswordErrText('Confirm password does not match');
    }

    if (errs) return;

    setLoading(true);

    try {
      const res: any = await authApi.signup({ username, password, confirmPassword, role });
      setLoading(false);
      localStorage.setItem('token', res.token);
      navigate('/');
    } catch (err: any) {
      const errors = err.data.errors;
      if (errors) {
        errors.forEach((e: any) => {
          if (e.param === 'username') {
            setUsernameErrText(e.msg);
          }
          if (e.param === 'password') {
            setPasswordErrText(e.msg);
          }
          if (e.param === 'confirmPassword') {
            setConfirmPasswordErrText(e.msg);
          }
        });
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        component="form"
        width="100%"
        sx={{ mt: 1 }}
        onSubmit={handleSubmit}
        noValidate
      >
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="username">Логин</InputLabel>
          <Input
            id="username"
            name="username"
            placeholder="Логин"
            error={!!usernameErrText}
            onFocus={(e) => (e.target.style.color = 'teal')}
          />
          {usernameErrText && <FormHelperText error>{usernameErrText}</FormHelperText>}
        </FormControl>

        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Пароль</InputLabel>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            error={!!passwordErrText}
          />
          {passwordErrText && <FormHelperText error>{passwordErrText}</FormHelperText>}
        </FormControl>

        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="confirmPassword">Подтверждение пароля</InputLabel>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Подтверждение пароля"
            error={!!confirmPasswordErrText}
          />
          {confirmPasswordErrText && <FormHelperText error>{confirmPasswordErrText}</FormHelperText>}
        </FormControl>

        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="role">Role</InputLabel>
          <Input
            id="role"
            name="role"
            placeholder="Role"
            onFocus={(e) => (e.target.style.color = 'teal')}
          />
        </FormControl>

        <Button
          sx={{ mt: 4, mb: 3 }}
          color="primary"
          variant="contained"
          type="submit"
          disabled={loading}
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </Box>
      <Button
        color="primary"
        variant="outlined"
        component={Link}
        to="/Login"
        fullWidth
        sx={{ textTransform: 'none' }}
      >
        Уже есть аккаунт? Войти
      </Button>
    </>
  );
};

export default Signup;
