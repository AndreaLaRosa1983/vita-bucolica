import React, { useState, useEffect, Dispatch, SetStateAction  } from "react";
import { Form, Input, Button, TextArea } from "semantic-ui-react";
//@ts-ignore
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from "react-redux";
import {
  AGRIMACHINERY,
  GROWING,
  BREEDING,
  FARMLIFE,
} from "../../constants/tags";
import { RootState } from "../../reducers/index"

const FormArticle = ( props:{ currentId: string|null|undefined, setCurrentId: Dispatch<SetStateAction<string|null|undefined>> }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    video: "",
    tags: [""],
    selectedFile: "",
  });
  const post = useSelector((state:RootState) =>
  //@ts-ignore
    props.currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const [errors, setError] = useState({
    title: false,
    message: false,
    video: false,
    tags: false,
    selectedFile: false,
  });
  const dispatch = useDispatch();
  //@ts-ignore
  const user = localStorage.getItem("profile") ? JSON.parse(localStorage.getItem("profile")) : {} ;
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);
//@ts-ignore
  const changeTags = (e, value:string) => {
    var newTags = postData.tags;
    if (e.target.checked) {
      newTags.push(value);
      setPostData({ ...postData, tags: newTags });
    } else {
      newTags = newTags.filter((e) => e !== value);
      setPostData({ ...postData, tags: newTags });
    }
  };

  const checkForm = () => {
    var values = postData;
    var checkedErrors = errors;
    var valid = true;
    if (values.title === "") {
      valid = false;
      checkedErrors.title = true;
    } else {
      checkedErrors.title = false;
    }
    if (values.message === "") {
      valid = false;
      checkedErrors.message = true;
    } else {
      checkedErrors.message = false;
    }
    if (values.tags.length <= 0) {
      valid = false;
      checkedErrors.tags = true;
    } else {
      checkedErrors.tags = false;
    }
    setError({ ...checkedErrors });
    return valid;
  };
  const handleSubmit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    if (checkForm()) {
    if (props.currentId === undefined || props.currentId === null || props.currentId === "") {
        dispatch(createPost({ ...postData, name: user?.result?.name }));
      } else {
        dispatch(
          //@ts-ignore
          updatePost(props!.currentId, { ...postData, name: user?.result?.name })
        );
      }
      clear();
    }
  };
  const clear = () => {
    props.setCurrentId("");
    setPostData({
      title: "",
      message: "",
      video: "",
      tags: [],
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return <div>Accedi per interagire con i post</div>;
  }
  if (!user.result.isCreator) {
    return null;
  }
  return (
    <Form className="form-article-container">
      <div className="article-header">
        {props.currentId ? "Edita " : "Crea "}un post
      </div>

      <Form.Field
        name="title"
        control={Input}
        placeholder="Titolo"
        value={postData.title}
        error={errors.title}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPostData({ ...postData, title: e.target.value })}
      ></Form.Field>
      <Form.TextArea
        name="message"
        control={TextArea}
        placeholder="Articolo"
        error={errors.message}
        value={postData.message}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPostData({ ...postData, message: e.target.value })}
      ></Form.TextArea>
      <Form.Field
        name="video"
        control={Input}
        placeholder="Link al Video"
        value={postData.video}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPostData({ ...postData, video: e.target.value })}
      ></Form.Field>
      <Form.Group grouped className="checkbox-group">
        <Form.Field
          error={errors.tags}
          control="input"
          type="checkbox"
          onChange={(e: React.FormEvent<HTMLInputElement>) => changeTags(e, FARMLIFE)}
          label={FARMLIFE}
          checked={postData.tags.includes(FARMLIFE)}
        />
        <Form.Field
          error={errors.tags}
          control="input"
          type="checkbox"
          onChange={(e: React.FormEvent<HTMLInputElement>) => changeTags(e, GROWING)}
          label={GROWING}
          checked={postData.tags.includes(GROWING)}
        />
        <Form.Field
          error={errors.tags}
          control="input"
          type="checkbox"
          onChange={(e: React.FormEvent<HTMLInputElement>) => changeTags(e, BREEDING)}
          label={BREEDING}
          checked={postData.tags.includes(BREEDING)}
        />
        <Form.Field
          error={
            errors.tags
              ? { content: "Seleziona almeno uno dei tag", pointing: "above" }
              : null
          }
          control="input"
          type="checkbox"
          onChange={(e: React.FormEvent<HTMLInputElement>) => changeTags(e, AGRIMACHINERY)}
          label={AGRIMACHINERY}
          checked={postData.tags.includes(AGRIMACHINERY)}
        />
      </Form.Group>
      <Form.Field>
        <FileBase
          type="file"
          multiple={false}
          //@ts-ignore
          onDone={({ base64 }) =>
            setPostData({ ...postData, selectedFile: base64 })
          }
        >
          <label className="ui button custom-file-uploader">
            Scegli immagine di copertina
          </label>
        </FileBase>
      </Form.Field>
      <Form.Group>
        <Form.Field control={Button} type="submit" onClick={handleSubmit}>
          Pubblica
        </Form.Field>
        <Form.Field control={Button} onClick={clear}>
          Cancella
        </Form.Field>
      </Form.Group>
    </Form>
  );
};

export default FormArticle;
