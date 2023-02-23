import React from 'react';
import '../styles/styles.css';

function RowText(props) {
  return (
    <div key={props.index} className="row-element" style={{padding: '10px', marginBottom: '5px'}}>
      {props.row}
    </div>
  );
}

export default RowText;
