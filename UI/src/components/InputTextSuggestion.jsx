import React, { useState } from 'react';
import '../styles/suggestion_style.css'


export const SuggestionList = ({ suggestions, onClick}) => {
  const handleClick = (suggestion) => {
    onClick(suggestion);
  };

  const suggestionList = suggestions.map((suggestion) => (
    <li key={suggestion} onClick={() => handleClick(suggestion)}>
      {suggestion}
    </li>
  ));

  return (
    <ul className={`suggestion-list visible`}>{suggestionList}</ul>
  );
};


const InputTextSuggestion = () => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState(['apple', 'banana', 'orange']);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    // setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };

  const handleTryExampleClick = () => {
    setShowSuggestions(true);
  };

  return (
    <div>
      {/* <label htmlFor="example-input">Input text:</label> */}
      <input
        type="text"
        id="example-input"
        value={inputValue}
        onChange={handleInputChange}
      />
      {showSuggestions && (
        <SuggestionList suggestions={suggestions} onClick={handleSuggestionClick} />
      )}
      <br />
      <a href="#" onClick={handleTryExampleClick}>
        Try an Example
      </a>
    </div>
  );
};

export default InputTextSuggestion;
