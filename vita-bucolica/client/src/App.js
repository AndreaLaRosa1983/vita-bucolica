import React, { useState, useEffect}from "react";
import { Container, Image, Grid } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import colline from "./images/colline.jpg";
import albero from "./images/albero.png";
import { startClientSocket } from "./actions/socket";
const App = () => {
  const [openArticleId, setOpenArticleId] = useState(null);
  const [openArticle, setOpenArticle] = useState(null);
  const [user, setUser] = useState(null)
  const [notifications, setNotifications] = useState(null)
  const [stop, setStop] = useState(false);
  const dispatch = useDispatch();

  useEffect(() =>{
    if(user && !stop){
      dispatch(startClientSocket(user));
      setStop(true);
  }},[user,stop,dispatch]);

  return (
    <BrowserRouter> 
      <Container className="wrapper">
    <header className="header">
      <Grid>
      <Grid.Row className="navbarRow">
        <NavBar setOpenArticleId={setOpenArticleId} setOpenArticle={setOpenArticle} user={user} setUser={setUser} notifications={notifications} setNotifications={setNotifications} />
      </Grid.Row>
      <Grid.Row>  
        <h1 className="titleHeader">Vita Bucolica</h1>
        </Grid.Row>
      </Grid>
      <Image alt="Colline" src={colline} className="background"/>
      <Image alt="Alberi" src={albero} className="foreground"/>

    </header>
        <Routes>
          <Route path="/" exact element={<Navigate to="/posts"/>}/>
          <Route path="/posts" element={<Home user={user} openArticleId={openArticleId} setOpenArticleId={setOpenArticleId} openArticle={openArticle} setOpenArticle={setOpenArticle}/>  } />
          <Route path="/auth" element={<Auth/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
