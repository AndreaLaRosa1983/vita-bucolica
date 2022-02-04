import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Icon,
  Image,
  Button,
  Container
} from "semantic-ui-react"
import moment from "moment";
import 'moment/locale/it';
import { likePost } from "../../actions/posts";


const Article = ({setOpenArticle, openArticleId}) => { 
  moment.locale('it');
  const post = useSelector((state) =>
  openArticleId? state.posts.find((p) => p._id === openArticleId) : null
);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?._id)
      ) ? (
        <>
          <Icon name='thumbs up' /> 
          &nbsp;
          {post.likes.length > 2
            ? `Tu e ${post.likes.length - 1} altri`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <Icon name='thumbs up outline' /> 
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <Icon name='thumbs up outline'/> 
        &nbsp;Like
      </>
    );
  };

  return (
    <>
    {post &&
  <Container>
      <h1 className="title-article">{post.title}</h1>
      <Container className="container-big-card">
      <Image className="image-article" src={post.selectedFile}/>
      <div>
        <div className="name-article">di {post.name}</div>
        <div className="date-article">
          {moment(post.createdAt).fromNow()}
        </div>
        <div className="tags-article">
          {post.tags.map((tag) => `#${tag} `)}
        </div>
      </div>
      
      {post.video &&<div className="video-article-container"><iframe
            className="video-article"
            title="video"
            id="video"
            src={post.video}
            frameBorder="0"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          /></div>}

      <div>
        <div
          className="message-article"
        > {post.message}
          
        </div>
      </div>
      <div className="button-group-article">
        <Button
          size="small"
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes />
        </Button>
        <Button
          size="small"
          onClick={()=>{setOpenArticle(false)}}
        >
          <Icon name="home"/>
          Torna nella home
        </Button>
      </div>
      </Container>
    </Container>}
    </>
  );
};

export default Article;