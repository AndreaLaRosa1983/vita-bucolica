import React, { useEffect, Dispatch, SetStateAction, useState } from "react";
import { Menu, Button, Icon } from "semantic-ui-react";
import { useNavigate, useLocation } from "react-router-dom";
import NotificationsDropdown from "../NotificationsDropdown/NotificationsDropdown";
import { useSelector } from "react-redux";
import decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { deleteFromRecievedNotification } from "../../actions/notifications";
import { RootState } from "../../reducers/index";
import cookie from "../../models/cookie";
import UserModalForUpdate from "../UserModalForUpdate/UserModalForUpdate";
import { getUserCookie } from "../../actions/utils";
import UserModalForUpdatePw from "../UserModalForUpdatePw/UserModalForUpdatePw";

const NavBar = (props: {
  user: cookie | undefined;
  setUser: Dispatch<SetStateAction<cookie | undefined>>;
  setOpenArticle: Dispatch<SetStateAction<boolean>>;
  setOpenArticleId: Dispatch<SetStateAction<string | null | undefined>>;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const tokenHandler = getUserCookie();
  const [openModal, setOpenModal] = useState(false);
  const [openModalPassword, setOpenModalPassword] = useState(false);
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );
  const updateNotifications = (id: string) => {
    dispatch(deleteFromRecievedNotification(id));
  };

  useEffect(() => {
    const token = tokenHandler?.token;
    if (token) {
      const decodedToken: any = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    props.setUser(getUserCookie());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]); // Quando cambia la location setta lo user

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <Menu className="appBar">
      <UserModalForUpdate user={props.user} openModal={openModal} setOpenModal={setOpenModal} setOpenModalPassword={setOpenModalPassword}/>
      <UserModalForUpdatePw user={props.user} openModalPassword={openModalPassword} setOpenModalPassword={setOpenModalPassword} />
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
      {props.user !== null && (
        <Menu.Item>
          <div className="user-name" onClick={() => handleModal()}>
            {
              //@ts-ignore
              props?.user?.result?.firstName
            }
            {' '}
            {
              //@ts-ignore
              props?.user?.result?.lastName
            }
          </div>
          <Icon
            circular
            size="large"
            className="navbar-icon user-round-icon"
            onClick={() => handleModal()}
          >
            <div className="letter-name">
              {
                //@ts-ignore
                props?.user?.result?.firstName.charAt(0)
              }
            </div>
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
              <span className="badge">{notifications.length}</span>
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
              className="orange-button"
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
