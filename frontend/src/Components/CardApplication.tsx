import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import {
  ApplicationDataBase,
  OrganizationType,
  ITypeWork,
  User,
} from "moduleTypes";
import apiForUsers from "../api/apiUserList";
import stringToColor from "../helpers/colorIconUser";
import convertToReadableDate from "../helpers/convertToReadableDate";
import apiForOrhanization from "../api/apiOrganizationHandler";
import apiTypesWorks from "../api/apiTypeWork";
import { userAtom } from "../App";
import { useAtom } from "jotai";
import { Button } from "@mui/joy";

interface RecipeReviewCardProps {
  card: ApplicationDataBase;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;

  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const RecipeReviewCard: React.FC<RecipeReviewCardProps> = ({ card }) => {
  const [user] = useAtom(userAtom);
  const [specialTypesWork, setSpecialTypesWork] = useState<ITypeWork[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [createdUserInfo, setCreatedUserInfo] = useState<User | null>(null);
  const [responsibleRersonInfo, setResponsibleRersonInfo] =
    useState<User | null>(null);
  const [organizationInfo, setOrganizationInfo] =
    useState<OrganizationType | null>(null);

  const getUsers = () => {
    apiForUsers
      .getUser(card.createdUser_id)
      .then((res) => {
        setCreatedUserInfo(res.data);
        setResponsibleRersonInfo(res.data);
      })
      .catch((err) => console.error(err));
  };
  const getCreatedUserAndResponsPerson = () => {
    Promise.all([
      apiForUsers
        .getUser(card.createdUser_id)
        .then((res) => setCreatedUserInfo(res.data)),
      apiForUsers
        .getUser(card.responsiblePerson_id)
        .then((res) => setResponsibleRersonInfo(res.data)),
    ]).catch((err) => console.error(err));
  };

  useEffect(() => {
    if (card) {
      card.responsiblePerson_id == card.createdUser_id
        ? getUsers()
        : getCreatedUserAndResponsPerson();
    }
    apiForOrhanization
      .getOrg(card.organization_id)
      .then((res) => setOrganizationInfo(res.data))
      .catch((err) => console.error(err));
  }, [card]);

  useEffect(() => {
    apiTypesWorks
      .post(card.types_works_ids) // Оберните IDs в объект
      .then((info) => {
        setSpecialTypesWork(info.data); // Сохраните в состояние
      })
      .catch((err) => console.error(err));
  }, [card.types_works_ids]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2 , backgroundColor:user.id == card.responsiblePerson_id ? red[200] : "whitesmoke"} } >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: stringToColor(
                createdUserInfo ? createdUserInfo.name : ""
              ),
            }}
            style={{
              backgroundColor: stringToColor(
                createdUserInfo ? createdUserInfo.name : ""
              ),
            }}
            aria-label="recipe"
          >
            {createdUserInfo
              ? `${createdUserInfo.name[0]}${createdUserInfo.surname[0]}`
              : " "}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          createdUserInfo
            ? `${createdUserInfo.name} ${createdUserInfo.surname}`
            : "Loading..."
        }
        subheader={convertToReadableDate(card.created_at)}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Добрый день коллеги! Прошу согласовать заявку на пропуск. .... проведи
          пожалуйста все необходимые инструктажи.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body1" color="text.primary" mt={2}>
            <strong>Фамилия Имя:</strong> {`${card.name} ${card.surname}`}
          </Typography>
          <Typography variant="body1" color="text.primary">
            <strong>Организация:</strong> {organizationInfo?.name}
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
          {specialTypesWork.map((type) => (
            <Typography key={type.id} variant="body2" color="text.secondary">
              - {type.description}
            </Typography>
          ))}
          <Typography variant="body1" color="text.primary">
            <strong>Наименование объекта/площадки:</strong>
          </Typography>
          <Typography variant="body1" color="text.primary">
            <strong>Контактное лицо:</strong>
            {` ${responsibleRersonInfo?.name} ${responsibleRersonInfo?.surname}`}
          </Typography>
          <Typography variant="body1" color="text.primary">
            <strong>Контактный телефон:</strong> {card.tell}
          </Typography>
          <Button >Утвердить вход</Button>
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default RecipeReviewCard;
