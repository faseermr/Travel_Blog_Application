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
import {
  getAllBlogs,
  deleteBlogById,
  get,
  getBlogByUsername,
} from "../redux/action/action";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
  },
  card: {},
  media: {
    // height: "50%",
    // width: "50%",
    // margin: "0 20%",
    // border: "1px solid black",
    //paddingTop: "56.25%", // 16:9
    height: 200,
    width: "100%",
  },
}));

const MyBlog = () => {
  const classes = useStyles();
  const [blogList, setBlogList] = useState([]);
  const result = useSelector((state) => state);
  const dispatch = useDispatch();

  const deleteBlog = (id) => {
    let option = window.confirm("Are you want to delete");
    if (option) {
      dispatch(deleteBlogById(id)).then((res) => {
        alert(res.data.message);
      });
    }
  };

  useEffect(() => {
    dispatch(getBlogByUsername(result.user.state.username));
  }, []);
  return (
    <React.Fragment>
      <Grid container className={classes.root} spacing={4}>
        {result.blog.state.map((blog, index) => (
          <Grid item key={index}>
            <Card variant="outlined" className={classes.card}>
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
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default MyBlog;
