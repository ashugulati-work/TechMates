import React from 'react'
import '../styles/styles.css'
import Highlighter from 'react-highlight-words'

function RowText(props) {
   const keywords = props.keywords ? props.keywords : []
   let text = props.row

   // for (let i = 0; i < keywords.length; i++) {
   //     const keywordRegex = new RegExp(keywords[i], 'gi'); // Create a regular expression for the keyword
   //     text = text.replace(keywordRegex, (match) => {
   //       console.log("match", match)
   //       return `<span style={{color: 'white'}} className="highlight">${match}</span>`; // Replace the keyword with a string that includes the keyword wrapped in a span tag with a highlight style
   //     });
   //   }

   return (
      <div key={props.index} className="row-element" style={{padding: '10px', marginBottom: '5px'}}>
         <Highlighter
            highlightClassName="highlight-data"
            searchWords={keywords}
            autoEscape={true}
            textToHighlight={text}
         />
      </div>
   )
}

export default RowText
