import React, { useState, useEffect, useCallback  }from "react";
import { Container, Image, Grid, Button } from "semantic-ui-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import colline from "./images/colline.jpg";
import albero from "./images/albero.png";
import socketIOClient from "socket.io-client";
const App = () => {
  const [openArticle, setOpenArticle] = useState(null);
  const ENDPOINT = "http://localhost:3000";
  const [response, setResponse] = useState("");
  const [socketStatus, setSocketStatus] = useState(false);
  const [socket, setSocket] = useState(false);
  const [user, setUser] = useState(null)
  useEffect(() => {
    console.log({socketstatus:socketStatus});
    if(socketStatus){
    setSocket(socketIOClient(ENDPOINT))
    console.log("open the socket")
  }
  },[socketStatus]);
  
  useEffect(() => {
    if(socket){
      setUser(JSON.parse(localStorage.getItem("profile")));
    socket.on("FromAPI", data => {
      setResponse(data);
    });
    socket.on("Ciccio", data => {
      console.log(data)
    })
  }
  },[socket]);

  const onclick = () =>  {
    console.log("in onclick");
    console.log({user})
    socket.emit("Pippo", user)
  }


  return (
    <BrowserRouter>
   <p>
      It's <time dateTime={response}>{response}</time>
    </p> 
    <Button onClick={onclick}></Button>
      <Container className="wrapper">
    <header className="header">
      <Grid>
      <Grid.Row className="navbarRow">
        <NavBar setOpenArticle={setOpenArticle} setSocketStatus={setSocketStatus} />
      </Grid.Row>
      <Grid.Row>  
        <h1 className="titleHeader">Vita Bucolica</h1>
        </Grid.Row>
      </Grid>
      <Image alt="Colline" src={colline} className="background"/>
      <Image alt="Alberi" src={albero} className="foreground"/>

    </header>
        <Routes>
          <Route path="/" element={<Home openArticle={openArticle} setOpenArticle={setOpenArticle}/> } />
          <Route path="/auth" element={<Auth setSocketStatus={setSocketStatus} socketStatus={socketStatus}/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
