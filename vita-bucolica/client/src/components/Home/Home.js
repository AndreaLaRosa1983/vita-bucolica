import React, { useEffect, useState } from "react";
import  { Grid } from "semantic-ui-react";
import Posts from "../Posts/Posts";
import FormArticle from "../FormArticle/FormArticle";
import { getPosts, getPostsByTag, getPostsBySearch } from "../../actions/posts";
import { useDispatch } from "react-redux";
import Article from "../Article/Article"
import TagSearch from "../TagSearch/TagSearch"
const Home = ({openArticle, setOpenArticle, socket}) => {
  const [currentId, setCurrentId] = useState(null);
  const [openArticleId, setOpenArticleId] = useState(null);
  const [tagSearch, setTagSearch] = useState(null);
  const [stringSearch, setStringSearch] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if(tagSearch){
      dispatch(getPostsByTag(tagSearch));
    } else if (stringSearch){
      dispatch(getPostsBySearch(stringSearch));
    } else {dispatch(getPosts());}
  }, [tagSearch,currentId, dispatch, stringSearch]);
  return (
    
    <div>
    <div className="section">{!openArticle &&<TagSearch setStringSearch={setStringSearch} stringSearch = {stringSearch} setTagSearch={setTagSearch}  tagSearch={tagSearch} ></TagSearch>}
      {openArticle ? ( <Grid stackable className="main-grid" ><Grid.Row><Grid.Column columns={16}><Article openArticle={openArticle} currentId={currentId} setCurrentId={setCurrentId}  setOpenArticle={setOpenArticle} openArticleId={openArticleId} setOpenArticleId={setOpenArticleId}/></Grid.Column></Grid.Row></Grid>)
      :( <Grid stackable className="main-grid">
        <Grid.Row   columns={2}>
            <Grid.Column width={10}>
                <Posts setCurrentId={setCurrentId} currentId={currentId} setOpenArticle={setOpenArticle} setOpenArticleId={setOpenArticleId}/>  
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
