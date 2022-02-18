import React, { useEffect, Dispatch, SetStateAction } from "react";
import { Menu, Button, Icon } from "semantic-ui-react";
import { useNavigate, useLocation } from "react-router-dom";
import NotificationsDropdown from "../NotificationsDropdown/NotificationsDropdown";
import { useSelector } from "react-redux";
import decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { deleteFromRecievedNotification } from "../../actions/notifications";
import { RootState } from "../../reducers/index";
import cookie from "../../models/cookie";
const NavBar = ( props:{user:cookie | undefined, setUser:Dispatch<SetStateAction<cookie | undefined>>, setOpenArticle:Dispatch<SetStateAction<boolean>>, setOpenArticleId:Dispatch<SetStateAction<string>>} ) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  //@ts-ignore
  const tokenHandler = JSON.parse(localStorage.getItem("profile"));
  const { notifications } = useSelector((state: RootState) => state.notifications);
 console.log(props.user)
  const updateNotifications = (id:string) => {
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
    //@ts-ignore
    props.setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]); // Quando cambia la location setta lo user

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <Menu className="appBar">
      <Menu.Item
        href={!props.user ? "/" : null}
        onClick={() => props.setOpenArticle(false)}
      >
        <Icon
          circular
          className="navbar-icon"
          name="home"
          alt="icon home"
          size="large"
        />
      </Menu.Item>
      {(props.user === undefined) && (
        <Menu.Item>
            
      <div className="user-name">
        
            {/* {props.user.result.name} */}</div>
          <Icon circular size="large" className="navbar-icon user-round-icon">
            <div className="letter-name">{/* {props.user.result.name.charAt(0)} */}</div>
          </Icon>
        </Menu.Item>
      )}
      {props.user && (
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
                setOpenArticle={props.setOpenArticle}
                setOpenArticleId={props.setOpenArticleId}
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
        {props.user ? (
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
              onClick={() => props.setOpenArticle(false)}
              href="/auth"
            >
              <Icon name="sign-in" alt="sign in" />
            </Button>
            <Button
              className="orange"
              href="/auth"
              onClick={() => props.setOpenArticle(false)}
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
