import {
  Card,
  CardMedia,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import defaultImage from "../default.png";

const ActorCard = ({ actor }) => {
  const defautl = defaultImage;
  return (
    <Card sx={{ width: 175, height: 350, borderRadius: "20px" }}>
      <CardMedia
        title=""
        component="img"
        height={200}
        image={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
            : defautl
        }
      />
      <CardContent>
        <Typography variant="h6">{actor.original_name}</Typography>
        <Typography variant="caption">{actor.character}</Typography>
      </CardContent>
    </Card>
  );
};

export default ActorCard;
