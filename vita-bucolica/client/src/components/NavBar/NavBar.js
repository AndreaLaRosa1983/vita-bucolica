import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Button, Avatar } from "@material-ui/core";
import vitaBucolica from "./../../images/vitaBucolica.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import decode from "jwt-decode";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
const NavBar = (openArticle, setOpenArticle) => {
  const classes = useStyles();
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
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          varaint="h2"
          align="center"
          onClick={()=> {setOpenArticle(false)}}
        ><img
          className={classes.image}
          src={vitaBucolica}
          alt="Vita Bucolica"
          height="60"
        />
        <HomeIcon className={classes.imageHome} fontSize="medium" />
        </Typography>

        <Toolbar className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user.result.name}
                src={user.result.imageUrl}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user.result.name}
              </Typography>
              <Button
                variant="contained"
                className={classes.logout}
                color="secondary"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign in
            </Button>
          )}
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default NavBar;
