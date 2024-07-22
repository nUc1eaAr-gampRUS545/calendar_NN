import axios from "axios";
import { serverURL } from "../utils/constants";

// Get the token from localStorage
const token = localStorage.getItem("token");
const isVerifyToken = token !== null;

var apiAxiosInstance = axios.create({
  baseURL: serverURL + "/api/v1/",
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  },
});

apiAxiosInstance.defaults.headers.common["authorization"] =
  isVerifyToken && "Bearer " + token;

apiAxiosInstance.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = isVerifyToken && "Bearer " + token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiAxiosInstance.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (!err.response) {
      return console.error(err);
    }
    throw err.response;
  }
);

export default apiAxiosInstance;
