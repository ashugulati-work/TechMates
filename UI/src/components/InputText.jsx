import React from 'react'
import '../styles/styles.css'

function InputText(props) {
  return (
    <div className="form-group mx-sm-3 mb-2 d-flex align-items-center">
        <input type="text" disabled={props.disableInputBox} className="form-control" style={{ width: props.size}} id="inputMsg" placeholder={props.placeHolder} name="inputMsg" onChange={props.onHandleChange} value={props.value} />
        <button type="button" disabled={props.plusBtnHide} id="plusBtn" className="btn btn-sm plus-btn" onClick={props.onHandleClick}>
        <span className="glyphicon glyphicon-plus"></span>
        </button>
    </div>

  )
}

export default InputText
