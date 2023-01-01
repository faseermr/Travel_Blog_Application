import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  InputLabel,
  Input,
  Grid,
  Button,
  makeStyles,
  Card,
  CardContent,
} from "@material-ui/core";
import { addBlogToDB } from "../redux/action/action";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const AddBlog = () => {
  const classes = useStyles();
  const result = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [blogForm, setBlogForm] = useState({
  //   title: "",
  //   image: "",
  //   //  imageName: "",
  //   description: "",
  // });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");

  const PostBlog = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("author", result.user.state.username);
    //console.log(formData, title, description, image);
    dispatch(addBlogToDB(result.user.state.id, formData))
      .then((res) => {
        //console.log(res);
        alert(res.data.message);
        navigate(`/my-blog`);
      })
      .catch((errors) => console.log(errors));
  };

  const saveFile = (e) => {
    setImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
  };

  useEffect(() => {
    //  console.log(result.user.state.id);
  }, []);

  return (
    <Card variant="outlined">
      <form onSubmit={PostBlog}>
        <CardContent>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <InputLabel>Title : </InputLabel>

              <Input
                fullWidth
                name="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item>
              <InputLabel>Image : </InputLabel>

              <Input fullWidth name="image" type="file" onChange={saveFile} />
            </Grid>
            <Grid item>
              <InputLabel>Description : </InputLabel>

              <Input
                fullWidth
                name="description"
                onChange={(e) => setDescription(e.target.value)}
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
        </CardContent>
      </form>
    </Card>
  );
};

export default AddBlog;
