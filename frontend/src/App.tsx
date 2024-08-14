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
import { ApplicationInterface, UserInterface } from "./utils/constants";
import authApi from "./api/authApi";
import SignUpPage from "./pages/Auth/SignUp";
import Applications from "./pages/Applications";
import {
  IApplication,
  MounthState,
  OrganizationType,
  ITypeWork,
  User,
  IPlaceLMK,
} from "moduleTypes";
import { AxiosResponse } from "axios";
import apiForUsers from "./api/apiUserList";
import apiApplications from "./api/apiApplications";
import apiForOrhanization from "./api/apiOrganizationHandler";
import apiTypesWorks from "./api/apiTypeWork";
import apiGetPlaces from "./api/apiGetPlacesLMK";

export const tasksAtom = atom([]);
export const typesWork = atom<ITypeWork[]>([]);

export const placesLMK = atom<IPlaceLMK[]>([]);
export const Mounth = createContext<MounthState | null>(null);
export const YearAtom = atom<number>(new Date().getFullYear());
export const userAtom = atom(UserInterface);
export const applications = atom<IApplication[]>([]);
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
  const [, setOrganizationsDataBase] =
    useAtom<OrganizationType[]>(organizations);
  const [, setTypesWork] = useAtom<ITypeWork[]>(typesWork);
  const [, setUsersDataBase] = useAtom<User[]>(users);
  const [, setPlaces] = useAtom(placesLMK);
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
    isLoggedIn ? navigate("/user_page") : navigate("/sign_in");
  }, [isLoggedIn]);

  useEffect(() => {
    apiForOrhanization
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
      .getUserslist()
      .then((res) => {
        if (res.data) {
          setUsersDataBase(res.data as any);
        } else {
          console.error("Error 500: No data returned");
        }
      })
      .catch((err) => console.error(err));
    apiGetPlaces
      .get()
      .then((res) => setPlaces(res.data))
      .catch((err) => console.error(err));
    apiApplications.get();
    apiTypesWorks.get().then((res) => setTypesWork(res.data[0]));
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <QueryClientProvider client={queryClient}>
            <div className="mainPageWrapper"></div>
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
          path="/sign_in"
          element={
            <SignInPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route path="/sign_up" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}
