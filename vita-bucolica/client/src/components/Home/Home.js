import React, { useEffect, useState } from "react";
import  { Grid, Image } from "semantic-ui-react";
import Posts from "../Posts/Posts";
import FormArticle from "../FormArticle/FormArticle";
import { getPosts } from "../../actions/posts";
import { useDispatch } from "react-redux";
import Article from "../Article/Article"
const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [openArticle, setOpenArticle] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    
    <div>
    <div className="section">
      {openArticle ? ( <Grid stakable className="main-grid" ><Grid.Row><Grid.Column columns={16}><Article openArticle={openArticle} currentId={currentId} setCurrentId={setCurrentId}  setOpenArticle={setOpenArticle}/></Grid.Column></Grid.Row></Grid>)
      :( <Grid stackable className="main-grid">
        <Grid.Row   columns={2}>
            <Grid.Column width={10}>
                <Posts setCurrentId={setCurrentId} currentId={currentId} setOpenArticle={setOpenArticle}/>  
            </Grid.Column>  
            <Grid.Column className="home-form-article-column" width={6}>
                <FormArticle currentId={currentId} setCurrentId={setCurrentId} />
            </Grid.Column>
            </Grid.Row>
          </Grid>)}
    </div>
    </div>
    
  );
};

export default Home;
