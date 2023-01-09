import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  makeStyles,
  Typography,
  Divider,
  Button,
  CardActions,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { getAllBlogs, deleteBlogById } from "../redux/action/action";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
  },
  media: {
    height: 200,
    width: "100%",
    //paddingTop: "56.25%", // 16:9
  },
}));

const BlogList = () => {
  const classes = useStyles();
  const [blogList, setBlogList] = useState([]);
  const result = useSelector((state) => state);
  const dispatch = useDispatch();

  const deleteBlog = (id) => {
    let option = window.confirm("are you want to delete");
    if (option) {
      dispatch(deleteBlogById(id)).then((res) => {
        alert(res.data.message);
      });
    }
  };

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);
  return (
    <React.Fragment>
      <Grid container className={classes.root} spacing={4}>
        {result.blog.state.map((blog, index) => (
          <Grid item key={index}>
            <Card variant="outlined">
              <CardHeader title={blog.title}></CardHeader>
              <Divider />
              <CardContent>
                <img className={classes.media} src={blog.filePath} />

                <Typography paragraph>{blog.description}</Typography>
              </CardContent>
              <Divider />
              <CardActions>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography>{blog.author.username}</Typography>
                  </Grid>
                  {result.user.state.username == blog.author.username ? (
                    <Grid item>
                      <Button
                        style={{ backgroundColor: "green", color: "white" }}
                        component={Link}
                        to={`/edit-blog/${blog.id}`}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        style={{ backgroundColor: "red", color: "white" }}
                        onClick={() => deleteBlog(blog.id)}
                      >
                        <DeleteForeverIcon />
                      </Button>
                    </Grid>
                  ) : null}
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default BlogList;

{
  /* <Grid container className={classes.root}>
      {blogList.map((blog, index) => (
        <Grid item key={index}>
          <Card variant="outlined">
            <CardHeader title={blog.title}></CardHeader>
            <CardContent>
              <CardMedia className={classes.media} image={blog.image} />
               <img src={blog.image} /> 
              <Typography paragraph>{blog.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid> */
}

// toolbar: theme.mixins.toolbar,
//   root: {
//     flexDirection: "column",
//   },
//      drawerPaper: {
//        width: drawerWidth,
//      },
//   media: {
//     height: "50%",
//     width: "100%",
//     margin: "auto",
//     paddingTop: "56.25%", // 16:9
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },

{
  /* <Grid item>
          <Card variant="outlined">
            <CardHeader title="Box"></CardHeader>
            <CardContent>
              Fluid grids use columns that scale and resize content. A fluid
              grid layout can use breakpoints to determine if the layout needs
              to change dramatically.
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card variant="outlined">
            <CardHeader title="Box"></CardHeader>
            <CardContent>
              Fluid grids use columns that scale and resize content. A fluid
              grids layout can use breakpoints to determine if the layout needs
              to change dramatically.
            </CardContent>
          </Card>
        </Grid> */
}
