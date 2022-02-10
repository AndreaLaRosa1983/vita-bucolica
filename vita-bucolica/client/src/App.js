import React, { useState, useEffect}from "react";
import { Container, Image, Grid } from "semantic-ui-react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import colline from "./images/colline.jpg";
import albero from "./images/albero.png";
import io from "socket.io-client";
const App = () => {
  const [openArticleId, setOpenArticleId] = useState(null);
  const [openArticle, setOpenArticle] = useState(null);
  const ENDPOINT = "http://localhost:3000";
  const [socketStatus, setSocketStatus] = useState(false);
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null)
  const [notifications, setNotifications] = useState(null)

  useEffect(() => {
    if(socketStatus){
    setSocket(io(ENDPOINT));
  }
  },[socketStatus]);
  
  useEffect(() => {
    if(socket && user){
    socket.emit("connectionTags",user.result.tags);
  }},[socket, user, notifications]);

  useEffect(() =>{
    if(socket){
      socket.on("newPost", (arg) => { 
        let tmpNotifications = notifications;
        tmpNotifications.push(arg,()=> setNotifications(tmpNotifications));
        ;
        }
      )
  }},[notifications, socket]);


  return (
    <BrowserRouter> 
      <Container className="wrapper">
    <header className="header">
      <Grid>
      <Grid.Row className="navbarRow">
        <NavBar setOpenArticleId={setOpenArticleId} setOpenArticle={setOpenArticle} setSocketStatus={setSocketStatus} user={user} setUser={setUser} notifications={notifications} setNotifications={setNotifications} />
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
          <Route path="/posts" element={<Home user={user} openArticleId={openArticleId} setOpenArticleId={setOpenArticleId} openArticle={openArticle} setOpenArticle={setOpenArticle} socket={socket}/>  } />
          <Route path="/auth" element={<Auth setSocketStatus={setSocketStatus} socketStatus={socketStatus}/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
