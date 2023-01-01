import React, { useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  TextField,
  Typography,
  makeStyles,
  Card,
  CardContent,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LockOutlined } from "@material-ui/icons";
import { signupUser } from "../redux/action/action";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  avatar: {
    backgroundColor: "blue",
  },
}));

const Signup = () => {
  const classes = useStyles();
  const result = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "", email: "" });

  const createUser = (e) => {
    e.preventDefault();
    dispatch(signupUser(user))
      .then((res) => {
        navigate(`/signin`);
        window.location.reload();
      })
      .catch((err) => {
        alert(err.response.data.message);
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
            Sign up
          </Typography>
        </Grid>

        <form onSubmit={createUser}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <TextField
                label="Username"
                fullWidth
                name="username"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Email"
                fullWidth
                name="email"
                type="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Password"
                fullWidth
                name="password"
                type="password"
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

export default Signup;
