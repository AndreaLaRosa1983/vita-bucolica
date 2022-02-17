import React, { useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import {
  AGRIMACHINERY,
  GROWING,
  BREEDING,
  FARMLIFE,
} from "../../constants/tags";

const TagSearch = ({
  tagSearch,
  setTagSearch,
  stringSearch,
  setStringSearch,
}) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [searchData, setSearchData] = useState(null);
  const setTag = (tag) => {
    setStringSearch(null);
    if (tagSearch === tag) {
      setTagSearch(null);
    } else {
      setTagSearch(tag);
    }
  };

  const clearSearch = () => {
    if (tagSearch !== null) {
      setTagSearch(null);
    }
    setStringSearch(null);
  };
  const search = () => {
    if (stringSearch !== null || stringSearch !== "") {
      if (tagSearch !== null) {
        setTagSearch(null);
      }
      setStringSearch(searchData);
    }
  };

  if (!user?.result?.name) {
    return null;
  }

  return (
    <div className="search-item-container">
      <div className="pills-container">
        <Button
          className={tagSearch === AGRIMACHINERY ? "pill-highlighted" : "pill"}
          onClick={() => setTag(AGRIMACHINERY)}
        >
          {AGRIMACHINERY}
        </Button>
        <Button
          className={tagSearch === GROWING ? "pill-highlighted" : "pill"}
          onClick={() => setTag(GROWING)}
        >
          {GROWING}
        </Button>
        <Button
          className={tagSearch === BREEDING ? "pill-highlighted" : "pill"}
          onClick={() => setTag(BREEDING)}
        >
          {BREEDING}
        </Button>
        <Button
          className={tagSearch === FARMLIFE ? "pill-highlighted" : "pill"}
          onClick={() => setTag(FARMLIFE)}
        >
          {FARMLIFE}
        </Button>
      </div>
      <div className="search-group">
        {!stringSearch ? (
          <>
            <Form.Field
              className="search-field"
              name="search"
              control={Input}
              placeholder="Ricerca..."
              onChange={(e) => setSearchData(e.target.value)}
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
              value={stringSearch}
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
