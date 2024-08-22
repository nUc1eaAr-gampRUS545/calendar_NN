import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { useAtom } from "jotai";
import { placesLMK } from "../../App";
import SelectPlace from "../Inputs/SelectPlace";
import { TYPES_FRAMES_PLACES, ZONES_PLACES } from "../../utils/constants";

interface PlaceFilterPopupProps {
  open: boolean;
  onClose:  (value: React.SetStateAction<boolean>) => void;
  setPlaceId: React.Dispatch<React.SetStateAction<number>>,
  setPlace: React.Dispatch<React.SetStateAction<string>>,
}

const PlaceFilterPopup: React.FC<PlaceFilterPopupProps> = ({
  open,
  onClose,
  setPlaceId,
  setPlace
}) => {
  const [places] = useAtom(placesLMK);
  const [filters, setFilters] = useState({
    frame: "",
    zone: "",
  });

  const handleChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onClose(false);
  };

  const filteredPlaces = places.filter(
    (data) =>
      (!filters.frame || data.frame === filters.frame) &&
      (!filters.zone || data.zone === filters.zone)
  );

  return (
    <Dialog open={open} onClose={onClose}  >
      <DialogTitle sx={{width:"350px"}}>Filter Places</DialogTitle>
      <DialogContent sx={{margin:0}}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Frame</InputLabel>
          <Select
            name="frame"
            value={filters.frame}
            label={"Frame"}
            onChange={handleChange}
          >
            {TYPES_FRAMES_PLACES.map((data) => (
              <MenuItem key={data} value={data}>
                {data}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Zone</InputLabel>
          <Select
            name="zone"
            label="Zone"
            value={filters.zone}
            onChange={handleChange}
          >
            {ZONES_PLACES.map((data) => (
              <MenuItem key={data} value={data}> 
                {data}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControl fullWidth margin="normal">
          <SelectPlace
            attributs={filteredPlaces}
            setAttribut={setPlaceId}
            setPlace={setPlace}
            placeholder="Places in LMK"
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Apply Filters
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlaceFilterPopup;
