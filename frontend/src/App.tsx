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
import LoginTrel from "./Auth/Login";
import Signup from "./Auth/Singup";
import AuthLayout from "./Components/authLayout";
import CalendarLayout from "./Components/CalendarLayout";
import { Task } from "moduleTypes";

export const tasksAtom = atom([]);

type MounthState = {
  mounth: React.ComponentState;
  setMounth: React.ComponentState;
};

export const Mounth = createContext<MounthState | null>(null);
export const YearAtom = atom<number>(new Date().getFullYear());
export const userAtom = atom({
  id: 0,
  name: "",
  surname: "",
  role: "",
  work_mode: "",
});

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
    return apiAxoisInstance
      .get("/users/auth/token/", {}).then((response) => {
        if (response.data) {
          setIsLoggedIn(true);
          setUserInfo(response.data);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }
  }

  useEffect(() => {
      isAuth();

  }, []);
  useEffect(() => {
    isLoggedIn ? navigate('/') : navigate("/login")
    
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
        <Route path="userPage" element={<UserPage />} />

        <Route
          path=":employeeId/employeCalendar"
          element={<CalendarLayout />}
        />
        <Route path="analitycs" element={<Analitycs />} />
      </Route>
      <Route path="/" element={<AuthLayout />}>
        <Route path="login"  element={<LoginTrel isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}
