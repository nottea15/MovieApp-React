import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/features/auth/authSlice";
import { clearUsers, getAllUsers } from "../redux/features/users/usersSlice";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";

const UsersPage = () => {
  const { users } = useSelector((state) => state.users);
  const { isLoading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  // console.log(users);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllUsers());
    return () => {
      dispatch(clearUsers());
    };
  }, []);
  const renderedUsers = users?.map((user) => {
    return (
      <Grid key={user._id} item md={4} xs={6}>
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            borderRadius: "5%",
            boxShadow: "0 0 20px #aaa",
          }}
        >
          <CardMedia
            title="img"
            image={`http://localhost:3002/${user.imgUrl}`}
            sx={{
              padding: "10px",
              borderRadius: "5%",
            }}
            component="img"
            height="400"
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CardContent sx={{ width: "80%" }}>
              <Typography gutterBottom variant="h6" component="div" noWrap>
                {user.username}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Grid>
    );
  });
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mt: "20px", justifyContent: "center" }}>
      {renderedUsers}
    </Grid>
  );
};

export default UsersPage;
