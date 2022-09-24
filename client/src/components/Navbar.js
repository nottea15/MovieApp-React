import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import { useDispatch, useSelector } from "react-redux";
import { isLogedIn, logout } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import {
  Avatar,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import BookmarkBorder from "@mui/icons-material/BookmarkBorder";
import MainPage from "../pages/MainPage";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isAuth = useSelector(isLogedIn);

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    toast.warn("You are logged out");
    navigate("/");
  };

  const handleOpenUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexBox: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography
            variant="h6"
            href="/"
            component="a"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              // flexGrow: 1,
            }}
          >
            Moviefy
          </Typography>
          {!isAuth ? (
            <Button
              onClick={() => navigate("/login")}
              variant="outlined"
              color="inherit"
            >
              Login
            </Button>
          ) : (
            <>
              {user ? (
                <>
                  <Box
                    sx={{
                      // ml: "20%",
                      display: "flex",
                      justifyContent: "center",
                      flexGrow: "1",
                    }}
                  >
                    <Button
                      variant="text"
                      color="inherit"
                      onClick={() => navigate("/users")}
                    >
                      Users
                    </Button>
                  </Box>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar src={`http://localhost:3002/${user.imgUrl}`} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    id="userMenu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                  >
                    <MenuItem onClick={() => navigate("/favouriteMovie")}>
                      <ListItemIcon>
                        <BookmarkBorder fontSize="small" />
                      </ListItemIcon>
                      My favouriteMovies
                    </MenuItem>
                    <MenuItem onClick={logoutHandler}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                ""
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
