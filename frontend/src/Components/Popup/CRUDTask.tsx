import { Box, Button, Drawer, List, ListItem } from "@mui/material";
import { Form, Formik } from "formik";
import { CRUDTaskProps, Task } from "moduleTypes";
import { useState } from "react";
import DatePicker from "react-datepicker";
import TextAreaMUI from "../Inputs/TextAreaMUI";
import "react-datepicker/dist/react-datepicker.css";
import StyledDatePickerWrapper from "../../styledComponents/DatePickerSC";
import MultipleSelectChip from "../Inputs/ChipSelectMUI";
import BasicSelect from "../Inputs/SelectMUI";
import taskApi from "../../api/taskApi";
import { tasksAtom } from "../../App";
import { useAtom } from "jotai";
import Contact from "../Inputs/UploadFile";
import { uploadFileApi } from "../../api/apiFileHand";
// import { AxiosResponse } from "axios";
import { FileDisplay } from "../FileDisplay";

export const CRUDTask: React.FC<CRUDTaskProps> = (props) => {
  const [, setTasks] = useAtom(tasksAtom);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [filesID, setFilesID] = useState<number[]>([]);
  const [files, setFiles] = useState<File[] | undefined>([]);

  const postFiles = () => {
    if (files) {
      files.forEach(
        async (file) =>
          await uploadFileApi(file)
            .then((res) => {
              setFilesID((state) => [...state, res.data.data.id]);
           
            })
            .catch((err) => console.error(err))
      );
      setFiles([])
    } else {
      return null;
    }
  };

  const CreateTask = (employeeId: number) => {
    postFiles();
    taskApi.create({
      employeeId,
      title: props.titleTask,
      description: props.description,
      start_date: props.startTask,
      venue: props.placeExecutionTask,
      files: filesID,
      users: props.executors,
      importance: props.workStatus,
      due_date: props.endTask,
    });
    setFiles([]);
    props.closeDrawer();

    try {
      if (props.taskId) {
        try {
          taskApi.update(props.taskId, {
            title: props.titleTask,
            created_at: props.startTask,
            due_date: props.endTask,
          });
        } catch (err) {
          console.error(err);
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    props.closeDrawer();
  };

  const DeleteTask = async () => {
    try {
      if (props.taskId) {
        await taskApi.delete(props.selectUserID, props.taskId);
        setTasks((prevTasks: any) =>
          prevTasks.filter((task: Task) => task.id !== props.taskId)
        );
        
      }
      props.closeDrawer();
    } catch (err) {
      props.closeDrawer();
      console.error(err);
    }
  };

  return (
    <Drawer anchor={"right"} open={props.openDraw} onClose={props.closeDrawer}>
      <Box sx={{ width: "50vw", padding: "2vw", height: "100%" }}>
        <Formik initialValues={{}} onSubmit={() => {}} sx={{ width: "100%" }}>
          {() => (
            <Form>
              <List>
                <ListItem>
                  <StyledDatePickerWrapper>
                    <DatePicker
                      selected={props.startTask}
                      onChange={(date) => props.setStart(date)}
                      showTimeSelect
                      showTwoColumnMonthYearPicker
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  </StyledDatePickerWrapper>
                </ListItem>

                <ListItem>
                  <StyledDatePickerWrapper>
                    <DatePicker
                      selected={props.endTask}
                      onChange={(date) => props.setEnd(date)}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  </StyledDatePickerWrapper>
                </ListItem>

                <ListItem>
                  <TextAreaMUI
                    placeholder="Enter title"
                    minRows={2}
                    value={props.titleTask}
                    options={"50%"}
                    onChange={props.updateTitleTask}
                  />
                  <TextAreaMUI
                    placeholder="Enter description"
                    minRows={2}
                    options={"50%"}
                    onChange={props.setDescription}
                    value={props.description}
                  />
                </ListItem>
                <ListItem>
                  <TextAreaMUI
                    placeholder="Enter venue"
                    minRows={1}
                    options={"100%"}
                    onChange={props.setPlaceExecutionTask}
                    value={props.placeExecutionTask}
                  />
                </ListItem>
                <ListItem>
                  <MultipleSelectChip
                    users={props.userlist}
                    setExecutors={props.setExecutors}
                  />
                  <BasicSelect
                    attributs={[
                      "Простые работы",
                      "Работы повышенной сложности",
                    ]}
                    setAttribut={props.setWorkStatus}
                    placeholder={"Work status"}
                    options={"50%"}
                    valueProps={props.workStatus}
                  />
                </ListItem>
                <ListItem>
                  <Contact
                    setFiles={setFiles}
                    setIsDragActive={setIsDragActive}
                  />
                </ListItem>
                <ListItem sx={{ mt: "0vw", mr: "10vw" }}>
                {files != undefined && files.length != 0 && (
                    <Button
                      variant="contained"
                      sx={{ m: "3px 30px 0px 3px" }}
                      color="success"
                      onClick={postFiles}
                    >
                      Save files
                    </Button>
                  )}
                  {props.buttonLabel != "Create" && (
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ m: "3px 30px 0px 3px" }}
                      onClick={DeleteTask}
                    >
                      Delete
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => CreateTask(props.selectUserID)}
                  >
                    {props.buttonLabel}
                  </Button>
                </ListItem>
                <ListItem>
                  <FileDisplay filesDataBase={props.filesDataBase} />
                </ListItem>
              </List>
            </Form>
          )}
        </Formik>
      </Box>
    </Drawer>
  );
};
