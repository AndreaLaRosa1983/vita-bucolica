import React from "react";
import {
  Card,
  Icon,
  Image,
  Button
} from "semantic-ui-react"
import moment from "moment";
import "moment/locale/it";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import genericForPost from "../../../images/genericForPost.png"
const Post = ({ post, setCurrentId, setOpenArticle, setOpenArticleId }) => {
  moment.locale('it');
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?._id)
      ) ? (
        <>
          <Icon name="thumbs up" /> 
          &nbsp;
          {post.likes.length > 2
            ? `Tu e ${post.likes.length - 1} altri`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <Icon name="thumbs up outline" /> 
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <Icon name="thumbs up outline"/> 
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className = "post-layout" >
    <Image className="image-card" src={post.selectedFile ? post.selectedFile : genericForPost } />
    <Card.Content className="post-title-container">
      <Card.Header
        className="post-header"
      ><div><span  className="post-title"  onClick={() => {  
        setOpenArticleId(post._id)
        setOpenArticle(true)}}>{post.title}</span>
            {user?.result?._id === post?.creator && (
            <span><Icon className="post-edit-icon" size="small" onClick={() => setCurrentId(post._id)} name="edit"/></span> 
      )}</div>
        <div className="under-title-group">
          <div className="post-tags">{post.tags.map((tag) => `#${tag} `)}</div>
</div>
      </Card.Header>
      <Card.Meta className="meta">
        {post.video && <Icon name="youtube" />}
      </Card.Meta> 
        <Card.Description className="post-description">
        <div className="post-name">{post.name}</div>
          <div className="post-date">{moment(post.createdAt).fromNow()}</div>
           {post.message ? post.message.replace(/(.{100})..+/, "$1…") : ""}
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <Button
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes />
        </Button>
        {user?.result?._id === post?.creator && (
            <Button
              size="small"
              onClick={() => {
                dispatch(deletePost(post._id));
              }}
            >
              <Icon name="trash alternate outline" /> 
              &nbsp;Cancella
            </Button>
          )}
      </Card.Content >
    </Card>
  );
};

export default Post;
