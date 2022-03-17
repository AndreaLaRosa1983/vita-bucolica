import React, {Dispatch, SetStateAction} from "react";
import { useDispatch } from "react-redux";
import { Icon, Dropdown } from "semantic-ui-react";
import { updateLastLog } from "../../actions/logs";
import { getPosts } from "../../actions/posts";
import { getUserCookie } from "../../actions/utils";
import { getPost } from "../../actions/posts";
import NotificationType from "../../models/notification";

const NotificationsDropdown = (props:{
  setOpenArticle:Dispatch<SetStateAction<boolean>>,
  setOpenArticleId:Dispatch<SetStateAction<string | null | undefined>>,
  notifications:[],
  updateNotifications:Function,}
) => {
  const user = getUserCookie();
  const dispatch = useDispatch();
  const handleClick = (id:string) => {
    dispatch(getPosts(0));
    dispatch(getPost(id));
    props.setOpenArticle(true);
    props.setOpenArticleId(id);
    props.updateNotifications(id);
  };

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
        user && props.notifications.length > 0
          ? dispatch(
            //@ts-ignore
              updateLastLog({ user: user.result._id, log: "NOTIFICATIONOK" })
            )
          : null
      }
    >
      {props.notifications && (
        <Dropdown.Menu >
          <Dropdown.Header content="Post che ti sei perso" aria-label="new posts"  />
          {props.notifications.map((n: NotificationType) => (
            <Dropdown.Item
            role="item"
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
