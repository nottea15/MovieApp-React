import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import movies from "../utils/movies";
import {
  Box,
  CircularProgress,
  Typography,
  CircularProgressWithLabel,
  Card,
  Grid,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import FavouriteMovieButton from "../components/FavouriteMovieButton";
import ActorCard from "../components/ActorCard";
import AliceCarousel from "react-alice-carousel";
import MovieCarousel from "../components/MovieCarousel";
import { maxHeight } from "@mui/system";
import ModalComponent from "../components/ModalComponent";

const MoviePage = () => {
  const [movie, setMovie] = useState();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [cast, setCast] = useState();
  const { id } = useParams();

  useEffect(() => {
    const getMovie = async () => {
      const { data } = await movies.get(`/movie/${id}`);
      setMovie(data);
    };
    const getCast = async () => {
      const { data } = await movies.get(`/movie/${id}/credits`);
      setCast(data.cast);
    };
    getMovie();
    getCast();
  }, []);
  const slicedRenderedCast = cast?.slice(0, 4).map((actor) => {
    return <ActorCard key={actor.cast_id} actor={actor} />;
  });
  const renderedCast = cast?.map((actor) => {
    return (
      <Grid item md={3} sm={5}>
        <ActorCard key={actor.cast_id} actor={actor} />
      </Grid>
    );
  });
  slicedRenderedCast?.push(
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 350,
        width: 175,
        borderRadius: "20px",
      }}
    >
      <CardActions>
        <Button onClick={handleOpenModal}>See all</Button>
      </CardActions>
    </Card>
  );
  console.log(cast);
  if (!movie) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Grid
        container
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7 ), rgba(0, 0, 0, 0.7)), url("https://image.tmdb.org/t/p/w500/${movie.backdrop_path}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          top: 0,
          justifyContent: "center",
          padding: "40px 0",
          margin: "0",
        }}
      >
        <Grid
          item
          md={2}
          sm={6}
          className="posterWrapper"
          sx={{
            minWidth: "300px",
            width: "300px",
            height: "450px",
            overflow: "hidden",
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            height="100%"
            alt={movie.title}
            style={{
              borderRadius: "30px",
            }}
          />
        </Grid>
        <Grid
          item
          md={6}
          sm={12}
          className="content"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "8px",
          }}
        >
          <Typography variant="h4" color="inherit">
            {movie.title + " " + `(${movie.release_date.slice(0, 4)})`}
          </Typography>
          <Box display="flex">
            {movie.genres.map((genre) => {
              return (
                <Typography key={genre.id} variant="caption" padding="0 5px">
                  {genre.name}
                </Typography>
              );
            })}
          </Box>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.6 ), rgba(0, 0, 0, 0.6))",
              width: 70,
              borderRadius: 100,
              margin: "20px 0",
            }}
          >
            <CircularProgress
              variant="determinate"
              value={movie.vote_average * 10}
              size={70}
              color="success"
            />
            <Box
              sx={{
                top: "20px",
                left: 13,
                bottom: 0,
                right: 0,
                position: "absolute",
                width: 80,
                height: 80,
              }}
            >
              <Typography variant="h5" component="div" color="text.primary">
                {Math.round(movie.vote_average * 10)}%
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2">{movie.overview}</Typography>
        </Grid>

        <Box sx={{ position: "absolute", top: "20px", right: "2%" }}>
          <FavouriteMovieButton movie={movie} />
        </Box>
      </Grid>
      <Box sx={{ width: "80%" }}>
        <Typography variant="h3">Cast</Typography>
        <MovieCarousel items={slicedRenderedCast} />
        <ModalComponent
          open={openModal}
          handleClose={handleCloseModal}
          content={renderedCast}
        />
      </Box>
    </Box>
  );
};

export default MoviePage;
