import React from "react";
import  {Loader, Card, Dimmer } from "semantic-ui-react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
const Posts = ({ setCurrentId, currentId, openArticle, setOpenArticle }) => {
  const posts = useSelector((state) => state.posts);
  return !posts.length ? (

    <Loader active size='big'>Caricamento</Loader>
  ) : (openArticle ? (<>
  {console.log("post" + posts.length)}
  {posts.find(x => x._id === currentId)}</>) : (
    <Card.Group centered>
    {posts.map((post) => (
      <Post post={post} setCurrentId={setCurrentId} openArticle={openArticle} setOpenArticle={setOpenArticle}/>
      ))} </Card.Group>
)
  );
};

export default Posts;
