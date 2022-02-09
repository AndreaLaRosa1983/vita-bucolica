import React from "react";
import  {Loader, Card } from "semantic-ui-react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
const Posts = ({ setCurrentId, currentId, openArticle, setOpenArticle, setOpenArticleId }) => {
  const posts = useSelector((state) => state.posts);
  return !posts.length ? (

    <Loader active size="big">Caricamento</Loader>
  ) : (openArticle ? (<>
  {posts.find(x => x._id === currentId)}</>) : (
    <Card.Group centered>
    {posts.map((post) => (
      <Post post={post} key={post._id} setCurrentId={setCurrentId} openArticle={openArticle} setOpenArticle={setOpenArticle} setOpenArticleId={setOpenArticleId}/>
      ))} </Card.Group>
)
  );
};

export default Posts;
