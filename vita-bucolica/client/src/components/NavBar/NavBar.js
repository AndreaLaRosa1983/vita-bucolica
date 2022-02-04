import React, { useState, useEffect } from "react";
import {Menu, Button, Image, Icon}  from "semantic-ui-react";
import vitaBucolica from "./../../images/vitaBucolica.png";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import { useDispatch } from "react-redux";
const NavBar = (openArticle) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]); // Quando cambia la location setta lo user
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };
  return (
    <Menu className="appBar">
    <Menu.Item
          onClick={()=> openArticle.setOpenArticle(false)}
        >
        <Icon className="imageHome" name='home' alt="icon home" size="large" />
        </Menu.Item>
        {user && <Menu.Item>             
         <div className="userName" >
                {user.result.name}
              </div>
         </Menu.Item>}
        <Menu.Item position='right'>
          {user ? (
            <div >
              <Button
                className="logout"
                onClick={logout}
              >
                Disconnetti
              </Button>
            </div>
          ) : (
            <Button
            className="orange"
              href='/auth'
              onClick={()=> openArticle.setOpenArticle(false)}
            >
              Accedi
            </Button>
          )}
        </Menu.Item>
    </Menu>
  );
};

export default NavBar;
