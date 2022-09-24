import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLogedIn, loginUser } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

import backgroundImage from "../images.jpg";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Form Control
  const [isUserEmpty, setIsUserEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [errors, setErrors] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(isLogedIn);

  //Form Control
  const usernameBlurHandler = () => {
    if (username) {
      setIsUserEmpty(false);
    } else {
      setIsUserEmpty(true);
    }
  };
  const passwordBlurHandler = () => {
    if (password) {
      setIsPasswordEmpty(false);
    } else {
      setIsPasswordEmpty(true);
    }
  };
  useEffect(() => {
    if (!password || !username) {
      setErrors(true);
    } else {
      setErrors(false);
    }
  }, [password, username]);

  //Submit
  const submitHandler = () => {
    dispatch(loginUser({ username, password }));
  };

  const initialRender = useRef(true);
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
    if (initialRender.current) {
      initialRender.current = false;
    }
  }, [isAuth]);

  return (
    <Grid container spacing={0}>
      <Grid
        item
        md={7}
        xs={5}
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          heigth: "92vh",
        }}
      ></Grid>
      <Grid item md={5} xs={7}>
        <Box
          className="box"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "92vh",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <form style={{ width: "50%" }} onSubmit={(e) => e.preventDefault()}>
            <Grid
              container
              spacing={1}
              direction="column"
              justifyContent="center"
              alignItems="center"
              alignContent="center"
              wrap="wrap"
            >
              <Typography variant="h3" textAlign={"center"}>
                Login
              </Typography>
              <TextField
                fullWidth
                error={isUserEmpty}
                value={username}
                onBlur={usernameBlurHandler}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setIsUserEmpty(false);
                }}
                size="normal"
                label="Name"
                margin="normal"
                helperText={`${isUserEmpty ? "Username can not be empty" : ""}`}
              />
              <TextField
                fullWidth
                type="password"
                value={password}
                error={isPasswordEmpty}
                onBlur={passwordBlurHandler}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsPasswordEmpty(false);
                }}
                size="normal"
                label="Password"
                margin="normal"
                helperText={`${
                  isPasswordEmpty ? "Password can not be empty" : ""
                }`}
              />
              <Button
                fullWidth
                disabled={errors}
                onClick={submitHandler}
                variant="contained"
                color="primary"
              >
                Login
              </Button>
              <Link
                to="/register"
                style={{
                  marginTop: "20px",
                  textAlign: "center",
                  textDecoration: "none",
                  color: "#1565c0",
                }}
              >
                <p>No account? Register</p>
              </Link>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
