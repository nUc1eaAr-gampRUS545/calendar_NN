import format from "date-fns/format";
import parse from "date-fns/parse";
import getDay from "date-fns/getDay";
import startOfWeek from "date-fns/startOfWeek";
import { dateFnsLocalizer } from "react-big-calendar";
import { locales } from "../utils/constants";

export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });