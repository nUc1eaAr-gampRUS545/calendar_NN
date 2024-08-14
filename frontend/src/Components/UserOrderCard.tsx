import React from "react";
import { Card, CardContent, Typography, Avatar, Grid } from "@mui/material";
import { User } from "moduleTypes";
interface UserCardProps {
  user: User;
}
const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: "20px auto", boxShadow: 3 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar sx={{ bgcolor: "#3f51b5" }}>
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5" component="div">
              {user.name} {user.surname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {user.id}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active: {user.is_active ? "Yes" : "No"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Organization: {user.organization.join(", ")}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserCard;
