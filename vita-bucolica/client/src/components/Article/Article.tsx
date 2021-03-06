import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Icon, Image, Button, Container } from "semantic-ui-react";
import moment from "moment";
import "moment/locale/it";
import { likePost } from "../../actions/posts";
import { RootState } from "../../reducers/index";
import { getUserCookie } from "../../actions/utils";

const Article = (props: {
  openArticle: boolean;
  setOpenArticle: Dispatch<SetStateAction<boolean>>;
  openArticleId: string | null | undefined;
}) => {
  moment.locale("it");

  const selectorData = useSelector((state: RootState) => state.posts.openPost);
  const [post, setPost] = useState(selectorData);
  const user = getUserCookie();
  const dispatch = useDispatch();
  useEffect(() => {
    setPost(selectorData);
  }, [selectorData, post]);

  function likePostArticle(id: string) {
    dispatch(likePost(id));
    if (!post.likes.includes(user?.result?._id)) {
      setPost({ ...post, likes: post.likes.push(user?.result?._id) });
      console.log("in likepost");
    } else {
      const index = post.likes.indexOf(user?.result?._id);
      post.likes.splice(index, 1);       
      setPost({ ...post });
      }
  }

  function validateVimeoURL(url: string) {
    // eslint-disable-next-line
    return /^(http\:\/\/|https\:\/\/)?(www\.)?(vimeo\.com\/)([0-9]+)$/.test(
      url
    );
  }
  function validateYouTubeURL(url: string) {
    // eslint-disable-next-line
    return /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/.test(
      url
    );
  }

  function validateVideoUrl(url: string) {
    return validateVimeoURL(url) || validateYouTubeURL(url);
  }

  const Likes = () => {
    if (post) {
      if (post.likes.length > 0) {
        return post.likes.find((like: string) => like === user?.result?._id) ? (
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
            &nbsp;{post.likes.length}{" "}
            {post.likes.length === 1 ? "Like" : "Likes"}
          </>
        );
      }
      return (
        <>
          <Icon name="thumbs up outline" />
          &nbsp;Like
        </>
      );
    }
    return <></>;
  };

  return (
    <>
      {post && (
        <Container>
          <h1 className="title-article">{post.title}</h1>
          <Container className="container-big-card">
            {post.selectedFile && <Image className="image-article" src={post.selectedFile} alt={post.title}/>}
            <div>
              <div className="name-article">
                di {post.firstName} {post.lastName}
              </div>
              <div className="date-article">
                {moment(post.createdAt).fromNow()}
              </div>
              <div className="tags-article">
                {post.tags.map((tag: string) => `#${tag} `)}
              </div>
            </div>

            {post.video && validateVideoUrl(post.video) && (
              <div className="video-article-container">
                <iframe
                  className="video-article"
                  title={post.title}
                  id="video"
                  src={post.video}
                  frameBorder="0"
                  allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            <div>
              <div className="message-article"> {post.message}</div>
            </div>
            <div className="button-group-article">
              <Button
                size="small"
                disabled={!user?.result}
                onClick={() => likePostArticle(post._id)}
              >
                <Likes />
              </Button>
              <Button
                size="small"
                onClick={() => {
                  props.setOpenArticle(false);
                }}
              >
                <Icon name="home" />
                Torna nella home
              </Button>
            </div>
          </Container>
        </Container>
      )}
    </>
  );
};

export default Article;
