import React, { useState, useEffect } from "react";
import {Form, Input, Button, TextArea}  from "semantic-ui-react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from "react-redux";
import {AGRIMACHINERY, GROWING, BREEDING, FARMLIFE } from "../../constants/tags";
const FormArticle = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    video: "",
    tags: [],
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const [errors, setError] = useState({
    title: false,
    message: false,
    video: false,
    tags: false,
    selectedFile: false,
  });
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const changeTags = (e,value) => {
    var newTags = postData.tags;
    if(e.target.checked){
      newTags.push(value);
      setPostData({ ...postData, tags: newTags });
    } else {
      newTags = newTags.filter( (e) => e !== value);
      setPostData({ ...postData, tags: newTags });
    }
  }

  const checkForm = () => {
    var values = postData;
    var checkedErrors = errors;
    var valid = true;
    if (values.title === "" ){
      valid = false;
      checkedErrors.title = true;
    } else {
      checkedErrors.title = false;
    }
    if (values.message === ""){
      valid = false;
      checkedErrors.message = true;
    } else {
      checkedErrors.message = false;
    }
    if (values.tags.length <= 0){
      valid = false;
      checkedErrors.tags = true;
    } else {
      checkedErrors.tags = false;
    }
    setError({...checkedErrors})
    return valid;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(checkForm()){
    if (currentId === null) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    }
    clear();
  }
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      video: "",
      tags: [],
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
        <div>
          Accedi per interagire con i post
        </div>
    );
  } 
  if (!user.result.isCreator) {
    return  null
  }
  return (
      <Form 
      className="form-article-container"
      >
        <div className="article-header">
          {currentId ? "Edita " : "Crea "}un post
        </div>
 
        <Form.Field  
          name="title"
          control={Input}
          placeholder="Titolo"
          value={postData.title}
          error={errors.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}>
        </Form.Field>
        <Form.TextArea  name="message"
          control={TextArea}
          placeholder="Articolo"
          error={errors.message}
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}>
        </Form.TextArea>
        <Form.Field  name="video"
          control={Input}
          placeholder="Link al Video"
          value={postData.video}
          onChange={(e) => setPostData({ ...postData, video: e.target.value })}>
        </Form.Field>
        <Form.Group grouped className="checkbox-group"> 
              <Form.Field error={errors.tags} control='input' type='checkbox' onChange={(e, ) => changeTags(e, FARMLIFE)} label={FARMLIFE} checked={postData.tags.includes(FARMLIFE)}/>
              <Form.Field error={errors.tags} control='input' type='checkbox' onChange={(e, ) => changeTags(e, GROWING)} label={GROWING} checked={postData.tags.includes(GROWING)} />
              <Form.Field error={errors.tags} control='input' type='checkbox' onChange={(e, ) => changeTags(e, BREEDING)} label={BREEDING}  checked={postData.tags.includes(BREEDING)} />
              <Form.Field error={errors.tags ? {content: 'Seleziona almeno uno dei tag', pointing: 'above'} : null} control='input' type='checkbox' onChange={(e, ) => changeTags(e, AGRIMACHINERY)} label={AGRIMACHINERY}  checked={postData.tags.includes(AGRIMACHINERY)} />
        </Form.Group>
        <Form.Field >
        
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          ><label className="ui button custom-file-uploader">Scegli immagine di copertina</label></FileBase>
        </Form.Field>
        <Form.Group >
        <Form.Field
          control={Button}
          type='submit'
          onClick={handleSubmit}
        >
          Pubblica
        </Form.Field>
        <Form.Field
        control={Button}
          onClick={clear}
        >
          Cancella
        </Form.Field>
        </Form.Group>
      </Form>
     
  );
};

export default FormArticle;
