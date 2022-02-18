import React, { useState, Dispatch, SetStateAction } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import {
  AGRIMACHINERY,
  GROWING,
  BREEDING,
  FARMLIFE,
} from "../../constants/tags";

const TagSearch = (props:{
  tagSearch:string,
  setTagSearch:Dispatch<SetStateAction<string>>,
  stringSearch:string,
  setStringSearch:Dispatch<SetStateAction<string>>,
}) => {
  //@ts-ignore
  const user = JSON.parse(localStorage.getItem("profile"));
  const [searchData, setSearchData] = useState("");
  const setTag = (tag:string) => {
    props.setStringSearch("");
    if (props.tagSearch === tag) {
      props.setTagSearch("");
    } else {
      props.setTagSearch(tag);
    }
  };

  const clearSearch = () => {
    if (props.tagSearch !== null || props.tagSearch !== "") {
      props.setTagSearch("");
    }
    props.setStringSearch("");
  };
  const search = () => {
    if (props.stringSearch !== null || props.stringSearch !== "") {
      if (props.tagSearch !== null) {
        props.setTagSearch("");
      }
      props.setStringSearch(searchData);
    }
  };

  if (!user?.result?.name) {
    return null;
  }

  return (
    <div className="search-item-container">
      <div className="pills-container">
        <Button
          className={props.tagSearch === AGRIMACHINERY ? "pill-highlighted" : "pill"}
          onClick={() => setTag(AGRIMACHINERY)}
        >
          {AGRIMACHINERY}
        </Button>
        <Button
          className={props.tagSearch === GROWING ? "pill-highlighted" : "pill"}
          onClick={() => setTag(GROWING)}
        >
          {GROWING}
        </Button>
        <Button
          className={props.tagSearch === BREEDING ? "pill-highlighted" : "pill"}
          onClick={() => setTag(BREEDING)}
        >
          {BREEDING}
        </Button>
        <Button
          className={props.tagSearch === FARMLIFE ? "pill-highlighted" : "pill"}
          onClick={() => setTag(FARMLIFE)}
        >
          {FARMLIFE}
        </Button>
      </div>
      <div className="search-group">
        {!props.stringSearch ? (
          <>
            <Form.Field
              className="search-field"
              name="search"
              control={Input}
              placeholder="Ricerca..."
              onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setSearchData(e.target.value)}
            ></Form.Field>
            <Button className="search-button" onClick={() => search()}>
              <Icon name="search" size="small" />
            </Button>{" "}
          </>
        ) : (
          <>
            <Form.Field
              className="search-field"
              name="search"
              control={Input}
              placeholder=""
              value={props.stringSearch}
              disabled
            ></Form.Field>
            <Button
              className="search-button-clear"
              onClick={() => clearSearch()}
            >
              <Icon name="delete" size="small" />
            </Button>
          </>
        )}
      </div>
      <Form.Group></Form.Group>
    </div>
  );
};
export default TagSearch;
