import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Drawer,
  List,
  ListItem,
  Modal,
  Button,
  Typography,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form } from "formik";
import { SetStateAction, useAtom } from "jotai";
import { useParams } from "react-router-dom";
import { tasksAtom, userAtom } from "../../App";
import userListApi from "../../api/userListApi";
import taskApi from "../../api/taskApi";
import { AxiosResponse } from "axios";
import { locales, resources } from "../../utils/constants";
import { style } from "../../utils/style";
import authApi from "../../api/authApi";
import { Task, User} from "moduleTypes";


const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const BigCalendar: React.FC = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const { employeeId } = useParams<{ employeeId: string }>();
  const [user] = useAtom(userAtom);
  const [userlist, setUserList] = useState<User[]>([]);
  const [selectUser, setSelectUser] = useState<number>(user.id);
  const [data, setData] = useState<AxiosResponse<any, any>>();
  const [openDraw, setOpenDraw] = useState(false);
  const [buttonLabel, setButtonLabel] = useState<string>("Create");
  const [startTask, setStart] = useState<Date | null | undefined>(null);
  const [endTask, setEnd] = useState<Date | null | undefined>(null);
  const [titleTask, setTitleTask] = useState<string>("");
  const [taskId, setIdTask] = useState<number>();
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpenDraw(true);
  const closeDrawer = () => setOpenDraw(false);
  const handleClose = () => setOpen(false);

  const getUserList = async () => {
    const res = await userListApi.getuserlist();
    try {
    
      setUserList(res as any);
    } catch (err) {
      alert(err);
    }
  };

  // useEffect(()=>{
  //   getUserList();
  // },[])

  useEffect(() => {
    const getTasks = async () => {
      const res = await taskApi.gettask();
      try {
        setData(res);
        setTasks(res as any); // Update the global state with fetched tasks
      } catch (err) {
        alert(err);
      }
    };
    getTasks();
  }, [selectUser, openDraw, setTasks]);

  useEffect(() => {
   
    getUserList();
  }, [employeeId, openDraw]);

  const updateSelectUser = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectUser(e.target.value as number);
  };

  const createTask = async (employeeId: number) => {
    if (!taskId) {
      try {
        await taskApi.create({
          employeeId,
          title: titleTask,
          created_at: startTask,
          due_date: endTask,
        });
      } catch (err) {
        alert(err);
      }
    } else {
      try {
        await taskApi.update(taskId, {
          title: titleTask,
          created_at: startTask,
          due_date: endTask,
        });
      } catch (err) {
        alert(err);
      }
    }
    closeDrawer();
  };

  const deleteTask = async () => {
    try {
      if (taskId) {
        await taskApi.delete(selectUser, taskId);
        setTasks((prevTasks: any) =>
          prevTasks.filter((task: Task) => task.id !== taskId)
        ); // Remove the task from the local state
      }
      closeDrawer();
    } catch (err) {
      alert(err);
    }
  };

  const HandleData = ({
    start,
    end,
  }: {
    start: Date | null | undefined;
    end: Date | null | undefined;
  }) => {
    setEnd(end);
    setStart(start);
    openDrawer();
    setButtonLabel("Create");
  };

  const HandleDatas = ({
    start,
    end,
    id,
    title,
  }: {
    start: Date | null | undefined;
    end: Date | null | undefined;
    id: number;
    title: string;
  }) => {
    setEnd(end);
    setStart(start);
    setIdTask(id);
    setTitleTask(title);
    openDrawer();
    setButtonLabel("Update");
  };

  const updateTitleTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleTask(event.target.value);
  };

  const UpdateStartTime = (start: Date | null) => {
    setStart(start);
  };

  const taskEvents = tasks.map((task: Task) => ({
    title: task.title,
    id: task.id,
    resource: task.id,
    start: new Date(task.created_at),
    end: new Date(task.due_date),
  }));

  return (
    <Box sx={{ height: "96vh", margin: "2vh" }}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="select-user-label"
          id="select-user"
          value={selectUser}
          onChange={()=>updateSelectUser}
          label="Select User"
        >
          {userlist.map((option) => (
            <MenuItem key={option.email} value={option.name}>
              {option.surname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <Box sx={{ height: "90%" }}>
        <Calendar
          events={taskEvents}
          localizer={localizer}
          onSelectSlot={({ start, end }) => HandleData({ start, end })}
          onDoubleClickEvent={({ start, end, id, title }) => {
            HandleDatas({ start, end, id, title });
          }}
          startAccessor="start"
          endAccessor="end"
          style={{ fontFamily: "roboto" }}
          selectable
        />
        <Drawer anchor={"right"} open={openDraw} onClose={closeDrawer}>
          <Box sx={{ width: "30vw", padding: "2vw", height: "100%" }}>
            <Formik initialValues={{}} onSubmit={() => {}}>
              {() => (
                <Form>
                  <List>
                    <ListItem>
                      <DatePicker
                        selected={startTask}
                        onChange={(date) => UpdateStartTime(date)}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                      />
                    </ListItem>
                    <ListItem>
                      <DatePicker
                        selected={endTask}
                        onChange={(date) => setEnd(date)}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                      />
                    </ListItem>
                    <ListItem>
                      <input
                        value={titleTask}
                        onChange={updateTitleTask}
                        placeholder="Enter title"
                      />
                    </ListItem>
                    <ListItem sx={{ mt: "5vw", mr: "5vw" }}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={deleteTask}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => createTask(selectUser)}
                      >
                        {buttonLabel}
                      </Button>
                    </ListItem>
                  </List>
                </Form>
              )}
            </Formik>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
};

export default BigCalendar;
