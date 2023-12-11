import React from "react";

// libaries
import { IoMdSearch } from 'react-icons/io';
import styled from 'styled-components';

const SearchBarView = (props) => {
  return (
    <Search>
      <IoMdSearch style={{marginLeft: "5px", position: "absolute"}} color="#717171" size="1.5em" />
      <SearchBar 
        id="search-bar" 
        type="text"
        // className="w-25"
        back={props.back}
        placeholder={props.title}/>
    </Search>
  )
}

const Search = styled.div`
  // padding: 5px 0;
  position: relative;
  display: flex;  
  align-items: center;
  height:100%
`

const SearchBar = styled.input`
  padding: 3px 5px 3px 40px;
  width: 100%;
  border: 2px solid #fff;
  height:100%;
  background: ${(props)=>props.back? '#ffffff':'#F5F7FA'}
`

export default SearchBarView;