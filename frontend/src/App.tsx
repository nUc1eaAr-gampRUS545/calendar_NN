import React, { createContext, useEffect, useState } from "react";
import { atom, useAtom, createStore } from "jotai";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import apiAxoisInstance from "./api/apiSetup";
import AppLayout from "./Components/AppLayout";
import UserPage from "./Components/UserPage";
import Analitycs from "./Components/Analitycs";
import AuthLayout from "./Components/authLayout";
import CalendarLayout from "./Components/CalendarLayout";
import LoginTrel from "./Components/Auth/Login";

import { UserInterface } from "./utils/constants";
import SignUp from "./Components/Auth/SignUp";
import authApi from "./api/authApi";

export const tasksAtom = atom([]);

type MounthState = {
  mounth: React.ComponentState;
  setMounth: React.ComponentState;
};

export const Mounth = createContext<MounthState | null>(null);
export const YearAtom = atom<number>(new Date().getFullYear());
export const userAtom = atom(UserInterface);
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
  const [, setUserInfo] = useAtom(userAtom);
  const navigate = useNavigate();

  const isAuth =()=> {
    if (localStorage.getItem("token")) {
    return authApi.verifyToken().then((response) => {
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
  }

  useEffect(() => {
      isAuth();
      isLoggedIn ?  navigate("user_page") : navigate("login")

  }, [isLoggedIn]);


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
        <Route path="analitycs" element={<Analitycs />} />
      </Route>
      <Route path="/" element={<AuthLayout />}>
        <Route path="login"  element={<LoginTrel isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}
