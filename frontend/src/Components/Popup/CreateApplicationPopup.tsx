import React, { useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
} from "@mui/material";
import { organizations, users } from "../../App";
import { useAtom } from "jotai";
import BasicSelect from "../Inputs/SelectMUI";

interface CreateApplicationPopupProps {
  open: boolean;
  onClose: () => void;
  onCreate: (formValues: {
    name: string;
    surname: string;
    start_date: string;
    due_date: string;
    tell: string;
    responsiblePerson: string;
    organization: string;
  }) => void;
}

const CreateApplicationPopup: React.FC<CreateApplicationPopupProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [organizationsDataBase] = useAtom(organizations);
  const [usersDataBase] = useAtom(users);
  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    start_date: "",
    due_date: "",
    tell: "",
    responsiblePerson: "",
    organization: "",
  });
  const [organization, setOrganization] = useState<number>();
  const [userForm, setUserForm] = useState<number>();
  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name as string]: value as string });
  };

  const handleSubmit = () => {
    onCreate(formValues);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Application</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            label="Name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
          />
          <TextField
            required
            label="Surname"
            name="surname"
            value={formValues.surname}
            onChange={handleChange}
          />
          <TextField
            label="Start Date"
            type="datetime-local"
            name="start_date"
            InputLabelProps={{
              shrink: true,
            }}
            value={formValues.start_date}
            onChange={handleChange}
          />
          <TextField
            label="Due Date"
            type="datetime-local"
            name="due_date"
            InputLabelProps={{
              shrink: true,
            }}
            value={formValues.due_date}
            onChange={handleChange}
          />
          <TextField
            required
            label="Phone"
            name="tell"
            value={formValues.tell}
            onChange={handleChange}
            inputProps={{
              maxLength: 11,
            }}
          />
          <FormControl fullWidth sx={{ m: 1 }}>
            <BasicSelect
              attributs={usersDataBase}
              setAttribut={setUserForm}
              placeholder={"Responsible Person"}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <BasicSelect
              attributs={organizationsDataBase}
              setAttribut={setOrganization}
              placeholder={"Organization"}
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateApplicationPopup;
