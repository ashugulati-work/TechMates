import React, {useEffect, useImperativeHandle, useState} from 'react'
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
      const [isDisabled, setIsDisabled] = useState(true)

      useImperativeHandle(ref, () => ({
         setText(data) {
            console.log('🚀 ~ file: InputText.jsx:25 ~ setText ~ data:', data)
            setInput(data)
         },

         getInput() {
            return input
         }
      }))

      const onChangeHandler = (e) => {
         setInput(e.target.value)
      }

      useEffect(() => {
         if (input?.length !== 0 && !disableInputBox) {
            setIsDisabled(false)
         } else {
            setIsDisabled(true)
         }
      }, [input, disableInputBox])

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
               className="inputText"
            />
            {!isEditable && (
               <Button
                  disabled={isDisabled}
                  sx={{right: '5px', height: '30px', width: '32px', minWidth: '32px'}}
                  id="plusBtn"
                  className="btn btn-sm plus-btn position-absolute"
                  onClick={onAdd}>
                  <span style={{fontSize: '15px'}} className="glyphicon glyphicon-plus"></span>
               </Button>
            )}

            {isEditable && (
               <Button
                  disabled={isDisabled}
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
