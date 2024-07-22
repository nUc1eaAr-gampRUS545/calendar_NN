import enUS from "date-fns/locale/en-US";

export const locales={
    "en-US": enUS,
  };
export const serverURL = "http://localhost:8000/";

export const resources = [
    { id: 1, title: "Dr Alex" },
    { id: 2, title: "Dr John" },
    { id: 3, title: "Dr Adam" },
  ];

export  const daysOfWeek = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

export const UserInterface = {
  id: 0,
  name: "",
  surname: "",
  role: "",
  work_mode: "",
  tell:"",
  email:""
}
