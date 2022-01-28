import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import Form from "../Form/Form";
import { deletePost, likePost } from "../../actions/posts";


const Article = ({setCurrentId, currentId}) => { 
  const [modifyPost, setModifyPost] = useState(false);
  const post = useSelector((state) =>
  currentId ? state.posts.find((p) => p._id === currentId) : null
);
  const classes = useStyles();   
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}{" "}
          others` : `${post.likes.length} like$
          {post.likes.length > 1 ? "s" : ""}`
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <>{/* {modifyPost && <Form currentId={currentId} setCurrentId={setCurrentId} />} */}
  <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        title={post.title}
        image={post.selectedFile}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>

{/*       {user?.result?.googleId === post?.creator ||
        (user?.result?._id === post?.creator && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => {setModifyPost(!modifyPost)}}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        ))} */}

      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      
      {post.video && <iframe
      title="video"
            id="video"
            width="230"
            heigh="154"
            src={post.video}
            frameBorder="0"
            allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />}


      <Typography         
          variant="body2"
          color="primary"
          className={classes.title} onClick={() => {}}  >
        {post.title}
      </Typography>
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          gutterBottom
        > {post.message}
          
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes />
        </Button>
        {user?.result?.googleId === post?.creator ||
          (user?.result?._id === post?.creator && (
            <Button
              size="small"
              color="primary"
              onClick={() => {
                dispatch(deletePost(post._id));
              }}
            >
              <DeleteIcon fontSize="small" />
              &nbsp;Delete
            </Button>
          ))}
      </CardActions>
    </Card></>
  );
};

export default Article;