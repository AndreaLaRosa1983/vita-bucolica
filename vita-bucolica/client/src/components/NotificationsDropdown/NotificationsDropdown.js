import React from "react";
import { Icon, Dropdown}  from "semantic-ui-react";

const NotificationsDropdown = ({setOpenArticle, setOpenArticleId, notifications, updateNotifications}) => {

  const handleClick = (id) => {
    setOpenArticle(true);
    setOpenArticleId(id);
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
      {notifications.map((n) => (
        <Dropdown.Item key={n.id} text={n.title + " in " + n.tags.map((tag) => `#${tag} `).join('')} value={n.id} onClick={()=>handleClick(n.id)}/>
      ))}
    </Dropdown.Menu>
  </Dropdown>
    
  );
};

export default NotificationsDropdown;
