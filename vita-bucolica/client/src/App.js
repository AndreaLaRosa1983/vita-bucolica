import React, { useState, useEffect}from "react";
import { Container, Image, Grid, Button } from "semantic-ui-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import colline from "./images/colline.jpg";
import albero from "./images/albero.png";
import io from "socket.io-client";
const App = () => {
  const [openArticle, setOpenArticle] = useState(null);
  const ENDPOINT = "http://localhost:3000";
  const [socketStatus, setSocketStatus] = useState(false);
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null)
  useEffect(() => {
    console.log({socketstatus:socketStatus});
    if(socketStatus){
    setSocket(io(ENDPOINT));
    console.log("open the socket")
  }
  },[socketStatus]);
  
  useEffect(() => {
    if(socket && user){
      console.log({socket: socket,
      user : user});
    socket.emit("connectionTags",user.result.tags);
    socket.on("newPost", (arg) => 
    console.log(arg))
  }},[socket, user]);

  const onclick = () =>  {
    console.log("in onclick");
    console.log({user})
    socket.emit("Pippo", user.result.tags)
  }


  return (
    <BrowserRouter> 
      <Container className="wrapper">
    <header className="header">
      <Grid>
      <Grid.Row className="navbarRow">
        <NavBar setOpenArticle={setOpenArticle} setSocketStatus={setSocketStatus} user={user} setUser={setUser} />
      </Grid.Row>
      <Grid.Row>  
        <h1 className="titleHeader">Vita Bucolica</h1>
        </Grid.Row>
      </Grid>
      <Image alt="Colline" src={colline} className="background"/>
      <Image alt="Alberi" src={albero} className="foreground"/>

    </header>
        <Routes>
          <Route path="/" element={<Home openArticle={openArticle} setOpenArticle={setOpenArticle} socket={socket}/> } />
          <Route path="/auth" element={<Auth setSocketStatus={setSocketStatus} socketStatus={socketStatus}/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
