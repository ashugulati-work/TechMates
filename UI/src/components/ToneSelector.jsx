import React from 'react'

const ToneSelector = ({handleToneChange, selectedTone}) => {
   return (
      <div className="tone">
         <label>
            <span className="tone__label_name">Tone: </span>
         </label>
         <label>
            <input
               type="radio"
               name="tone"
               value="negative"
               checked={selectedTone === 'negative'}
               onChange={handleToneChange}
            />
            <span className="tone__label">Negative</span>
         </label>
         <label>
            <input
               type="radio"
               name="tone"
               value="neutral"
               checked={selectedTone === 'neutral'}
               onChange={handleToneChange}
            />
            <span className="tone__label">Neutral</span>
         </label>
         <label>
            <input
               type="radio"
               name="tone"
               value="positive"
               checked={selectedTone === 'positive'}
               onChange={handleToneChange}
            />
            <span className="tone__label">Positive</span>
         </label>
      </div>
   )
}

export default ToneSelector
