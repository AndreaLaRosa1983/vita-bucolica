import React, { useEffect, useState } from "react";
import { Menu, Button, Icon } from "semantic-ui-react";
import { useNavigate, useLocation } from "react-router-dom";
import NotificationsDropdown from "../NotificationsDropdown/NotificationsDropdown";
import { useSelector } from "react-redux";
import decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { deleteFromRecievedNotification } from "../../actions/notifications";
import { RootState } from "../../reducers/index";
const NavBar = ({ user, setUser, setOpenArticle, setOpenArticleId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const tokenHandler = JSON.parse(localStorage.getItem("profile"));
  const { notifications } = useSelector((state: RootState) => state.notifications);

  const updateNotifications = (id) => {
    console.log(id);
    dispatch(deleteFromRecievedNotification(id));
  };

  useEffect(() => {
    const token = tokenHandler?.token;
    if (token) {
      const decodedToken = decode(token);
      /* @ts-ignore */
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]); // Quando cambia la location setta lo user

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <Menu className="appBar">
      <Menu.Item
        href={!user ? "/" : null}
        onClick={() => setOpenArticle(false)}
      >
        <Icon
          circular
          className="navbar-icon"
          name="home"
          alt="icon home"
          size="large"
        />
      </Menu.Item>
      {user && (
        <Menu.Item>
          <div className="user-name">{user.result.name}</div>
          <Icon circular size="large" className="navbar-icon user-round-icon">
            <div className="letter-name">{user.result.name.charAt(0)}</div>
          </Icon>
        </Menu.Item>
      )}
      {user && (
        <Menu.Item>
          {(!notifications || notifications.length === 0) && (
            <Icon
              circular
              className="navbar-icon"
              name="bell outline"
              alt="icon bell"
              size="large"
            />
          )}
          {notifications && notifications.length > 0 && (
            <>
              <NotificationsDropdown
                setOpenArticle={setOpenArticle}
                setOpenArticleId={setOpenArticleId}
                notifications={notifications}
                updateNotifications={updateNotifications}
              />
              <span className="badge">
                {notifications.length}
              </span>
            </>
          )}
        </Menu.Item>
      )}
      <Menu.Item position="right">
        {user ? (
          <div>
            <Button className="access-icon" onClick={logout} href="/">
              <Icon name="log out" alt="log out" />
            </Button>
            <Button href="/" className="logout" onClick={logout}>
              Disconnetti
            </Button>
          </div>
        ) : (
          <div>
            <Button
              className="access-icon"
              onClick={() => setOpenArticle(false)}
              href="/auth"
            >
              <Icon name="sign-in" alt="sign in" />
            </Button>
            <Button
              className="orange"
              href="/auth"
              onClick={() => setOpenArticle(false)}
            >
              Accedi
            </Button>
          </div>
        )}
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;