import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Grid,
  Stack,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import userService from "../service/userService";
import NavbarDrawer from "./NavbarDrawer";

const useStyles = makeStyles((theme) => ({
  lists: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = userService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      //   console.log(user.username);
    }
  }, []);

  const logOut = () => {
    userService.logout();
    setTimeout(() => {
      window.location.reload();
    }, 0);
  };
  return (
    <AppBar>
      <Toolbar>
        <Grid container justifyContent="space-between">
          <Grid item>
            <NavbarDrawer />
            <IconButton color="inherit" className={classes.lists}>
              <Typography variant="h6" noWrap>
                Travel Blog App
              </Typography>
            </IconButton>
          </Grid>

          <Grid item className={classes.lists}>
            {currentUser ? (
              <>
                <IconButton color="inherit" component={Link} to="/add-blog">
                  <Typography> Add Blog</Typography>
                </IconButton>
                <IconButton color="inherit" component={Link} to="/show-blog">
                  <Typography> Show Blog</Typography>
                </IconButton>
                <IconButton color="inherit" component={Link} to="/my-blog">
                  <Typography> My Blog</Typography>
                </IconButton>
                <IconButton color="inherit" component={Link} to="/chat">
                  <Typography> Chat</Typography>
                </IconButton>
              </>
            ) : null}
          </Grid>
          <Grid item className={classes.lists}>
            {currentUser ? (
              <>
                <IconButton color="inherit">
                  <AccountCircleIcon />
                  <Typography>{currentUser.username}</Typography>
                </IconButton>
                <IconButton
                  color="inherit"
                  component={Link}
                  to="/signin"
                  onClick={logOut}
                >
                  <Typography> Sign out</Typography>
                </IconButton>
              </>
            ) : (
              <>
                <IconButton color="inherit" component={Link} to="/signup">
                  <Typography> Signup</Typography>
                </IconButton>
                <IconButton color="inherit" component={Link} to="/signin">
                  <Typography> Signin</Typography>
                </IconButton>
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
