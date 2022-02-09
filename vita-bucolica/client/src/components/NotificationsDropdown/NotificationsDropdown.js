import React, {useState} from "react";
import { Icon, Dropdown}  from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  DELETE_NOTIFICATION_AFTER_CLICK
} from "../../constants/actionTypes";
const NotificationsDropdown = ({setOpenArticle, setOpenArticleId, notifications, updateNotifications}) => {
  
  const dispatch = useDispatch();
  const handleClick = (id) => {
    setOpenArticle(true);
    setOpenArticleId(id);
    console.log(updateNotifications)
    updateNotifications(id);

  }


  return (
    <Dropdown
    text=''
    icon={<Icon circular className="navbar-icon" name="bell outline" alt="icon bell" size="large"/>}
    floating
    
  >
    <Dropdown.Menu>
      <Dropdown.Header content='Post che ti sei perso' />
      {console.log({notificationssss: notifications})}
      {notifications.map((n) => (
        <Dropdown.Item key={n.id} text={n.title + " in " + n.tags.map((tag) => `#${tag} `).join('')} value={n.id} onClick={()=>handleClick(n.id)}/>
      ))}
    </Dropdown.Menu>
  </Dropdown>
    
  );
};

export default NotificationsDropdown;
