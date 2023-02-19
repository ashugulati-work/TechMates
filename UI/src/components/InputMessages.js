import React, { Fragment, useEffect, useState, useRef } from 'react';
import './MesagesUI.css';
import { connect } from "react-redux";
import { deleteMessageValue } from "../actions/projectActions";

const InputMessages = ({ messages, deleteMessageValue }) => {
    const [msgData, setMsgData] = useState([]);
    useEffect(() => {
        setMsgData([...messages]);
    }, [messages]);
    console.log('Messages ', msgData, Object.keys(msgData), typeof msgData);

    const deleteMessage = (data) => {
        const liValue = data.target.closest('li').innerText.trim();
        console.log(liValue);
        let deleteValue = liValue.substring(1);
        console.log(deleteValue);
        deleteMessageValue(deleteValue.trim());
    }

    return (
        <> {Object.keys(msgData).length === 0 ? '' :  <ul className="list-group"> {
            msgData.map((value, index) => {
                console.log(value);
                return (<li key={index} className="list-group-item list-group-item-action li-font-size"><span onClick={deleteMessage} className='delete-icon'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></span> <span className='horizontal-line'>|</span>{value}</li>)
            })
        }
    </ul>} </>
    )
}

const mapStateToProps = (state) => {
    return {
        messages: state.projectReducer.getInputMsg
    }
  };
  
export default connect(mapStateToProps, { deleteMessageValue })(InputMessages);
