import React, { Fragment, useEffect, useState, useRef } from 'react';
import '../styles/styles.css';
import { connect } from "react-redux";
import InputMessages from './InputMessages';
import InputText from './InputText';
import RowText from './RowText';
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
      // setKeywords([])
      setShowSpinner(true);
    
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
      
        const data = downloadData["data"];
        const csvContent = "data:text/csv;charset=utf-8," + data.join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
        <h3 style={{color: 'white'}}>SynthAI</h3>
      </nav>
      </div>

      <div className="row row-css">
      <div className="col-sm msg-box">
  
      <div className="form-inline">
        <select className="btn select-topic" style={{border: '1px solid #ccc'}} onChange = {onOptionClicked}>
          <option  value="">Select Topic</option>
          { topic ? topic.map((topicValue, index) => (
              <option key={index}>
              {topicValue}
              </option>
          )) : ''}
          </select>
          <InputText size="250px" placeHolder="Add keywords.." onHandleChange={handleNewKeywordChange} onHandleClick={handleAddKeyword} value={newKeyword} disableInputBox={disableInputBox} plusBtnHide={plusBtnHideKeyword} />
      </div><br/>
      
      <div className="form-inline">
      <InputText size="500px" placeHolder="Add sample sentences.." onHandleChange={onChangeHandler} onHandleClick={addMessages} value={inputMsg} disableInputBox={disableInputBox} plusBtnHide={plusBtnHide} />
      </div><br/>
      {/* {showSpinner ? <div className='spinner'></div> : ''} */}
        
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

      
      <div id='generate-rows' >
        <div className='input-range' style={{display: 'flex'}}>
        <label className="tone__label_name">Generate Rows:  </label>
        <input style={{width: '15%'}} type="range" min="1" max="100" className="slider" onChange={onChangeRowHandler} value={rowInput} id="myRange" />
        <input type="text" style={{width: '5%'}} disabled className="form-control range-value" value={rowInput} />
      </div><br/>
      </div>
      <form className="form-inline" onSubmit={submitFormMessage}>
      <button type="submit" class="long-button" style={{color: 'white'}}>Generate sentences</button>
      </form><br/><br/>
     
      
      <div className='form-inline'>
      {(Object.keys(keywords).length > 0) && <span className="tone__label_name">Keywords:  </span>}
      <ul style={{listStyle: 'none', margin: 0, padding: 0}}>
        {keywords.map((keyword, index) => (
          <li key={index} className="row-element" style={{display: 'inline-block', margin: '0 5px', padding: '4px 8px', borderRadius: '8px'}}>
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
          <p className='download-para'>Please download your file: </p><button onClick={downloadFileEventHandler} type="button" className="btn download-btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/></svg></button>
        </div>
      </div>}
      {showSpinner && <> <RowText index='1' row="In Progress"/><div className='spinner'></div>
      <RowText index='2' row="Generating Sentences...." /></>}
       {
            retriveMsg.map((row, index) => {
                return <RowText index={index} row={row} keywords={keywords}/>
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
