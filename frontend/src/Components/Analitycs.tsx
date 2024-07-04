import React, { useState } from "react";
import { useAtom } from "jotai";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Box,
  Typography,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { tasksAtom } from "../App"; // Atom for storing tasks
import { COLORS, taskColors } from "../utils/style";
import { daysOfWeek } from "../utils/constants";

interface Task {
  title: string;
  start: string;
  end: string;
  taskId: string;
  employee: string; // New field for employee name
  day?: string;
}

interface ProcessedTask {
  day: string;
  chill: number;
  workAtHome: number;
  workAtOffice: number;
}

interface HourlyActivity {
  hour: string;
  count: number;
}

interface EmployeeWorkHours {
  employee: string;
  hours: number;
}

const Analitycs = () => {
  const [tasks] = useAtom<any>(tasksAtom); // Use tasksAtom to get the list of tasks
  const [selectedWeek, setSelectedWeek] = useState<string | undefined>(
    undefined
  ); // State for selected week
  

  const processData = (tasks: Task[]): ProcessedTask[] => {
    if (!tasks || tasks.length === 0) {
      return [];
    }

    const data = tasks.map((task) => {
      const startDate = new Date(task.start);
      const day = daysOfWeek[startDate.getDay()]; // Get day in Russian
      return { ...task, day };
    });

    const counts: {
      [key: string]: {
        chill: number;
        workAtHome: number;
        workAtOffice: number;
      };
    } = data.reduce((acc, task) => {
      if (!acc[task.day!]) {
        acc[task.day!] = { chill: 0, workAtHome: 0, workAtOffice: 0 };
      }
      if (task.title.toLowerCase() === "chill") {
        acc[task.day!].chill += 1;
      } else if (task.title.toLowerCase() === "work at home") {
        acc[task.day!].workAtHome += 1;
      } else if (task.title.toLowerCase() === "work at office") {
        acc[task.day!].workAtOffice += 1;
      }
      return acc;
    }, {} as { [key: string]: { chill: number; workAtHome: number; workAtOffice: number } });

    const sortedData = Object.entries(counts)
      .map(([day, { chill, workAtHome, workAtOffice }]) => ({
        day,
        chill,
        workAtHome,
        workAtOffice,
      }))
      .sort((a, b) => daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day));

    return sortedData;
  };

  const calculateWorkRestHours = (tasks: Task[]) => {
    let workHours = 0;
    let restHours = 0;

    tasks.forEach((task) => {
      const start = new Date(task.start);
      const end = new Date(task.end);
      const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // in hours

      if (task.title.toLowerCase() === "chill") {
        restHours += duration;
      } else {
        workHours += duration;
      }
    });

    return { workHours, restHours };
  };

  const calculateHourlyActivity = (tasks: Task[]) => {
    const hourlyActivity: { [key: string]: number } = {};

    tasks.forEach((task) => {
      const start = new Date(task.start);
      const hour = start.getHours();
      hourlyActivity[hour] = (hourlyActivity[hour] || 0) + 1;
    });

    return Object.entries(hourlyActivity).map(([hour, count]) => ({
      hour: `${hour}:00`,
      count,
    }));
  };

  const calculateEmployeeWorkHours = (tasks: Task[]) => {
    const employeeWorkHours: { [key: string]: number } = {};

    tasks.forEach((task) => {
      const start = new Date(task.start);
      const end = new Date(task.end);
      const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // in hours

      if (task.title.toLowerCase() !== "chill") {
        employeeWorkHours[task.employee] =
          (employeeWorkHours[task.employee] || 0) + duration;
      }
    });

    return Object.entries(employeeWorkHours).map(([employee, hours]) => ({
      employee,
      hours,
    }));
  };

  // Filter tasks based on the selected week
  const filterTasksByWeek = (
    tasks: Task[],
    selectedWeek: string | undefined
  ) => {
    if (!selectedWeek) return tasks;
    const [startDate, endDate] = selectedWeek
      .split(" - ")
      .map((date) => new Date(date));
    return tasks.filter((task) => {
      const taskDate = new Date(task.start);
      return taskDate >= startDate && taskDate <= endDate;
    });
  };

  // Generate week options
  const generateWeekOptions = (tasks: Task[]) => {
    if (!tasks || tasks.length === 0) return [];

    const sortedTasks = tasks.sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );
    const weekOptions: string[] = [];

    let currentWeekStart = new Date(sortedTasks[0].start);
    let currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);

    weekOptions.push(
      `${currentWeekStart.toISOString().slice(0, 10)} - ${currentWeekEnd
        .toISOString()
        .slice(0, 10)}`
    );

    sortedTasks.forEach((task) => {
      const taskDate = new Date(task.start);
      if (taskDate > currentWeekEnd) {
        currentWeekStart = new Date(taskDate);
        currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);
        weekOptions.push(
          `${currentWeekStart.toISOString().slice(0, 10)} - ${currentWeekEnd
            .toISOString()
            .slice(0, 10)}`
        );
      }
    });

    return weekOptions;
  };

  const weekOptions = generateWeekOptions(Array.isArray(tasks) ?  tasks : []);
  const filteredTasks = filterTasksByWeek((Array.isArray(tasks) ?  tasks : []), selectedWeek);
  const chartData = processData(filteredTasks);
  const { workHours, restHours } = calculateWorkRestHours(filteredTasks);
  const hourlyActivityData = calculateHourlyActivity(filteredTasks);
  const employeeWorkHoursData = calculateEmployeeWorkHours(filteredTasks);

  // Data for the pie chart excluding "chill"
  const pieChartData = chartData.map(({ day, workAtHome, workAtOffice }) => ({
    name: day,
    value: workAtHome + workAtOffice,
  }));

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Typography variant="h6" component="div" gutterBottom sx={{ mb: 4 }}>
        Task Analytics
      </Typography>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="week-select-label">Выбор недели</InputLabel>
        <Select
          labelId="week-select-label"
          id="week-select"
          value={selectedWeek}
          label="Выбор недели"
          onChange={(e) => setSelectedWeek(e.target.value as string)}
          sx={{ maxWidth: 300 }} // Limiting the width of the select box
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200, // Limiting the height of the dropdown
                width: 250, // Setting the width of the dropdown
              },
            },
          }}
        >
          {weekOptions.map((week, index) => (
            <MenuItem key={index} value={week}>
              {week}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {chartData.length > 0 ? (
        <Grid container spacing={2}>
          <Grid container item spacing={2}>
            <Grid item xs={6}>
              <BarChart width={600} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="chill"
                  name="chill"
                  stackId="a"
                  fill={taskColors.chill}
                />
                <Bar
                  dataKey="workAtHome"
                  name="work at home"
                  stackId="a"
                  fill={taskColors.workAtHome}
                />
                <Bar
                  dataKey="workAtOffice"
                  name="work at office"
                  stackId="a"
                  fill={taskColors.workAtOffice}
                />
              </BarChart>
            </Grid>
            <Grid item xs={6}>
              <PieChart width={400} height={400}>
                <Pie
                  data={pieChartData}
                  cx={200}
                  cy={200}
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item xs={6}>
              <PieChart width={600} height={400}>
                <Pie
                  data={[
                    { name: "Рабочие часы", value: workHours },
                    { name: "Часы отдыха", value: restHours },
                  ]}
                  cx={300}
                  cy={200}
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[workHours, restHours].map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </Grid>
            <Grid item xs={6}>
              <LineChart width={600} height={300} data={hourlyActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#82ca9d" />
              </LineChart>
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item xs={12}>
              <BarChart width={1200} height={400} data={employeeWorkHoursData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="employee" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="hours" name="Hours Worked" fill="#8884d8" />
              </BarChart>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body1" component="div" gutterBottom>
          No task data available.
        </Typography>
      )}
    </Box>
  );
};

export default Analitycs;
