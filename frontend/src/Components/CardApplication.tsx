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
import { ApplicationDataBase, OrganizationType, User } from "moduleTypes";
import apiForUsers from "../api/apiUserList";
import stringToColor from "../helpers/colorIconUser";
import convertToReadableDate from "../helpers/convertToReadableDate";
import apiForOrhanization from "../api/apiOrganizationHandler";

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
  const [expanded, setExpanded] = useState(false);
  const [createdUserInfo, setCreatedUserInfo] = useState<User | null>(null);
  const [organizationInfo, setOrganizationInfo] =
    useState<OrganizationType | null>(null);

  useEffect(() => {
    if (card) {
      apiForUsers
        .getUser(card.createdUser_id)
        .then((res) => setCreatedUserInfo(res.data))
        .catch((err) => console.error(err));
    }
    apiForOrhanization
      .getOrg(card.organization_id)
      .then((res) => setOrganizationInfo(res.data))
      .catch((err) => console.error(err));
  }, [card]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
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
            <strong>Фамилия Имя:</strong>{" "}
            {`${card.name} ${card.surname}`}
          </Typography>
          <Typography variant="body1" color="text.primary">
            <strong>Организация:</strong> {organizationInfo?.name}
          </Typography>
          <Typography variant="body1" color="text.primary">
            <strong>Срок действия пропуска:</strong> {`${convertToReadableDate(card.start_date)} - ${convertToReadableDate(card.due_date)}`} 
          </Typography>
          <Typography variant="body1" color="text.primary">
            <strong>Основание для пропуска:</strong> Обеспечение бесперебойной
            работы оборудования
          </Typography>
          <Typography variant="body1" color="text.primary">
            <strong>Наименование объекта/площадки:</strong>
          </Typography>
          <Typography variant="body1" color="text.primary">
            <strong>Контактное лицо:</strong> Козлов Константин Павлович
          </Typography>
          <Typography variant="body1" color="text.primary">
            <strong>Контактный телефон:</strong> +7 (123) 456-78-90
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default RecipeReviewCard;
