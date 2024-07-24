import React, { createContext, useEffect, useState } from "react";
import { atom, useAtom, createStore } from "jotai";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import AppLayout from "./Components/AppLayout";
import UserPage from "./pages/UserPage";
import AuthLayout from "./Components/authLayout";
import CalendarLayout from "./pages/CalendarLayout";
import SignInPage from "./pages/Auth/SignIn";

import { UserInterface } from "./utils/constants";
import SignUp from "./pages/Auth/SignUp";
import authApi from "./api/authApi";
import SignUpPage from "./pages/Auth/SignUp";
import Applications from "./pages/Applications";
import { OrganizationType, User } from "moduleTypes";
import { AxiosResponse } from "axios";
import apiForUsers from "./api/userListApi";

export const tasksAtom = atom([]);

type MounthState = {
  mounth: React.ComponentState;
  setMounth: React.ComponentState;
};

export const Mounth = createContext<MounthState | null>(null);
export const YearAtom = atom<number>(new Date().getFullYear());
export const userAtom = atom(UserInterface);
export const organizations = atom<OrganizationType[]>([]);
export const users = atom<User[]>([]);
export const logInAtom = atom<boolean>(false);
export const scheduleController = new AbortController();
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (e) => {
      console.log("Error", e);
    },
  }),
});

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(logInAtom);
  const [organizationsDataBase, setOrganizationsDataBase] =
    useAtom<OrganizationType[]>(organizations);
  const [usersDataBase, setUsersDataBase] = useAtom<User[]>(users);
  const [, setUserInfo] = useAtom(userAtom);
  const navigate = useNavigate();

  const isAuth = () => {
    if (localStorage.getItem("token")) {
      return authApi
        .verifyToken()
        .then((response) => {
          if (response.data) {
            setIsLoggedIn(true);
            setUserInfo(response.data);
            navigate("user_page");
          }
        })
        .catch(() => {
          setIsLoggedIn(false);
        });
    }
  };

  useEffect(() => {
    isAuth();
    isLoggedIn ? navigate("user_page") : navigate("login");
  }, [isLoggedIn]);

  useEffect(() => {
    authApi
      .getOrgs()
      .then((response) => {
        const data = response.data;
        if (data) {
          setOrganizationsDataBase(data);
        } else {
          console.error("Error 500: No data returned");
        }
      })
      .catch((err) => console.error(err));

    apiForUsers
      .getUserlist()
      .then((res) => {
        if (res.data) {
          setUsersDataBase(res.data as any);
        } else {
          console.error("Error 500: No data returned");
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <QueryClientProvider client={queryClient}>
            <div className="mainPageWrapper">
              {/* <EmployeeList /> */}
              {/* <DatePicker /> */}
              {/* <PopupTascButton/>  */}
            </div>
            <AppLayout />
          </QueryClientProvider>
        }
      >
        <Route path="user_page" element={<UserPage />} />

        <Route
          path=":employeeId/employeCalendar"
          element={<CalendarLayout />}
        />
        <Route path="/applications" element={<Applications />} />
      </Route>
      <Route path="/" element={<AuthLayout />}>
        <Route
          path="/sign-in"
          element={
            <SignInPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}
