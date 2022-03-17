import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Grid, Button, Icon } from "semantic-ui-react";
import Posts from "../Posts/Posts";
import FormArticle from "../FormArticle/FormArticle";
import { getPosts, getPostsByTag, getPostsBySearch } from "../../actions/posts";
import { getLastPostsNotifications } from "../../actions/notifications";
import { useDispatch, useSelector } from "react-redux";
import Article from "../Article/Article";
import TagSearch from "../TagSearch/TagSearch";
import { RootState } from "../../reducers/index";
import cookie from "../../models/cookie";
const Home = ( props:{  openArticle:boolean,
  setOpenArticle:Dispatch<SetStateAction<boolean>>,
  openArticleId:string|null|undefined,
  setOpenArticleId:Dispatch<SetStateAction<string|null|undefined>>,
  user:cookie | undefined}
) => {
  const [currentId, setCurrentId] = useState<string|null|undefined>();
  const [tagSearch, setTagSearch] = useState("");
  const [stringSearch, setStringSearch] = useState("");
  const [page, setPage] = useState(0);
  const [more, setMore] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1)
  const [numberOfPostsByTag, setnumberOfPostsByTag] = useState(0)
  const [numberOfPostsSeenByTag, setnumberOfPostsSeenByTag] = useState(0)
  const [numberOfPostsBySearch, setnumberOfPostsBySearch] = useState(0)
  const [numberOfPostsSeenBySearch, setnumberOfPostsSeenBySearch] = useState(0)
  const [prevTag, setPrevTag] = useState("");
  const [prevString, setPrevString] = useState("");
  const dispatch = useDispatch();

  const numberOfPagesRoot = useSelector((state:RootState) => state.posts.numberOfPages);
  const numberOfPostsByTagRoot = useSelector((state:RootState) => state.posts.numberOfPostsByTag) 
  const numberOfPostsSeenByTagRoot = useSelector((state:RootState) => state.posts.numberOfPostsSeenByTag) 
  const numberOfPostsBySearchRoot = useSelector((state:RootState) => state.posts.numberOfPostsBySearch) 
  const numberOfPostsSeenBySearchRoot = useSelector((state:RootState) => state.posts.numberOfPostsSeenBySearch)

  useEffect(() => {
    if(numberOfPagesRoot){ 
     setNumberOfPages(numberOfPagesRoot);
    }
    if(numberOfPostsByTagRoot){
      setnumberOfPostsByTag(numberOfPostsByTagRoot)
    }
    if(numberOfPostsSeenByTagRoot){
      setnumberOfPostsSeenByTag(numberOfPostsSeenByTagRoot)
    }
    if(numberOfPostsBySearchRoot){
      setnumberOfPostsBySearch(numberOfPostsBySearchRoot)
    }
    if(numberOfPostsSeenBySearchRoot){
      setnumberOfPostsSeenBySearch(numberOfPostsSeenBySearchRoot)
    }
    if (tagSearch) {
      if(prevTag !== tagSearch){
        setMore(1);
        setPrevTag(tagSearch);
      }
      if (stringSearch) {
        setMore(1);
      }
      setPage(0);
      dispatch(getPostsByTag(tagSearch, more));
    } else if (stringSearch) {
      if(prevString !== stringSearch){
        setMore(1);
        setPrevString(stringSearch);
      }
      if (tagSearch) {
        setMore(1);
      }
      setPage(0);
      dispatch(getPostsBySearch(stringSearch, more));
    } else {
      setPrevString("");
      setPrevTag("");
      setMore(1);
      dispatch(getLastPostsNotifications());
      dispatch(getPosts(page));
    }
  }, [tagSearch, currentId, dispatch, stringSearch, page, more, numberOfPagesRoot, numberOfPostsByTagRoot, numberOfPostsSeenByTagRoot, numberOfPostsBySearchRoot, numberOfPostsSeenBySearchRoot, prevTag, prevString]);

  return (
    <div>
      <div className="section">
        {!props.openArticle && (
          <TagSearch
            setStringSearch={setStringSearch}
            stringSearch={stringSearch}
            setTagSearch={setTagSearch}
            tagSearch={tagSearch}
          ></TagSearch>
        )}
        {props.openArticle ? (
          <Grid stackable className="main-grid">
            <Grid.Row>
              <Grid.Column columns={16}>
                <Article
                  openArticle={props.openArticle}
                  setOpenArticle={props.setOpenArticle}
                  openArticleId={props.openArticleId}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ) : (
          <Grid stackable className="main-grid">
            <Grid.Row
              columns={(props.user && props.user.result.isCreator) || !props.user ? 2 : 1}
            >
              <Grid.Column
                width={(props.user && props.user.result.isCreator) || !props.user ? 10 : 16}
              >
                <Posts
                  openArticle={props.openArticle}
                  setCurrentId={setCurrentId}
                  currentId={currentId}
                  setOpenArticle={props.setOpenArticle}
                  setOpenArticleId={props.setOpenArticleId}
                />
                {!tagSearch && !stringSearch && props.user && (
                  <div className="button-post-group">
                    <Button
                      disabled={page === 0 ? true : false}
                      icon="arrow left"
                      onClick={() => setPage(page - 1)}
                      aria-label="back page"
                    />
                    <span>
                      {" "}
                      Pagina {page + 1}/ {numberOfPages}{" "}
                    </span>
                    <Button
                      disabled={page + 1 === numberOfPages ? true : false}
                      icon="arrow right"
                      onClick={() => setPage(page + 1)}
                      aria-label="more articles"
                    />
                  </div>
                )}
                {tagSearch && !stringSearch && props.user && (
                  <div className="button-post-group">
                    <Button onClick={() => setMore(more + 1)} disabled={numberOfPostsSeenByTag>=numberOfPostsByTag} aria-label="more articles">
                      <Icon name="arrow down" />
                      <span> Get more {tagSearch} {numberOfPostsSeenByTag}/{numberOfPostsByTag}</span>
                    </Button>
                  </div>
                )}
                {!tagSearch && stringSearch && props.user && (
                  <div className="button-post-group">
                    <Button onClick={() => setMore(more + 1)} disabled={numberOfPostsSeenBySearch>=numberOfPostsBySearch}  aria-label="more articles">
                      <Icon name="arrow down" />
                      <span> Get more {stringSearch} {numberOfPostsSeenBySearch}/{numberOfPostsBySearch}</span>
                    </Button>
                  </div>
                )}
              </Grid.Column>
              
              {((props.user && props.user.result.isCreator) || !props.user) && (
                <Grid.Column className="home-form-article-column" width={6}>
                  <FormArticle
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                  />
                </Grid.Column>
              )}
            </Grid.Row>
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Home;
