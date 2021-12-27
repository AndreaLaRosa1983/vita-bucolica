import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";
const Posts = ({ setCurrentId, currentId, openArticle, setOpenArticle }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  return !posts.length ? (
    <CircularProgress />
  ) : (openArticle ? (<>
  {posts.find(x => x._id === currentId)}</>) : (<>
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}> <Post post={post} setCurrentId={setCurrentId} openArticle={openArticle} setOpenArticle={setOpenArticle}/>
        </Grid>
      ))}
    </Grid></>)
  );
};

export default Posts;
