import "react-toastify/dist/ReactToastify.css";

import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/features/auth/authSlice";
import FavouriteMoviePage from "./pages/FavouriteMoviePage";
import { toast } from "react-toastify";
import UsersPage from "./pages/UsersPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MoviePage from "./pages/MoviePage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const { status } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (status && status.type === "success") {
      toast.success(status.content);
    }
    if (status && status.type === "warn") {
      toast.warn(status.content);
    }
    if (status && status.type === "error") {
      toast.error(status.content);
    }
  }, [status]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route
            path="/favouriteMovie"
            element={<FavouriteMoviePage />}
          ></Route>
          <Route path="/users" element={<UsersPage />}></Route>
          <Route path="/movie/:id" element={<MoviePage />}></Route>
        </Routes>
        <ToastContainer position="bottom-right" theme="colored" />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
