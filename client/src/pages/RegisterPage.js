import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Avatar,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLogedIn, registerUser } from "../redux/features/auth/authSlice";

import defaultImage from "../default.png";
import backgroundImage from "../images.jpg";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [imgUrl, setImgUrl] = useState(defaultImage);

  //Form Control
  const [isUserEmpty, setIsUserEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] = useState(false);
  const [isPasswordNotMatch, setIsPasswordNotMatch] = useState(false);
  const [errors, setErrors] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(isLogedIn);
  const { status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (image) {
      setImgUrl(URL.createObjectURL(image));
    }
  }, [image]);

  //Form Control
  const usernameBlurHandler = () => {
    if (username) {
      setIsUserEmpty(false);
    } else {
      setIsUserEmpty(true);
    }
  };
  const confirmPasswordBlurHandler = () => {
    if (confirmPassword) {
      setIsConfirmPasswordEmpty(false);
    } else {
      setIsConfirmPasswordEmpty(true);
    }
    if (password !== confirmPassword) {
      setIsPasswordNotMatch(true);
    } else {
      setIsPasswordNotMatch(false);
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
    if (
      !password ||
      !username ||
      !confirmPassword ||
      password !== confirmPassword
    ) {
      setErrors(true);
    } else {
      setErrors(false);
    }
  }, [password, username, confirmPassword]);

  //Submit
  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", username);
    data.append("password", password);
    data.append("image", image);
    dispatch(registerUser(data));
    console.log("triggered");
  };

  const initialRender = useRef(true);
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
    if (initialRender.current) {
      initialRender.current = false;
    }
  }, [isAuth, status]);

  return (
    <Grid container spacing={0} sx={{ heigth: "100vh" }}>
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
          <form style={{ width: "50%" }} onSubmit={submitHandler}>
            <Grid
              container
              spacing={1}
              direction="column"
              justifyContent="center"
              alignItems="center"
              alignContent="center"
              wrap="wrap"
            >
              <Typography variant="h3" color="initial" textAlign={"center"}>
                Register
              </Typography>
              <Avatar
                src={imgUrl}
                alt="avatar"
                sx={{
                  width: "200px",
                  height: "200px",
                  margin: "20px 0",
                }}
              ></Avatar>
              <Button variant="contained" component="label">
                Change image
                <input
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/*"
                  multiple
                  type="file"
                />
              </Button>
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
                margin="dense"
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
                margin="dense"
                helperText={`${
                  isPasswordEmpty ? "Password can not be empty" : ""
                }`}
              />
              <TextField
                fullWidth
                type="password"
                error={isConfirmPasswordEmpty || isPasswordNotMatch}
                value={confirmPassword}
                onBlur={confirmPasswordBlurHandler}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setIsConfirmPasswordEmpty(false);
                }}
                size="normal"
                label="Confirm password"
                margin="dense"
                helperText={`${
                  isConfirmPasswordEmpty ? "Password can not be empty!" : ""
                }${isPasswordNotMatch ? "\n Passwords must be same!" : ""}`}
              />
              <Button
                fullWidth
                disabled={errors}
                variant="contained"
                color="primary"
                type="submit"
              >
                Register
              </Button>
              <Link
                to="/login"
                style={{
                  marginTop: "20px",
                  textAlign: "center",
                  textDecoration: "none",
                  color: "#1565c0",
                }}
              >
                <p>Already registered? Log In</p>
              </Link>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
