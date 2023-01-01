import React from "react";
import { Route, Routes } from "react-router-dom";
import AddBlog from "./AddBlog";
import { Container, makeStyles } from "@material-ui/core";
import BlogList from "./BlogList";
import routes from "../routes";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

const Content = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <div className={classes.toolbar} />

      <Routes>
        {routes.map((route, index) => (
          <React.Fragment key={index}>
            <Route path={route.path} exact element={<route.element />} />
          </React.Fragment>
        ))}
      </Routes>
    </Container>
  );
};

export default Content;
