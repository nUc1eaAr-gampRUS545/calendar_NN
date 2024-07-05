import { Box, Button, colors, Drawer, List, ListItem } from "@mui/material"
import { Form, Formik } from "formik"
import { CRUDTaskProps } from "moduleTypes";
import { MouseEventHandler, useEffect } from "react";
import DatePicker from "react-datepicker"

export const CRUDTask:React.FC<CRUDTaskProps> = (props)=>{
    // useEffect(()=>{
    //     if(!props.openDraw){
    //         props.setDescriptionTask('');
    //         props.updateTitleTask('');
    //     }
    // })
    return (
    <Drawer anchor={"right"} open={props.openDraw} onClose={props.closeDrawer}>
        <Box sx={{ width: "30vw", padding: "2vw", height: "100%" }}>
          <Formik initialValues={{}} onSubmit={() => {}}>
            {() => (
              <Form>
                <List>
                  <ListItem>
                    <DatePicker
                      selected={props.startTask}
                      onChange={(date) => props.updateStartTime(date)}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  </ListItem>
                  <ListItem>
                    <DatePicker
                      selected={props.endTask}
                      onChange={(date) => props.setEnd(date)}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  </ListItem>
                  <ListItem>
                    <textarea style={{borderColor:"transparent",borderRadius:"5px"}}
                      value={props.titleTask}
                      onChange={props.updateTitleTask}
                      placeholder="Enter title"
                    />
                  </ListItem>
                  <ListItem>
                  <textarea style={{borderColor:"transparent",borderRadius:"5px"}}
                      value={props.descriptionTask}
                      onChange={props.openDraw ? props.setDescriptionTask : ''}
                      placeholder="Enter description"
                    />
                  </ListItem>
                  <ListItem sx={{ mt: "5vw", mr: "5vw" }}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={props.deleteTask}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => props.createTask(props.selectUser)}
                    >
                      {props.buttonLabel}
                    </Button>
                  </ListItem>
                </List>
              </Form>
            )}
          </Formik>
        </Box>
      </Drawer>)
}