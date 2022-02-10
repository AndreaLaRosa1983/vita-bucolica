import React, { useEffect, useState } from "react";
import  { Grid, Button } from "semantic-ui-react";
import Posts from "../Posts/Posts";
import FormArticle from "../FormArticle/FormArticle";
import { getPosts, getPostsByTag, getPostsBySearch } from "../../actions/posts";
import { getLastPostsNotifications } from "../../actions/notifications";
import { useDispatch, useSelector } from "react-redux";
import Article from "../Article/Article"
import TagSearch from "../TagSearch/TagSearch"

const Home = ({openArticle, setOpenArticle, openArticleId, setOpenArticleId, user}) => {
  const [currentId, setCurrentId] = useState(null);
  const [tagSearch, setTagSearch] = useState(null);
  const [stringSearch, setStringSearch] = useState(null);
  const [more, setMore] = useState(1)
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts);
  useEffect(() => {
    if(tagSearch){
      setMore(1)
      dispatch(getPostsByTag(tagSearch));
    } else if (stringSearch){
      setMore(1)
      dispatch(getPostsBySearch(stringSearch));
    } else {
      dispatch(getLastPostsNotifications());
      dispatch(getPosts(more));}
  }, [tagSearch,currentId, dispatch, stringSearch, more]);
  return (
    
    <div>
      {console.log({numberOfPages : numberOfPages})}
    <div className="section">{!openArticle &&<TagSearch setStringSearch={setStringSearch} stringSearch = {stringSearch} setTagSearch={setTagSearch}  tagSearch={tagSearch} ></TagSearch>}
      {openArticle ? ( <Grid stackable className="main-grid" ><Grid.Row><Grid.Column columns={16}><Article openArticle={openArticle} currentId={currentId} setCurrentId={setCurrentId}  setOpenArticle={setOpenArticle} openArticleId={openArticleId} setOpenArticleId={setOpenArticleId}/></Grid.Column></Grid.Row></Grid>)
      :( <Grid stackable className="main-grid">
        <Grid.Row   columns={2}>
            <Grid.Column width={10}>
                <Posts setCurrentId={setCurrentId} currentId={currentId} setOpenArticle={setOpenArticle} setOpenArticleId={setOpenArticleId}/>  
                {!tagSearch && !stringSearch && user && <div className="button-post-group"><Button disabled={more === 1 ? true : false} icon="arrow left" onClick={()=> setMore(more-1)}/><span> Pagina {more}/{numberOfPages} </span><Button disabled={more === numberOfPages ? true : false}icon="arrow right" onClick={()=> setMore(more+1)}/></div>}
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
