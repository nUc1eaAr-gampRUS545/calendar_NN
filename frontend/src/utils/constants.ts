import enUS from "date-fns/locale/en-US";

export const locales = {
  "en-US": enUS,
};
export const serverURL = "http://localhost:8000";

export const resources = [
  { id: 1, title: "Dr Alex" },
  { id: 2, title: "Dr John" },
  { id: 3, title: "Dr Adam" },
];

export const daysOfWeek = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

export const UserInterface = {
  id: 0,
  name: "",
  surname: "",
  role: "",
  work_mode: "",
  tell: "",
  email: "",
};
export const DATE_NOW = new Date();
export const ApplicationInterface = {
  name: "",
  surname: "",
  place_id: 0,
  createdUser_id: 0,
  start_date: DATE_NOW,
  due_date: DATE_NOW,
  phone: "",
  types_works_ids: [],
  responsiblePerson_id: 0,
  organization_id: 0,
};
export const safety_briefings = [
  { id: 1, name: "Инструктаж по безопасности", completed: true },
  { id: 2, name: "Инструктаж по оборудованию", completed: false },
  { id: 3, name: "Инструктаж по площадке", completed: true },
  { id: 4, name: "Инструктаж по ЧС", completed: true },
];
export const TYPES_FRAMES_PLACES: string[] = [
  "ALL",
  "Basement",
  "1st floor",
  "2st floor",
  "ENGINEERING BUILDING",
  "CHEMICAL STORAGE",
  "COOLING STATION",
  "PUMP STATION",
  "BOILER HOUSE",
];
export const ZONES_PLACES: string[] = ["UNC", "CNC", "ALL", "B", "C", "D"];
