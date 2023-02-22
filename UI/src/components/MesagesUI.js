import React, { Fragment, useEffect, useState, useRef } from 'react';
import './MesagesUI.css';
import { connect } from "react-redux";
import InputMessages from './InputMessages';
import InputText from './InputText';
import { createInputMessages, submitFormData, downloadFile, downloadDataEmpty } from "../actions/projectActions";
import constant from "../config.json";

const MesagesUI = ({ createInputMessages, submitFormData, retriveMsg, messages, downloadFile, downloadData, downloadDataEmpty }) => {
    const [inputValue, setInputValue] = useState({
      inputMsg: ''
    });
    const [rowInput, setRowInput] = useState(5)
    const [addMessageValue, setAddMessageValue] = useState(false);
    const [plusBtnHide, setPlusBtnHide] = useState(true);

    const [topic, setTopic] = useState([]);
    const [dropDownValue, setDropDownValue] = useState('');
    const [disableInputBox, setDisableInputBox] = useState(true);
    const [showSpinner, setShowSpinner] = useState(false);

    const [selectedTone, setSelectedTone] = useState('neutral');
    
    const [keywords, setKeywords] = useState([]);
    const [newKeyword, setNewKeyword] = useState('');
    const [plusBtnHideKeyword, setPlusBtnHideKeyword] = useState(true);

    const handleNewKeywordChange = (event) => {
      setPlusBtnHideKeyword(false);
      setNewKeyword(event.target.value);
    };
  
    const handleAddKeyword = () => {
      if (newKeyword.trim() !== '') {
        setKeywords((prevKeywords) => [...prevKeywords, newKeyword.trim()]);
        console.log("keywords....", keywords)
        setNewKeyword('');
      }
    };

    const onChangeHandler = (event) => {
      const keys = event.target.name;
      const values = event.target.value;
      setPlusBtnHide(false);
      setInputValue((prevState, props) => ({
          ...prevState, [keys]: values
        }))
    }
   
    const onChangeRowHandler = (event) => {
      const values = event.target.value;
      setRowInput(values);
    }
    
    const { inputMsg } = inputValue;
    useEffect(() => {
      if (inputMsg === '') {
        setPlusBtnHide(true);
      }
      if(newKeyword === ''){
        setPlusBtnHideKeyword(true)
      }
    })

    useEffect(() => {
      if (Object.keys(retriveMsg).length > 0) {
        setShowSpinner(true);
      }
    }, [retriveMsg])

    useEffect(() => {
      if (Object.keys(messages).length > 0) {
        document.getElementById('generate-rows').style.display = "";
        document.getElementById('show-error').style.display = "none";
      } else {
        document.getElementById('generate-rows').style.display = "none";
      }
    }, [messages])

    const addMessages = () => {
      setAddMessageValue(true);
      createInputMessages(inputValue);
      setInputValue({
        inputMsg: ''
    });
    }

    const submitFormMessage = (event) => {
      event.preventDefault();
      console.log("keywords....", keywords)
      setShowSpinner(true);
      if (parseInt(rowInput) <= 0 || parseInt(rowInput) > 100) {
        setShowSpinner(false);
        document.getElementById('show-error').style.display = "";
        return
      }
      document.getElementById('show-error').style.display = "none";
      if (Object.keys(messages).length > 0 && rowInput && dropDownValue) {
        submitFormData(messages, rowInput, dropDownValue, selectedTone, keywords);
      }
    }

    useEffect(()=>{
      console.log("retriveMsg from use effect",retriveMsg);
      console.log("message from use effect", messages);

      if (Object.keys(retriveMsg).length >0 && Object.keys(messages).length == 0){
          setShowSpinner(false);
      }
    },[retriveMsg, messages])

    const downloadFileEventHandler = () => {
      downloadFile();
    }
    useEffect(() => {
      if (downloadData !== undefined) {
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

    const onOptionClicked = (e) => {
      let targetValue = e.target.value;
      if (targetValue !== '') {
        setDisableInputBox(false);
        setDropDownValue(targetValue);
      } else {
        setDisableInputBox(true);
      }
    }

  function handleToneChange(event){
    setSelectedTone(event.target.value);
  }

    useEffect(() => {
      let topicValue = constant.topic.map(value => value.split(','));
      setTopic(topicValue[0]);
    }, constant.topic)

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
  
      <div className="form-inline">
        <select className="btn btn-success select-topic " onChange = {onOptionClicked}>
          <option  value="">Select Topic</option>
          { topic ? topic.map((topicValue, index) => (
              <option key={index}>
              {topicValue}
              </option>
          )) : ''}
          </select>
          <InputText size="250px" placeHolder="Add keywords.." onHandleChange={handleNewKeywordChange} onHandleClick={handleAddKeyword} value={newKeyword} disableInputBox={disableInputBox} plusBtnHide={plusBtnHideKeyword} />
      </div><br/>
          {/* <div className="form-group mx-sm-3 mb-2">
            <input type="text" disabled={disableInputBox} size="70" className="form-control" id="inputMsg" placeholder="Please enter message..." name="inputMsg" onChange={onChangeHandler} value={inputMsg} />
            <button type="button" disabled={plusBtnHide} id="plusBtn" className="btn btn-sm plus-btn" onClick={addMessages}>
              <span className="glyphicon glyphicon-plus"></span>
            </button>
          </div> */}
      
      <div className="form-inline">
      <InputText size="500px" placeHolder="Add Sample senetnces.." onHandleChange={onChangeHandler} onHandleClick={addMessages} value={inputMsg} disableInputBox={disableInputBox} plusBtnHide={plusBtnHide} />
      </div><br/>
      {showSpinner ? <div className='spinner'></div> : ''}
         
        {/* <div className="form-group mx-sm-3 mb-4">
            <input type="text" className="form-control"  placeholder="Add keywords..." name="keywords" onChange={handleNewKeywordChange} value={newKeyword} />
            <button type="button" id="plusBtn" className="btn btn-sm plus-btn" onClick={handleAddKeyword}>
              <span className="glyphicon glyphicon-plus"></span>
            </button>
        </div> */}
        
        <div className="tone">
          <label>
          <span className="tone__label_name">Tone:  </span>
            <input type="radio" name="tone" value="negative" checked={selectedTone === 'negative'} onChange={handleToneChange} />
            <span className="tone__label">Negative</span>
          </label>
          <label>
            <input type="radio" name="tone" value="neutral" checked={selectedTone === 'neutral'} onChange={handleToneChange} />
            <span className="tone__label">Neutral</span>
          </label>
          <label>
            <input type="radio" name="tone" value="positive" checked={selectedTone === 'positive'} onChange={handleToneChange} />
            <span className="tone__label">Positive</span>
          </label>
        </div> <br/>

      <div id='generate-rows' className='generate-rows'><p className='generate-para'>Generate rows: </p><input type="number" className="number" id="number" onChange={onChangeRowHandler} value={rowInput}></input><p id='show-error' style={{color: "red", left: "23px", top: "2px", position: "relative"}}>Choose between 1 to 100</p></div>
        {/* <button type="submit" className="btn btn-primary mb-2 submit-btn">Submit</button> */}
      
      <form className="form-inline" onSubmit={submitFormMessage}>
      <button type="submit" class="long-button">Generate sentence</button>
      </form><br/><br/>
     
      
      <div className='form-inline'>
      {(Object.keys(keywords).length > 0) && <span className="tone__label_name">Keywords:  </span>}
      <ul style={{listStyle: 'none', margin: 0, padding: 0}}>
        {keywords.map((keyword, index) => (
          <li key={index} style={{display: 'inline-block', margin: '0 5px', padding: '4px 8px', backgroundColor: 'white', borderRadius: '8px'}}>
            {keyword}
          </li>
        ))}
      </ul>
      </div>
      <div className="row row-css">
        <div className="col-lg-6 message-input">
          {addMessageValue && <InputMessages /> }
        </div>
      </div>
      {(Object.keys(retriveMsg).length > 0) && <div className="row download-row">
        <div className="col-lg-6 download-col">
          <p className='download-para'>Please download your file: </p><button onClick={downloadFileEventHandler} type="button" className="btn btn-success download-btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/></svg></button>
        </div>
      </div>}
       {
            retriveMsg.map((row, index) => {
                return<div key={index} style=
                {{backgroundColor: '#f2f2f2', padding: '10px', marginBottom: '5px'}}>{row}</div>
            })
        }
    </div>
    </div>
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
  
export default connect(mapStateToProps, { downloadDataEmpty, createInputMessages, submitFormData, downloadFile })(MesagesUI);
