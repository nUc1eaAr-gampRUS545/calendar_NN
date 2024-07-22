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
import "react-datepicker/dist/react-datepicker.css";
import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import { tasksAtom, userAtom } from "../../App";
import taskApi from "../../api/taskApi";
import { AxiosResponse } from "axios";
import { locales } from "../../utils/constants";
import { style } from "../../utils/style";
import { HandleDatasProps, Task, User } from "moduleTypes";
import { CRUDTask } from "../Popup/CRUDTask";
import apiForUsers from "../../api/userListApi";

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
  const [selectUserID, setSelectUserID] = useState<number>(user.id);
  const [data, setData] = useState<AxiosResponse<any, any>>();
  const [openDraw, setOpenDraw] = useState(false);
  const [buttonLabel, setButtonLabel] = useState<string>("Create");
  const [startTask, setStart] = useState<Date | null | undefined>(null);
  const [endTask, setEnd] = useState<Date | null | undefined>(null);
  const [titleTask, setTitleTask] = useState<string>("");
  const [taskId, setIdTask] = useState<number>();
  const [open, setOpen] = useState(false);
  const [placeExecutionTask, setPlaceExecutionTask] = useState<string>("");
  const [descriptionTask, setDescriptionTask] = useState<string>("");
  const [executors, setExecutors] = useState<number[]>([]);
  const [workStatus, setWorkStatus] = useState<string>("");
  const [filesDataBase, setFilesDataBase] = useState<number[]>();

  const openDrawer = () => setOpenDraw(true);
  const closeDrawer = () => {
    setOpenDraw(false);
    setEnd(null);
    setDescriptionTask("");
    setPlaceExecutionTask("");
    setWorkStatus("");
    setStart(null);
    setIdTask(0);
    setFilesDataBase([]);
    setExecutors([]);
    setTitleTask('');
    setButtonLabel("");}
  const handleClose = () => setOpen(false);

  const getUserList = async () => {
    const res = await apiForUsers.getUserlist();
    try {
      setUserList(res.data as any);
    } catch (err) {
      console.error(err);
    }
  };

  const updateSelectUserID = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectUserID(e.target.value as number);
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
    description,
    venue,
    filesDataBase,
    users,
    importance,
  }: HandleDatasProps) => {
    setEnd(end);
    setDescriptionTask(description);
    setPlaceExecutionTask(venue);
    setWorkStatus(importance);
    setStart(start);
    setIdTask(id);
    setFilesDataBase(filesDataBase);
    setExecutors(users);
    setTitleTask(title);
    openDrawer();
    setButtonLabel("Update");
  };



  const updateStartTime = (start: Date | null) => {
    setStart(start);
  };
  const updateTasks =(tasks:Task[])=>{
  return tasks.map((task: Task) => ({
    title: task.title,
    description: task.description,
    venue: task.venue,
    filesDataBase: task.files,
    users: task.users,
    importance: task.importance,
    id: task.id,
    resource: task.id,
    start: new Date(task.start_date),
    end: new Date(task.due_date),
  }));}

  useEffect(() => {
    const getTasks = async () => {
      const res = await taskApi.gettask();
      try {
        setData(res);
        setTasks(res as any);
      } catch (err) {
        console.error(err);
      }
    };
    getTasks();
    
  }, [selectUserID, openDraw, setTasks]);

  useEffect(() => {
    getUserList();
  }, [employeeId, openDraw]);

  const eventPropGetter = (event: any) => {
    let backgroundColor = "";
    switch (event.importance) {
      case "Простые работы":
        backgroundColor = "#aae0ff";
        break;
      case "Работы повышенной сложности":
        backgroundColor = "orange";
        break;
      default:
        backgroundColor = "blue";
    }
    return { style: { backgroundColor } };
  };

  return (
    <Box sx={{ height: "96vh", margin: "2vh" }}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="select-user-label"
          id="select-user"
          value={selectUserID}
          onChange={()=>updateSelectUserID}
          label="Select User"
        >
          {userlist.map((option) => (
            <MenuItem key={option.email} value={option.id}>
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
          events={updateTasks(tasks)}
          localizer={localizer}
          onSelectSlot={({ start, end }) => HandleData({ start, end })}
         
          onDoubleClickEvent={({
            start,
            end,
            id,
            title,
            description,
            venue,
            filesDataBase,
            users,
            importance,
          }) => {
            HandleDatas({
              start,
              end,
              id,
              title,
              description,
              venue,
              filesDataBase,
              users,
              importance,
            });
          }}
          startAccessor="start"
          endAccessor="end"
          style={{ fontFamily: "roboto",backgroundColor:"#eef8ff"}}
          selectable
          eventPropGetter={eventPropGetter}
        />
        <CRUDTask
          openDraw={openDraw}
          taskId={taskId}
          closeDrawer={closeDrawer}
          startTask={startTask}
          endTask={endTask}
          userlist={userlist}
          titleTask={titleTask}
          updateStartTime={updateStartTime}
          updateTitleTask={setTitleTask}
          filesDataBase={filesDataBase}
          selectUserID={selectUserID}
          buttonLabel={buttonLabel}
          setStart={setStart}
          setEnd={setEnd}
          description={descriptionTask}
          setDescription={setDescriptionTask}
          setPlaceExecutionTask={setPlaceExecutionTask}
          setWorkStatus={setWorkStatus}
          setExecutors={setExecutors}
          workStatus={workStatus}
          executors={executors}
          placeExecutionTask={placeExecutionTask}
        />
      </Box>
    </Box>
  );
};

export default BigCalendar;
