import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import {
  IApplicationDataBase,
  IOrganization,
  ITypeWork,
  IUser,
  IPlaceLMK,
} from "moduleTypes";
import apiForUsers from "../api/apiUserList";
import stringToColor from "../helpers/colorIconUser";
import convertToReadableDate from "../helpers/convertToReadableDate";
import apiForOrhanization from "../api/apiOrganizationHandler";
import apiTypesWorks from "../api/apiTypeWork";
import { userAtom } from "../App";
import { useAtom } from "jotai";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import apiApplications from "../api/apiApplications";
import { safety_briefings } from "../utils/constants";
import apiGetPlaces from "../api/apiGetPlacesLMK";

interface RecipeReviewCardProps {
  card: IApplicationDataBase;
}

const RecipeReviewCard: React.FC<RecipeReviewCardProps> = ({ card }) => {
  const [user] = useAtom(userAtom);
  const [placeDataBase, setPlaceDataBase] = useState<IPlaceLMK>();
  const [responsibleRersonInfo, setResponsibleRersonInfo] =
    useState<IUser | null>(null);
  const [organizationInfo, setOrganizationInfo] =
    useState<IOrganization | null>(null);
  const [open, setOpen] = useState(false);
  const [briefings, setBriefings] = useState<number[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApprovalChange = (
    approvalField: keyof IApplicationDataBase,
    value: boolean
  ) => {
    apiApplications.update(card.id, { [approvalField]: value });
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          margin: 1,
          backgroundColor:
            user.id === card.responsible_person.id ? red[200] : "whitesmoke",
          cursor: "pointer",
        }}
        onClick={handleClickOpen}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: stringToColor(card.created_user.name),
              }}
              aria-label="recipe"
            >
              {`${card.created_user.name[0]}${card.created_user.surname[0]}`}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={`${card.created_user.name} ${card.created_user.surname}`}
          subheader={convertToReadableDate(card.created_at)}
        />
      </Card>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Application Details</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.primary" mt={2}>
            <strong>Фамилия Имя:</strong> {`${card.name} ${card.surname}`}
          </Typography>
          <Typography variant="body1" color="text.primary">
            <strong>Организация:</strong> {card.organization.name}
          </Typography>
          <Typography variant="body1" color="text.primary">
            <strong>Срок действия пропуска:</strong>{" "}
            {`${convertToReadableDate(
              card.start_date
            )} - ${convertToReadableDate(card.due_date)}`}
          </Typography>
          <Typography variant="body1">
            <strong>Типы работ:</strong>
          </Typography>
          {card.types_works.map((type) => (
            <Typography key={type.id} variant="body2" color="text.secondary">
              - {type.description}
            </Typography>
          ))}
          <Typography variant="body1" color="text.primary">
            <strong>Наименование объекта/площадки:</strong>
           
               {`${card.place.name}   ${card.place.zone}`}
          </Typography>
          <Typography variant="body1" color="text.primary">
            <strong>Контактное лицо:</strong>
            {` ${card.responsible_person?.name} ${card.responsible_person?.surname}`}
          </Typography>
          <Typography variant="body1" color="text.primary">
            <strong>Контактный телефон:</strong> {card.tell}
          </Typography>

          {safety_briefings.map((data) => (
            <FormControlLabel
              key={data.id}
              control={
                <Checkbox
                  checked={card.briefings.includes(data.id)}
                  onChange={() => {
                    const updatedBriefings = card.briefings.includes(data.id)
                      ? card.briefings.filter((id) => id !== data.id)
                      : [...card.briefings, data.id];

                    setBriefings(updatedBriefings);
                    apiApplications.update(card.id, {
                      briefings: updatedBriefings,
                    });
                  }}
                />
              }
              label={data.name}
            />
          ))}

          <FormControlLabel
            control={
              <Checkbox
                checked={card.zone_owner_approval}
                onChange={(e) =>
                  handleApprovalChange("zone_owner_approval", e.target.checked)
                }
              />
            }
            label="Подтверждение владельца зоны"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={card.contractor_supervisor_approval}
                onChange={(e) =>
                  handleApprovalChange(
                    "contractor_supervisor_approval",
                    e.target.checked
                  )
                }
              />
            }
            label="Подтверждение руководителя подрядчика"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={card.security_approval}
                onChange={(e) =>
                  handleApprovalChange("security_approval", e.target.checked)
                }
              />
            }
            label="Подтверждение службы безопасности"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RecipeReviewCard;
