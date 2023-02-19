import React, { Fragment, useEffect, useState, useRef } from 'react';
import './MesagesUI.css';
import { connect } from "react-redux";
import InputMessages from './InputMessages';
import { createInputMessages, getAllMessages, downloadFile, downloadDataEmpty } from "../actions/projectActions";

const MesagesUI = ({ createInputMessages, getAllMessages, retriveMsg, messages, downloadFile, downloadData, downloadDataEmpty }) => {
    const [inputValue, setInputValue] = useState({
      inputMsg: ''
    });
    const [addMessageValue, setAddMessageValue] = useState(false);
    const [plusBtnHide, setPlusBtnHide] = useState(true);

    const onChangeHandler = (event) => {
      const keys = event.target.name;
      const values = event.target.value;
      setPlusBtnHide(false);
      setInputValue((prevState, props) => ({
          ...prevState, [keys]: values
        }))
    }

    const { inputMsg } = inputValue;
    console.log('inputValue ============ ', inputValue);
    useEffect(() => {
      if (inputMsg === '') {
        setPlusBtnHide(true);
      }
    })

    const addMessages = () => {
      setAddMessageValue(true);
      createInputMessages(inputValue);
      setInputValue({
        inputMsg: ''
    });
    }

    const submitFormMessage = (event) => {
      event.preventDefault();
      console.log('submitFormMessage ============ ', inputValue);
      getAllMessages();
    }

    const downloadFileEventHandler = () => {
      downloadFile();
    }
    console.log('Outside==== ', downloadData);
    useEffect(() => {
      if (downloadData !== undefined) {
        console.log('Download Data ', downloadData);
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
          JSON.stringify(downloadData)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "data.json";
        link.click();
        downloadDataEmpty();
      }
    }, [downloadData])

    return (
      <Fragment>
      <div className="container">
      <div className="row navbar-box">
      <nav className="navbar navbar-expand-lg navbar-light">
        <h3>Framework to generate synthetic text data using Generative AI technologies</h3>
      </nav>
      </div>
      <div className="row row-css">
        <div className="col-sm msg-box">
        <form className="form-inline" onSubmit={submitFormMessage}>
          <div className="form-group mx-sm-3 mb-2">
            <input type="text" size="70" className="form-control" id="inputMsg" placeholder="Please enter message..." name="inputMsg" onChange={onChangeHandler} value={inputMsg} />
            <button type="button" disabled={plusBtnHide} id="plusBtn" className="btn btn-sm plus-btn" onClick={addMessages}>
              <span className="glyphicon glyphicon-plus"></span>
            </button>
          </div>
          <button type="submit" className="btn btn-primary mb-2 submit-btn">Submit</button>
        </form>
        <div className='generate-rows'><p className='generate-para'>Generate rows: </p><input type="number" className="number" id="number"></input></div>
        </div>
      </div>
      <div className="row row-css">
        <div className="col-lg-6 message-input">
          {addMessageValue && <InputMessages /> }
        </div>
      </div>
      {(Object.keys(retriveMsg).length > 0 && Object.keys(messages).length > 0) && <div className="row download-row">
        <div className="col-lg-6 download-col">
          <p className='download-para'>Please download your file: </p><button onClick={downloadFileEventHandler} type="button" className="btn btn-success download-btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/></svg></button>
        </div>
      </div>}
    </div>
    </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
      retriveMsg: state.projectReducer.retriveMsg,
      messages: state.projectReducer.getInputMsg,
      downloadData: state.projectReducer.downloadData
    }
  };
  
export default connect(mapStateToProps, { downloadDataEmpty, createInputMessages, getAllMessages, downloadFile })(MesagesUI);
