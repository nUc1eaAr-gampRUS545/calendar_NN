import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Typography, Modal } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import { tasksAtom, userAtom, users } from "../../App";
import taskApi from "../../api/apiTaskHendler";
import { AxiosResponse } from "axios";
import { style } from "../../utils/style";
import { HandleDatasProps, ITaskDataBase , IUser } from "moduleTypes";
import { CRUDTask } from "../Popups/CRUDTask";
import { eventPropGetter } from "../../helpers/eventPropGetter";
import { updateEventsCalendar } from "../../helpers/updateEventsCalendar";
import { localizer } from "../../helpers/localizer";

const BigCalendar: React.FC = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const { employeeId } = useParams<{ employeeId: string }>();
  const [user] = useAtom(userAtom);
  const [userlist] = useAtom<IUser[]>(users);
  const [selectUserID, setSelectUserID] = useState<number>(user.id);
  const [data, setData] = useState<AxiosResponse<any, any>>();
  const [openDraw, setOpenDraw] = useState(false);
  const [buttonLabel, setButtonLabel] = useState<string>("Create");
  const [startTask, setStart] = useState<Date | null | undefined>(null);
  const [endTask, setEnd] = useState<Date | null | undefined>(null);
  const [titleTask, setTitleTask] = useState<string>("");
  const [taskId, setIdTask] = useState<number>();
  const [open, setOpen] = useState(false);
  const [descriptionTask, setDescriptionTask] = useState<string>("");
  const [executors, setExecutors] = useState<number[]>([]);
  const [workStatus, setWorkStatus] = useState<string>("");
  const [filesDataBase, setFilesDataBase] = useState<number[]>();

  const openDrawer = () => setOpenDraw(true);
  const closeDrawer = () => {
    setOpenDraw(false);
    setEnd(null);
    setDescriptionTask("");
    setWorkStatus("");
    setStart(null);
    setIdTask(0);
    setFilesDataBase([]);
    setExecutors([]);
    setTitleTask("");
    setButtonLabel("");
  };
  const handleClose = () => setOpen(false);

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
    place,
    filesDataBase,
    users,
    importance,
  }: HandleDatasProps) => {
    setEnd(end);
    setDescriptionTask(description);
    setWorkStatus(importance);
    setStart(start);
    setIdTask(id);
    setFilesDataBase(filesDataBase);
    setTitleTask(title);
    openDrawer();
    setButtonLabel("Update");
  };

  const updateStartTime = (start: Date | null) => {
    setStart(start);
  };

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
  return (
    <Box sx={{ height: "96vh", margin: "2vh" }}>
  
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
          events={updateEventsCalendar(tasks)}
          localizer={localizer}
          onSelectSlot={({ start, end }) => HandleData({ start, end })}
          onDoubleClickEvent={({
            start,
            end,
            id,
            title,
            description,
            place,
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
              place,
              filesDataBase,
              users,
              importance,
            });
          }}
          startAccessor="start"
          endAccessor="end"
          style={{ fontFamily: "roboto", backgroundColor: "#eef8ff" }}
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
          setWorkStatus={setWorkStatus}
          setExecutors={setExecutors}
          workStatus={workStatus}
          executors={executors}

        />
      </Box>
    </Box>
  );
};

export default BigCalendar;
