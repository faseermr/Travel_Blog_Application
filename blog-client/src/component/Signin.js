import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  makeStyles,
  Card,
  CardContent,
  InputLabel,
  Input,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import userService from "../service/userService";
import { signinUser } from "../redux/action/action";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  avatar: {
    backgroundColor: "blue",
  },
}));

const Signin = () => {
  const classes = useStyles();
  const result = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });

  const loginUser = (e) => {
    e.preventDefault();
    dispatch(signinUser(user))
      .then((res) => {
        // console.log(res);
        navigate(`/show-blog`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid
          container
          //justifyContent="center"
          direction="column"
          alignItems="center"
        >
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Grid>

        <form onSubmit={loginUser}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <TextField
                label="Username"
                fullWidth
                name="username"
                required
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </Grid>

            <Grid item>
              <TextField
                label="Password"
                fullWidth
                name="password"
                type="password"
                required
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              //onClick={PostBlog}
            >
              Submit
            </Button>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default Signin;
