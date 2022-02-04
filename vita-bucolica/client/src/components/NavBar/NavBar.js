import React, { useState, useEffect } from "react";
import {Menu, Button, Icon}  from "semantic-ui-react";
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]); // Quando cambia la location setta lo user

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };

  return (
    <Menu className="appBar">
    <Menu.Item
    href={!user ? "/" : null} 
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
                href="/"
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
