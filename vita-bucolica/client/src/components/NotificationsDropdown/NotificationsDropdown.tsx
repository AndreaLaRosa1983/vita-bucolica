import React, {Dispatch, SetStateAction} from "react";
import { useDispatch } from "react-redux";
import { Icon, Dropdown } from "semantic-ui-react";
import { updateLastLog } from "../../actions/logs";

const NotificationsDropdown = (props:{
  setOpenArticle:Dispatch<SetStateAction<boolean>>,
  setOpenArticleId:Dispatch<SetStateAction<string | null | undefined>>,
  notifications:[],
  updateNotifications:Function,}
) => {
  //@ts-ignore
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const handleClick = (id:string) => {
    props.setOpenArticle(true);
    props.setOpenArticleId(id);
    props.updateNotifications(id);
  };
  console.log({ notifications: props.notifications });

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
        <Dropdown.Menu>
          <Dropdown.Header content="Post che ti sei perso" />
          {props.notifications.map((n) => (
            <Dropdown.Item
            //@ts-ignore
              key={n.id}
              //@ts-ignore
              text={n.title + " in " + n.tags.map((tag) => `#${tag} `).join("")}
              //@ts-ignore
              value={n.id}
              //@ts-ignore
              onClick={() => handleClick(n.id)}
            />
          ))}
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
};

export default NotificationsDropdown;
