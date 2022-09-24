import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLogedIn } from "../redux/features/auth/authSlice";
import {
  favouriteMovie,
  removeFavouriteMovie,
} from "../redux/features/auth/authSlice";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { IconButton } from "@mui/material";

const FavouriteMovieButton = ({ movie }) => {
  const isAuth = useSelector(isLogedIn);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);
  const favouriteMovies = useSelector(
    (state) => state.auth.user?.favouriteMovies
  );

  const handleFavouriteMovie = (movie) => {
    dispatch(favouriteMovie(movie));
  };
  const deleteFavouriteMovie = (movie) => {
    dispatch(removeFavouriteMovie(movie));
  };

  const checkFavouriteMovie = (movie) => {
    if (favouriteMovies) {
      for (let i = 0; i < favouriteMovies.length; i++) {
        if (favouriteMovies[i].id === movie.id) {
          return true;
        }
      }
      return false;
    }
  };
  return (
    <>
      {checkFavouriteMovie(movie) ? (
        <IconButton
          disabled={isLoading}
          size="large"
          onClick={(e) => {
            deleteFavouriteMovie(movie);
            e.stopPropagation();
          }}
          sx={{
            color: "#fff",
            transition: "0.3s",
            "&:hover": { color: "#f5c842", transform: "scale(1.5)" },
          }}
        >
          <StarIcon
            sx={{
              color: "#f5c842",
              fontSize: "inherit",
            }}
          ></StarIcon>
        </IconButton>
      ) : (
        <IconButton
          disabled={isLoading}
          size="large"
          onClick={(e) => {
            handleFavouriteMovie(movie);
            e.stopPropagation();
          }}
          sx={{
            transition: "0.3s",
            color: "#fff",
            "&:hover": { color: "#f5c842", transform: "scale(1.5)" },
          }}
        >
          <StarBorderIcon sx={{ fontSize: "inherit" }}></StarBorderIcon>
        </IconButton>
      )}
    </>
  );
};

export default FavouriteMovieButton;
