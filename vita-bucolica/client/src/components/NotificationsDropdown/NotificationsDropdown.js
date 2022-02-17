import React from "react";
import { useDispatch } from "react-redux";
import { Icon, Dropdown } from "semantic-ui-react";
import { updateLastLog } from "../../actions/logs";

const NotificationsDropdown = ({
  setOpenArticle,
  setOpenArticleId,
  notifications,
  updateNotifications,
}) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const handleClick = (id) => {
    setOpenArticle(true);
    setOpenArticleId(id);
    updateNotifications(id);
  };
  console.log({ notifications: notifications });

  return (
    <Dropdown
      text=""
      icon={
        <Icon
          circular
          className="navbar-icon"
          name="bell outline"
          alt="icon bell"
          size="large"
        />
      }
      floating
      /* onClose={(user && notifications.length > 0) ? updateLastLog({user:user.result._id,log:"NOTIFICATIONOK"}) : null} */
      onClose={() =>
        user && notifications.length > 0
          ? dispatch(
              updateLastLog({ user: user.result._id, log: "NOTIFICATIONOK" })
            )
          : null
      }
    >
      {notifications && (
        <Dropdown.Menu>
          <Dropdown.Header content="Post che ti sei perso" />
          {notifications.map((n) => (
            <Dropdown.Item
              key={n.id}
              text={n.title + " in " + n.tags.map((tag) => `#${tag} `).join("")}
              value={n.id}
              onClick={() => handleClick(n.id)}
            />
          ))}
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
};

export default NotificationsDropdown;
