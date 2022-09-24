import React from "react";
import Grid from "@mui/material/Grid";
import MovieCard from "./MovieCard";

const BookList = ({ result, isLoading }) => {
  return (
    <Grid item md={4} xs={6}>
      <MovieCard movie={result} isLoading={isLoading} />
    </Grid>
  );
};

export default BookList;
