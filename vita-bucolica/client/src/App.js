import React, { useState }from "react";
import { Container, Image, Grid } from "semantic-ui-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import colline from "./images/colline.jpg";
import albero from "./images/albero.png";
const App = () => {

  const [openArticle, setOpenArticle] = useState(false);
  return (
    <BrowserRouter>
      <Container className="wrapper">
    <header className="header">
      <Grid>
      <Grid.Row className="navbarRow">
        <NavBar setOpenArticle={setOpenArticle} openArticle={openArticle} />
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
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
