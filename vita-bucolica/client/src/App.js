import React, { useState }from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Article from "./components/Article/Article"

const App = () => {

  const [openArticle, setOpenArticle] = useState(false);
  return (
    <BrowserRouter>
      <Container maxidth="lg">
        <NavBar setOpenArticle={setOpenArticle} openArticle={openArticle} />
        <Routes>
          <Route path="/" element={<Home openArticle={openArticle} setOpenArticle={setOpenArticle}/> } />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
