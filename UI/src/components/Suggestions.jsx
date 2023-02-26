import React from 'react'
import '../styles/suggestion_style.css'

const SuggestionsList = ({suggestions, onClick, setShowSuggestions}) => {
   const handleClick = (suggestion) => {
      onClick(suggestion)
   }

   const handleClose = (e) => {
      setShowSuggestions(false)
   }

   const suggestionList = suggestions.map((suggestion, index) => (
      <li key={index} onClick={() => handleClick(suggestion)}>
         {suggestion?.sentence}
      </li>
   ))

   return (
      <ul className="suggestion-list visible" onMouseLeave={handleClose}>
         {suggestionList}
      </ul>
   )
}

export default SuggestionsList
