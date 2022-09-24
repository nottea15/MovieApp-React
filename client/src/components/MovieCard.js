import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import backgroundImage from "../images.jpg";
import { isLogedIn } from "../redux/features/auth/authSlice";
import {
  favouriteMovie,
  removeFavouriteMovie,
} from "../redux/features/auth/authSlice";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import FavouriteMovieButton from "./FavouriteMovieButton";

const MovieCard = ({ movie, isLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(isLogedIn);

  return (
    <Card
      onClick={() => navigate(`/movie/${movie.id}`)}
      sx={{
        margin: "10px",
        height: "400px",
        position: "relative",
        "&:hover": {
          cursor: "pointer",
          "& .cardContent": {
            transform: "translateY(-260px)",
          },
        },
      }}
    >
      <CardMedia
        component="img"
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : backgroundImage
        }
        alt={movie.title}
        height="400"
        width="auto"
      />
      <CardContent
        className="cardContent"
        sx={{
          position: "absolute",
          top: "320px",
          left: "0",
          paddingBottom: "20px",
          paddingTop: "20px",
          color: "#fff",
          textAlign: "center",
          width: "100%",
          backgroundColor: "rgba(0,0,0, 0.5)",
          transition: "all 1s",
          height: "103%",
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            marginBottom: "30px",
          }}
        >
          {movie.title}
        </Typography>
        <Typography
          gutterBottom
          variant="p"
          component="div"
          className="description"
          // sx={{ display: "none" }}
        >
          {movie.overview}
        </Typography>
      </CardContent>
      {isAuth && (
        <CardActions
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
          }}
        >
          <FavouriteMovieButton movie={movie} />
        </CardActions>
      )}
    </Card>
  );
};

export default MovieCard;
