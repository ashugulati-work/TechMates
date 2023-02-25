import React, { useEffect, useImperativeHandle, useState } from 'react';
import '../styles/styles.css';
import {Tooltip} from 'react-tooltip';

const InputText = React.forwardRef((props, ref) => {
  const [input, setInput] = useState('');
  const [plusBtnHideKeyword, setPlusBtnHideKeyword] = useState(true);

  useImperativeHandle(ref, () => ({
    setText(data) {
      setInput(data);
    },

    getInput() {
      return input;
    },
  }));

  const onChangeHandler = (e) => {
    setPlusBtnHideKeyword(false);
    setInput(e.target.value);
  };

  return (
    <div className="d-flex align-items-center">
      <input
        type="text"
        disabled={props.disableInputBox}
        className="form-control"
        id="inputMsg"
        placeholder={props.placeHolder}
        name="inputMsg"
        onChange={onChangeHandler}
        value={input}
        data-tooltip-id={props.tooltipId}
        data-tooltip-html={props.tooltipContent}
        data-tooltip-place="top"
        data-tooltip-position-strategy= "fixed"
      //   data-tooltip-float = "true"
      />
      <button
        type="button"
        disabled={plusBtnHideKeyword}
        id="plusBtn"
        className="btn btn-sm plus-btn"
        onClick={props.onAdd}
      >
        <span className="glyphicon glyphicon-plus"></span>
      </button>
      <Tooltip id={props.tooltipId}/>
    </div>
  );
});

export default InputText;
