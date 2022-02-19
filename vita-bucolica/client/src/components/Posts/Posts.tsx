import React, {SetStateAction, Dispatch} from "react";
import { Loader, Card } from "semantic-ui-react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import { RootState } from "../../reducers/index"
import PostType from "../../models/post";
const Posts = ( props:{
  setCurrentId:Dispatch<SetStateAction<string|null|undefined>>,
  currentId:string|null|undefined,
  openArticle:boolean,
  setOpenArticle:Dispatch<SetStateAction<boolean>>,
  setOpenArticleId:Dispatch<SetStateAction<string|null|undefined>>,
}) => {
  const { posts } = useSelector((state: RootState) => state.posts);

  return !posts.length ? (
    <Loader active size="big">
      Caricamento
    </Loader>
  ) : props.openArticle ? (
    <>{
      posts.find((x:PostType) => x._id === props.currentId)}</>
  ) : (
    <Card.Group centered>
      {
      //@ts-ignore
      posts.map((post) => (
        <Post
          post={post}
          key={post._id}
          setCurrentId={props.setCurrentId}
          openArticle={props.openArticle}
          setOpenArticle={props.setOpenArticle}
          setOpenArticleId={props.setOpenArticleId}
        />
      ))}{" "}
    </Card.Group>
  );
};

export default Posts;
