import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { TextField, Button, Typography, Paper, Checkbox, FormGroup, FormControlLabel, Grid } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from "react-redux";
import {AGRIMACHINERY, GROWING, BREEDING, FARMLIFE } from "../../constants/tagsTypes";
const Form = ({ currentId, setCurrentId }) => {
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
  const classes = useStyles();
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
      console.log(postData);
    } else {
      newTags = newTags.filter( (e) => e !== value);
      setPostData({ ...postData, tags: newTags });
      console.log(postData);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === null) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please sign in to interact with posts
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Edita " : "Crea "}un post
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Titolo"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Messaggio"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
          <TextField
          name="video"
          variant="outlined"
          label="Video Link"
          fullWidth
          value={postData.video}
          onChange={(e) =>
            setPostData({ ...postData, video: e.target.value })
          }
        />
        <FormGroup> <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
    <Grid container xs="12" spacing="1">
      <Grid item xs={12} sm={6}>            
      <FormControlLabel control={<Checkbox className={classes.checkbox} checked={postData.tags.includes(FARMLIFE)} />} label={<div className={classes.label} >{FARMLIFE}</div>} 
                      onChange={(e, ) =>
                        changeTags(e, FARMLIFE)
                      }/>
      </Grid>
      <Grid item xs={12} sm={6}>
            <FormControlLabel control={<Checkbox className={classes.checkbox} checked={postData.tags.includes(GROWING)}  />} label={<div className={classes.label} >{GROWING}</div>}  onChange={(e, ) =>
                        changeTags(e, GROWING)
                      }/></Grid>
      <Grid item xs={12} sm={6}>
            <FormControlLabel  control={<Checkbox className={classes.checkbox}checked={postData.tags.includes(BREEDING)}  />} label={<div className={classes.label} >{BREEDING}</div>}  onChange={(e, ) =>
                        changeTags(e, BREEDING)
                      }/></Grid>
      <Grid item xs={12} sm={6}> 
            <FormControlLabel  control={<Checkbox  className={classes.checkbox} checked={postData.tags.includes(AGRIMACHINERY)}  />} label={<div className={classes.label} >{AGRIMACHINERY}</div>}  onChange={(e, ) =>
                        changeTags(e, AGRIMACHINERY)
                      }/></Grid>
      </Grid></Grid>


        </FormGroup>

        <div className={classes.fleInput}>
          Immagine di copertina
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Pubblica
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Cancella
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
