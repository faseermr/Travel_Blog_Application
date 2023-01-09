import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
//import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import userService from "../service/userService";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  barButton: {
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const NavbarDrawer = () => {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [state, setState] = React.useState({
    top: false,
  });

  useEffect(() => {
    const user = userService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      // console.log(user.username);
    }
  }, []);

  const logOut = () => {
    userService.logout();
    setTimeout(() => {
      window.location.reload();
    }, 0);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {currentUser ? (
          <>
            <ListItem button component={Link} to="/add-blog" disablePadding>
              <ListItemText primary="Add Blog" />
            </ListItem>

            <ListItem button component={Link} to="/show-blog" disablePadding>
              <ListItemText primary="Show Blog" />
            </ListItem>
            <ListItem button component={Link} to="/my-blog" disablePadding>
              <ListItemText primary="My Blog" />
            </ListItem>
            <ListItem button component={Link} to="/chat" disablePadding>
              <ListItemText primary="Chat" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/signin"
              onClick={logOut}
              disablePadding
            >
              <ListItemText primary="Signout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={Link} to="/signin" disablePadding>
              <ListItemText primary="Signin" />
            </ListItem>
            <ListItem button component={Link} to="/signup" disablePadding>
              <ListItemText primary="Signup" />
            </ListItem>
          </>
        )}
      </List>
    </div>
  );

  return (
    <div>
      {["top"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            className={classes.barButton}
          >
            <MenuIcon style={{ color: "white" }} />
          </Button>

          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default NavbarDrawer;
