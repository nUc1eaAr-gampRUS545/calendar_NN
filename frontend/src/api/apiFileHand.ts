import axios from "axios";
import apiAxoisInstance from "./apiSetup";
import { serverURL } from "../utils/constants";

const token = localStorage.getItem("token");

export const uploadFileApi = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type",file.type);

  return axios.post(serverURL+"/api/v1/files/", formData, {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  });
};
export const apiFileHandler = {
  getUrls: (params: number) => apiAxoisInstance.get(`files/${params}`),
};
export const downloadFile = async ( fileName: string ) => {
  const url = `http://localhost:8000/${fileName}`;

  try {
    const response = await axios.get(url, {
      responseType: "blob",
    });
    const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    const fileLink = document.createElement("a");

    fileLink.href = fileURL;
    fileLink.setAttribute("download", fileName);
    document.body.appendChild(fileLink);

    fileLink.click();
    fileLink.remove();
  } catch (error) {
    console.error("Error downloading the file", error);
  }
};
