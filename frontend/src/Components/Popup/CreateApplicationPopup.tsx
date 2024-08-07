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
import { organizations, userAtom, users } from "../../App";
import { useAtom } from "jotai";
import BasicSelect from "../Inputs/SelectMUI";
import { ApplicationInterface } from "../../utils/constants";
import { CreateApplicationPopupProps, forms } from "moduleTypes";
import apiApplications from "../../api/apiApplications";
import MultipleSelectChip from "../Inputs/ChipSelectMUI";
import SelectTypeWork from "../Inputs/SelectTypeWork";

const CreateApplicationPopup: React.FC<CreateApplicationPopupProps> = ({
  open,
  onClose,
  formValues,
  setValuesForms,
}) => {
  const [organizationsDataBase] = useAtom(organizations);
  const [usersDataBase] = useAtom(users);
  const [user] = useAtom(userAtom);
  const [organization, setOrganization] = useState<number>();
  const [listTypesWorks, setListTypesWorks] = useState<number[]>([]);
  const [userForm, setUserForm] = useState<number>();
  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = e.target;
    setValuesForms({ ...formValues, [name as string]: value as string });
  };
  const handleSubmit = () => {
    formValues.organization_id = organization;
    formValues.responsiblePerson_id = userForm;
    formValues.createdUser_id = user.id;
    formValues.types_works_ids = listTypesWorks;
    apiApplications.create(formValues);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Application</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "100%" } }}
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
            required
            label="Place"
            name="place"
            value={formValues.place}
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
            name="phone"
            value={formValues.phone}
            onChange={handleChange}
            inputProps={{
              maxLength: 11,
            }}
          />
          <SelectTypeWork
            listTypesWorks={listTypesWorks}
            setListTypesWorks={setListTypesWorks}
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
