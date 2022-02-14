import React, { useEffect, useState } from "react";
import  { Grid, Button, Icon } from "semantic-ui-react";
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
  const [page, setPage] = useState(0)
  const [more, setMore] = useState(1)
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts);
  useEffect(() => {
    if(tagSearch){
      if(stringSearch){
        setMore(1)
      }
      setPage(0)
      dispatch(getPostsByTag(tagSearch,more));
    } else if (stringSearch){
      if(tagSearch){
        setMore(1)
      }
      setPage(0)
      dispatch(getPostsBySearch(stringSearch,more));
    } else {
      setMore(1)
      dispatch(getLastPostsNotifications());
      dispatch(getPosts(page));}
  }, [tagSearch,currentId, dispatch, stringSearch, page, more]);
  return (
    
    <div>
    <div className="section">{!openArticle &&<TagSearch setStringSearch={setStringSearch} stringSearch = {stringSearch} setTagSearch={setTagSearch}  tagSearch={tagSearch} ></TagSearch>}
      {openArticle ? ( <Grid stackable className="main-grid" ><Grid.Row><Grid.Column columns={16}><Article openArticle={openArticle} currentId={currentId} setCurrentId={setCurrentId}  setOpenArticle={setOpenArticle} openArticleId={openArticleId} setOpenArticleId={setOpenArticleId}/></Grid.Column></Grid.Row></Grid>)
      :( <Grid stackable className="main-grid">
        <Grid.Row   columns={(( user && user.result.isCreator) || (!user)) ? 2 : 1}>
            <Grid.Column width={(( user && user.result.isCreator) || (!user)) ? 10 : 16}>
                <Posts setCurrentId={setCurrentId} currentId={currentId} setOpenArticle={setOpenArticle} setOpenArticleId={setOpenArticleId}/>  
                {!tagSearch && !stringSearch && user && <div className="button-post-group"><Button disabled={page === 0 ? true : false} icon="arrow left" onClick={()=> setPage(page-1)}/><span> Pagina {page+1}/{numberOfPages} </span><Button disabled={page+1 === numberOfPages ? true : false}icon="arrow right" onClick={()=> setPage(page+1)}/></div>}
                {tagSearch && !stringSearch && user &&  <div className="button-post-group"><Button onClick={()=> setMore(more+1)}><Icon name="arrow down" /><span> try get more from {tagSearch} </span></Button></div>}
                {!tagSearch && stringSearch && user &&  <div className="button-post-group"><Button onClick={()=> setMore(more+1)}><Icon name="arrow down" /><span> try get more from {stringSearch} </span></Button></div>}
            </Grid.Column>  
            {(( user && user.result.isCreator) || (!user)) &&  <Grid.Column className="home-form-article-column" width={6}>
                <FormArticle currentId={currentId} setCurrentId={setCurrentId} />
            </Grid.Column>}
            </Grid.Row>
          </Grid>)}
    </div>
    </div>
    
  );
};

export default Home;
