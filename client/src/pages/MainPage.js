import React, { useState, useEffect } from "react";
import { TextField, Typography } from "@mui/material";
import { Container, Box } from "@mui/system";
import { useSelector } from "react-redux";
import axios from "../utils/movies";
import Grid from "@mui/material/Grid";
import BookList from "../components/BookList";
import MovieCard from "../components/MovieCard";
import MovieCarousel from "../components/MovieCarousel";

const MainPage = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [newest, setNewest] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchMainMovies = async () => {
      const { data } = await axios.get("/movie/top_rated");
      setRecommended(data.results);
    };
    const fetchNewest = async () => {
      const { data } = await axios.get("/movie/popular");
      setNewest(data.results);
    };
    const fetchUpcoming = async () => {
      const { data } = await axios.get("/movie/upcoming");
      setUpcoming(data.results);
    };
    fetchMainMovies();
    fetchNewest();
    fetchUpcoming();
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await axios.get("search/movie", {
        params: {
          query: debouncedTerm,
        },
      });
      setResults(data.results);
    };
    if (debouncedTerm) {
      fetchBooks();
    } else {
      setResults([]);
    }
  }, [debouncedTerm]);

  const renderBooks = results.map((result) => {
    return (
      <BookList
        key={result.id}
        result={result}
        isLoading={isLoading}
      ></BookList>
    );
  });

  const renderedRecommndedMovies = recommended?.map((movie) => {
    return <MovieCard movie={movie} isLoading={isLoading} />;
  });
  const renderednewestMovies = newest?.map((movie) => {
    return <MovieCard movie={movie} isLoading={isLoading} />;
  });
  const renderedUpcomingMovies = upcoming?.map((movie) => {
    return <MovieCard movie={movie} isLoading={isLoading} />;
  });

  return (
    <Container>
      <Box sx={{ mt: "20px" }}>
        <TextField
          fullWidth
          id="search"
          label="Search a movie"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </Box>
      {results.length ? (
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          sx={{ mt: "20px" }}
        >
          {" "}
          {renderBooks}
        </Grid>
      ) : (
        <>
          <Box>
            <Typography textAlign="center" variant="h3">
              Top Rated
            </Typography>
            <MovieCarousel items={renderedRecommndedMovies} />
          </Box>
          <Box>
            <Typography textAlign="center" variant="h3">
              Newest
            </Typography>
            <MovieCarousel items={renderednewestMovies} />
          </Box>
          <Box>
            <Typography textAlign="center" variant="h3">
              Upcoming
            </Typography>
            <MovieCarousel items={renderedUpcomingMovies} />
          </Box>
        </>
      )}
    </Container>
  );
};

export default MainPage;

//a2a22daee252e1aec8ba88ec02d36996cfff960e
