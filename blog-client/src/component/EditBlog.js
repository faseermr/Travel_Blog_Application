import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  InputLabel,
  Input,
  Grid,
  Button,
  makeStyles,
  Card,
  CardContent,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { getBlogById, updateBlogById } from "../redux/action/action";
import blogService from "../service/blogService";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const EditBlog = () => {
  const classes = useStyles();
  const result = useSelector((state) => state.blog.state);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogForm, setBlogForm] = useState({
    id: "",
    title: "",
    description: "",
  });

  const getBlogById = async (id) => {
    const res = await blogService.getBlogById(id);
    // console.log(res.data.title);
    setBlogForm({
      id: res.data.id,
      title: res.data.title,
      description: res.data.description,
    });
  };

  const updateBlog = (e) => {
    e.preventDefault();
    dispatch(
      updateBlogById(blogForm.id, {
        title: blogForm.title,
        description: blogForm.description,
      })
    ).then((res) => {
      alert(res.data.message);
      navigate(`/my-blog`);
    });
  };

  useEffect(() => {
    getBlogById(id);
  }, [id]);

  return (
    <Card variant="outlined">
      <form onSubmit={updateBlog}>
        <CardContent>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <InputLabel>Title : </InputLabel>
              <Input
                fullWidth
                name="title"
                value={blogForm.title}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, title: e.target.value })
                }
              />
            </Grid>

            <Grid item>
              <InputLabel>Description : </InputLabel>
              <Input
                fullWidth
                name="description"
                value={blogForm.description}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, description: e.target.value })
                }
              />
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Submit
            </Button>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
};

export default EditBlog;
