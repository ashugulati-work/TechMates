import React, {useImperativeHandle, useState} from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import '../styles/styles.css'

const InputText = React.forwardRef(
   (
      {
         placeHolder,
         disableInputBox,
         onAdd,
         type = 'text',
         id = 'inputBox',
         isEditable,
         handleBlur,
         onEdit
      },
      ref
   ) => {
      const [input, setInput] = useState('')
      const [plusBtnHideKeyword, setPlusBtnHideKeyword] = useState(true)

      useImperativeHandle(ref, () => ({
         setText(data) {
            setInput(data)
         },

         getInput() {
            return input
         }
      }))

      const onChangeHandler = (e) => {
         setPlusBtnHideKeyword(false)
         setInput(e.target.value)
      }
      return (
         <div className="d-flex align-items-center position-relative">
               <TextField
                  sx={{width: '100%'}}
                  size="small"
                  id={id}
                  type={type}
                  variant="outlined"
                  placeholder={placeHolder}
                  onBlur={handleBlur}
                  onChange={onChangeHandler}
                  value={input}
                  disabled={disableInputBox}
               />
            {/* <input
            type={type}
            disabled={disableInputBox}
            className="form-control"
            id="inputMsg"
            placeholder={placeHolder}
            value={input}
            onChange={onChangeHandler}
            name="inputMsg"
         /> */}
            {!isEditable && (
               <Button
                  disabled={plusBtnHideKeyword}
                  sx={{right: '5px', height: '30px', width: '32px', minWidth: '32px'}}
                  id="plusBtn"
                  className="btn btn-sm plus-btn position-absolute"
                  onClick={onAdd}>
                  <span style={{fontSize: '15px'}} className="glyphicon glyphicon-plus"></span>
               </Button>
            )}

            {isEditable && (
               <Button
                  disabled={plusBtnHideKeyword}
                  sx={{right: '5px', height: '30px', width: '32px', minWidth: '32px'}}
                  id="plusBtn"
                  className="btn btn-sm plus-btn position-absolute"
                  onClick={onEdit}>
                  <span style={{fontSize: '15px'}} className="glyphicon glyphicon-pencil"></span>
               </Button>
            )}
         </div>
      )
   }
)

export default InputText
