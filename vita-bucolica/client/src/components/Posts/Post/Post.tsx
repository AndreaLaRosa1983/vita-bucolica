import React, { Dispatch, SetStateAction } from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import moment from "moment";
import "moment/locale/it";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
/* eslint-disable spaced-comment */
import genericForPost from "../../../images/genericForPost.png";
import PostType from "../../../models/post";
import { getUserCookie } from "../../../actions/utils";
const Post = (props: {
  post: PostType;
  setCurrentId: Dispatch<SetStateAction<string | null | undefined>>;
  setOpenArticle: Dispatch<SetStateAction<boolean>>;
  setOpenArticleId: Dispatch<SetStateAction<string | null | undefined>>;
  openArticle: boolean;
}) => {
  moment.locale("it");
  const dispatch = useDispatch();
  const user = getUserCookie();
  const Likes = () => {
    if (props.post.likes.length > 0) {
      return props.post.likes.find((like) => like === user?.result?._id) ? (
        <>
          <Icon name="thumbs up" />
          &nbsp;
          {props.post.likes.length > 2
            ? `Tu e ${props.post.likes.length - 1} altri`
            : `${props.post.likes.length} like${
                props.post.likes.length > 1 ? "s" : ""
              }`}
        </>
      ) : (
        <>
          <Icon name="thumbs up outline" />
          &nbsp;{props.post.likes.length}{" "}
          {props.post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <Icon name="thumbs up outline" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className="post-layout">
      <Image
        className="image-card"
        src={props.post.selectedFile ? props.post.selectedFile : genericForPost}
      />
      <Card.Content className="post-title-container">
        <Card.Header className="post-header">
          <div>
            <span
              className="post-title"
              onClick={() => {
                props.setOpenArticleId(props.post._id);
                props.setOpenArticle(true);
              }}
            >
              {props.post.title}
            </span>

            {user?.result._id === props.post?.creator && (
              <span>
                <Icon
                  className="post-edit-icon"
                  size="small"
                  onClick={() => props.setCurrentId(props.post._id)}
                  name="edit"
                />
              </span>
            )}
          </div>
          <div className="under-title-group">
            <div className="post-tags">
              {props.post.tags.map((tag: string) => `#${tag} `)}
            </div>
          </div>
        </Card.Header>
        <Card.Meta className="meta">
          {props.post.video && <Icon name="youtube" />}
        </Card.Meta>
        <Card.Description className="post-description">
          <div className="post-name">{props.post.name}</div>
          <div className="post-date">
            {moment(props.post.createdAt).fromNow()}
          </div>
          {props.post.message
            ? props.post.message.replace(/(.{100})..+/, "$1…")
            : ""}
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <Button
          size="small"
          disabled={!user?.result}
          onClick={() => dispatch(likePost(props.post._id))}
        >
          <Likes />
        </Button>

        {user?.result?._id === props.post?.creator && (
          <Button
            size="small"
            onClick={() => {
              dispatch(deletePost(props.post._id));
            }}
          >
            <Icon name="trash alternate outline" />
            &nbsp;Cancella
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

export default Post;
