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
  const dispatch = useDispatch();

  const numberOfPagesRoot = useSelector((state:RootState) => state.posts.numberOfPages);
  console.log(numberOfPages)
  useEffect(() => {
    if(numberOfPagesRoot){ 
      //@ts-ignore
     setNumberOfPages(numberOfPagesRoot);
    }
    if (tagSearch) {
      if (stringSearch) {
        setMore(1);
      }
      setPage(0);
      dispatch(getPostsByTag(tagSearch, more));
    } else if (stringSearch) {
      if (tagSearch) {
        setMore(1);
      }
      setPage(0);
      dispatch(getPostsBySearch(stringSearch, more));
    } else {
      setMore(1);
      dispatch(getLastPostsNotifications());
      dispatch(getPosts(page));
    }
  }, [tagSearch, currentId, dispatch, stringSearch, page, more, numberOfPagesRoot]);

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
                    />
                    <span>
                      {" "}
                      Pagina {page + 1}/ {numberOfPages}{" "}
                    </span>
                    <Button
                      disabled={page + 1 === numberOfPages ? true : false}
                      icon="arrow right"
                      onClick={() => setPage(page + 1)}
                    />
                  </div>
                )}
                {tagSearch && !stringSearch && props.user && (
                  <div className="button-post-group">
                    <Button onClick={() => setMore(more + 1)}>
                      <Icon name="arrow down" />
                      <span> try get more from {tagSearch} </span>
                    </Button>
                  </div>
                )}
                {!tagSearch && stringSearch && props.user && (
                  <div className="button-post-group">
                    <Button onClick={() => setMore(more + 1)}>
                      <Icon name="arrow down" />
                      <span> try get more from {stringSearch} </span>
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
