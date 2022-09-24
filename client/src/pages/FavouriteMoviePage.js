import React, { useEffect } from "react";
import BookList from "../components/BookList";
import { getUser } from "../redux/features/auth/authSlice";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const FavouriteMoviePage = () => {
  const results = useSelector((state) => state.auth.user?.favouriteMovies);
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const renderedList = results?.map((result) => {
    return (
      <BookList
        key={result.id}
        result={result}
        handleClick={console.log(result)}
        isLoading={isLoading}
      ></BookList>
    );
  });
  return (
    <Grid
      container
      spacing={3}
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      sx={{ mt: "20px" }}
    >
      {results ? renderedList : ""}
    </Grid>
  );
};

export default FavouriteMoviePage;
