import React, { useState, FormEvent, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import BasicSelect from "../../Components/Inputs/SelectMUI";
import { AxiosResponse } from "axios";

import { OrganizationType } from "moduleTypes";
import PositionedSnackbar from "../../Components/Popups/MessagePopup";
import { organizations } from "../../App";
import { useAtom } from "jotai";

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [organizationsDataBase] = useAtom(organizations)

  const [loading, setLoading] = useState<boolean>(false);
  
  const [organization, setOrganization] = useState<number>();
  const [errorsServer, setErrorsServer] = useState<string[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorsServer([]);
    setSnackbarOpen(false);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString().trim() || "";
    const surname = formData.get("surname")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const tell = formData.get("tell")?.toString().trim() || "";
    const password = formData.get("password")?.toString().trim() || "";
    const confirmPassword =
      formData.get("confirmPassword")?.toString().trim() || "";
    const role = formData.get("role")?.toString().trim() || "";
    const work_mode = formData.get("work_mode")?.toString().trim() || "";

    let errs = false;
    const errorMessages: string[] = [];

    if (name === "") {
      errs = true;
      errorMessages.push("Please fill in the name field.");
    }
    if (surname === "") {
      errs = true;
      errorMessages.push("Please fill in the surname field.");
    }
    if (email === "") {
      errs = true;
      errorMessages.push("Please fill in the email field.");
    }
    if (tell === "") {
      errs = true;
      errorMessages.push("Please fill in the tell field.");
    }
    if (password === "") {
      errs = true;
      errorMessages.push("Please fill in the password field.");
    }
    if (confirmPassword === "") {
      errs = true;
      errorMessages.push("Please fill in the confirm password field.");
    }
    if (password !== confirmPassword) {
      errs = true;
      errorMessages.push("Confirm password does not match.");
    }

    if (errs) {
      setErrorsServer(errorMessages);
      return setLoading(true);
    }

    try {
      const res: any = await authApi.signup({
        name,
        surname,
        email,
        tell,
        organization: [organization],
        password,
        confirmPassword,
        work_mode,
        role,
      });
      navigate("/user_page");
      setLoading(false);
      localStorage.setItem("token", res.token);
    } catch (err: any) {
      if (err.data) {
        const serverErrors = Object.values(err.data).flat();
        const stringErrors = serverErrors.filter(
          (error): error is string => typeof error === "string"
        );
        setErrorsServer(stringErrors);
        setSnackbarOpen(true);
      } else {
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        component="form"
        width="50%"
        sx={{ mt: 1 }}
        onSubmit={handleSubmit}
        noValidate
      >
        <img
          src="https://novonordisk.service-now.com/3f4212d01b3221502fcddce0b24bcbd4.iix"
          style={{ width: "40%", height: "40%", margin: "0 30%" }}
          alt="Logo"
        />
        <PositionedSnackbar
          open={snackbarOpen}
          messages={errorsServer}
          onClose={() => setSnackbarOpen(false)}
        />
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            name="name"
            placeholder="Name"
            error={!!errorsServer.find((error) => error.includes("name"))}
          />
          {errorsServer.find((error) => error.includes("name")) && (
            <FormHelperText error>
              {errorsServer.find((error) => error.includes("name"))}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="surname">Surname</InputLabel>
          <Input
            id="surname"
            name="surname"
            type="text"
            placeholder="Surname"
            error={!!errorsServer.find((error) => error.includes("surname"))}
          />
          {errorsServer.find((error) => error.includes("surname")) && (
            <FormHelperText error>
              {errorsServer.find((error) => error.includes("surname"))}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            error={!!errorsServer.find((error) => error.includes("email"))}
          />
          {errorsServer.find((error) => error.includes("email")) && (
            <FormHelperText error>
              {errorsServer.find((error) => error.includes("email"))}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="tell">Tell</InputLabel>
          <Input
            id="tell"
            name="tell"
            type="text"
            placeholder="Tell"
            error={!!errorsServer.find((error) => error.includes("tell"))}
          />
          {errorsServer.find((error) => error.includes("tell")) && (
            <FormHelperText error>
              {errorsServer.find((error) => error.includes("tell"))}
            </FormHelperText>
          )}
        </FormControl>

        <BasicSelect
          attributs={organizationsDataBase}
          setAttribut={setOrganization}
          placeholder={"Organization"}
        />

        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            error={!!errorsServer.find((error) => error.includes("password"))}
          />
          {errorsServer.find((error) => error.includes("password")) && (
            <FormHelperText error>
              {errorsServer.find((error) => error.includes("password"))}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            error={
              !!errorsServer.find((error) => error.includes("confirmPassword"))
            }
          />
          {errorsServer.find((error) => error.includes("confirmPassword")) && (
            <FormHelperText error>
              {errorsServer.find((error) => error.includes("confirmPassword"))}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="role">Role</InputLabel>
          <Input
            id="role"
            name="role"
            placeholder="Role"
            onFocus={(e) => (e.target.style.color = "teal")}
          />
        </FormControl>

        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="work_mode">Work Mode</InputLabel>
          <Input
            id="work_mode"
            name="work_mode"
            placeholder="Work Mode"
            onFocus={(e) => (e.target.style.color = "teal")}
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
          Sign Up
        </Button>
        <Button
          color="primary"
          variant="outlined"
          component={Link}
          to="/sign_in"
          sx={{ textTransform: "none", width: "100%" }}
        >
          Already have an account? Log In
        </Button>
      </Box>
    </>
  );
};

export default SignUpPage;
