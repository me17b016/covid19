// var Highlight = require('react-highlighter');
import React, { useState, useEffect, useRef } from 'react'
import './searchbox.styles.css'

import ClearAll from '../clearall/clearall.component'

import Highlighter from "react-highlight-words"
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone'

const SearchBox = props => {
  const node = useRef();
  const [districts, setDistricts] = useState([])
  const [userInput, setUserInput ] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isExpanded, setExpanded] = useState(false)

  useEffect(() => {
    setDistricts(props.districts)
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [props])

  const clearAll = () => {
    props.clearAll()
    setUserInput("")
    setSuggestions([])
  }

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setExpanded(false);
  };

  const handleOnChange = (e) => {
    let value = e.target.value
    //console.log(value)
    value = value.split("\\").join("");
    setUserInput(value)
    let newSuggestions = []
    if (value.length > 0) {
      const regex = new RegExp(`${value}`, 'i')
      newSuggestions = districts.sort().filter(district => regex.test(district))
    }
    setSuggestions(newSuggestions)
  }
  const suggestionSelected = (district) => {
    //console.log(district);
    props.districtSelected(district);
    setExpanded(!isExpanded)
  }
  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null
    }
    let classExpaned = "";
    if (isExpanded) classExpaned="searchbox-suggestions";
    else classExpaned="searchbox-suggestions-hidden"
    return (
      <div className={classExpaned}>
        {suggestions.map((district, index) => 
          <div className="searchbox-suggestions-district" key={index} onClick={() => suggestionSelected(district)}>
            <div className="searchbox-districtname"> 
              <Highlighter
                highlightClassName="YourHighlightClass"
                searchWords={[userInput]}
                autoEscape={false}
                textToHighlight={district}
              />
            </div>
          </div>)
        }
      </div>
    )
  }

  return (
    <div className="searchbox" ref={node}>
      <div className="searchbox-searchbar">
        <div className="searchbox-searchicon">
          <SearchTwoToneIcon style={{margin:"5 5 5 10"}}/>
        </div>
        <div className="searchbox-inputbox">
          <input id="input" className="searchbox-input" type="text" value={userInput} placeholder="Search..." onClick={e => setExpanded(true)} onChange={handleOnChange} />
        </div>
        <ClearAll clearAll={clearAll}/>
      </div>
      { renderSuggestions() }
    </div>
  )
}

export default SearchBox;