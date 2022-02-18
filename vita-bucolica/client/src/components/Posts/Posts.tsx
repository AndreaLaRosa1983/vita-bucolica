import React, {SetStateAction, Dispatch} from "react";
import { Loader, Card } from "semantic-ui-react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import { RootState } from "../../reducers/index"
const Posts = ( props:{
  setCurrentId:Dispatch<SetStateAction<string>>,
  currentId:string,
  openArticle:boolean,
  setOpenArticle:Dispatch<SetStateAction<boolean>>,
  setOpenArticleId:Dispatch<SetStateAction<string>>,
}) => {
  const { posts } = useSelector((state: RootState) => state.posts);

  return !posts.length ? (
    <Loader active size="big">
      Caricamento
    </Loader>
  ) : props.openArticle ? (
    <>{
      //@ts-ignore
      posts.find((x) => x._id === currentId)}</>
  ) : (
    <Card.Group centered>
      //@ts-ignore
      {
      //@ts-ignore
      posts.map((post) => (
        <Post
        //@ts-ignore
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
