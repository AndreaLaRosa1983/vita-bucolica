import React, { useEffect, useState } from "react";
import { Grow, Grid } from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { getPosts } from "../../actions/posts";
import { useDispatch } from "react-redux";
import Article from "../Article/Article"
const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [openArticle, setOpenArticle] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <Grow in>
      <Grid
        container
        justifyContent="space-between"
        alignItems="stretch"
        spacing={3}
      > 
      {openArticle ? (<Grid item xs={12} sm={12}><Article openArticle={openArticle} currentId={currentId} setCurrentId={setCurrentId}  setOpenArticle={setOpenArticle}/></Grid>):(<>
        <Grid item xs={12} sm={7}>
          <Posts setCurrentId={setCurrentId} currentId={currentId} setOpenArticle={setOpenArticle}/>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </Grid></>)}
      </Grid>
    </Grow>
  );
};

export default Home;
