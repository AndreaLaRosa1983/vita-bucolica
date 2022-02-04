import React, { useState }  from 'react'
import { Button, Form, Input } from 'semantic-ui-react'
import {AGRIMACHINERY, GROWING, BREEDING, FARMLIFE } from "../../constants/tags";

const TagSearch = (tagSearch, stringSearch) => {
const user = JSON.parse(localStorage.getItem("profile"));
const [searchData,setSearchData] = useState(null);
const setTag = (tag) => {
    if(tagSearch.tagSearch === tag){
        tagSearch.setTagSearch(null);
    } else {
    tagSearch.setTagSearch(tag);
    }
};

const search = () => {
    console.log(tagSearch.stringSearch)
    console.log(tagSearch.tagSearch)
    console.log(searchData)
    if(tagSearch.stringSearch !== null || tagSearch.stringSearch !== ""){
    if(tagSearch.tagSearch !== null){
        tagSearch.setTagSearch(null);
    } 
    tagSearch.setStringSearch(searchData)
}
};

if (!user?.result?.name) {
    return null
  }


return (  <div className = "pills-container">
    
    <Button className = {tagSearch.tagSearch === AGRIMACHINERY ? "pill-highlighted" : "pill"}  onClick={()=>setTag(AGRIMACHINERY)}>
    {AGRIMACHINERY}
    </Button>
    <Button className = {tagSearch.tagSearch === GROWING ? "pill-highlighted" : "pill"} onClick={()=>setTag(GROWING)}>
    {GROWING}
    </Button>
    <Button className = {tagSearch.tagSearch === BREEDING ? "pill-highlighted" : "pill"} onClick={()=>setTag(BREEDING)}>
    {BREEDING}
    </Button>
    <Button  className = {tagSearch.tagSearch === FARMLIFE ? "pill-highlighted" : "pill"} onClick={()=>setTag(FARMLIFE)}>
    {FARMLIFE} 
    </Button>
    <Form.Field  name="video"
          control={Input}
          placeholder="Ricerca"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}>
        </Form.Field>
    <Form.Field>
    </Form.Field>
    <Button onClick={()=> search()}>Search</Button>
  </div>
)
}
export default TagSearch