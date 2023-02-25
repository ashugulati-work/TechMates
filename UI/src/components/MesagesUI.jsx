import React, {Fragment, useRef, useState} from 'react'
import '../styles/styles.css'
import {useDispatch, useSelector} from 'react-redux'
import InputMessages from './InputMessages'
import InputText from './InputText'
import RowText from './RowText'
import constant from '../config.json'
import MainHeader from './MainHeader'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import CardContent from '@mui/material/CardContent'
import {
   setAPIKey,
   setKeywords,
   setSentences,
   setSentencesCount,
   setTone,
   setTopicValue
} from '../app/features/dataSlice'
import ToneSelector from './ToneSelector'
import RowSlider from './RowSlider'
import {getSentencesData} from '../app/features/getData'
import {Button, Grid, Typography} from '@mui/material'
import TopicSelector from './TopicSelector'

const MesagesUI = () => {
   const {topics} = constant
   const dispatch = useDispatch()
   const inputComponentRef = useRef()

   const {
      isLoading,
      error,
      API_KEY,
      retriveMsg,
      formData: {topic, tone, no_of_sentences, keywords, sentences}
   } = useSelector((state) => state.data)

   const [disableInputBox, setDisableInputBox] = useState(true)
   const [isDisabled, setIsDisabled] = useState(false)

   const onOptionSelected = (e) => {
      let targetValue = e.target.value
      if (targetValue !== '') {
         setDisableInputBox(false)
         // TODO: Look whether last value stays
         dispatch(setTopicValue(targetValue?.toLowerCase()))
      } else {
         setDisableInputBox(true)
      }
   }

   const handleAddKeyword = () => {
      if (inputComponentRef.current.getInput()?.trim() !== '') {
         console.log(inputComponentRef.current?.getInput()?.trim())
         dispatch(setKeywords(inputComponentRef.current.getInput()?.trim()))
         inputComponentRef.current?.setText('')
      }
   }

   const handleAddSentences = () => {
      if (inputComponentRef.current.getInput()?.trim() !== '') {
         console.log(inputComponentRef.current?.getInput()?.trim())
         dispatch(setSentences(inputComponentRef.current.getInput()?.trim()))
         inputComponentRef.current?.setText('')
      }
   }

   function handleToneChange(event) {
      dispatch(setTone(event.target.value))
   }

   const onChangeRowHandler = (event) => {
      const values = event.target.value
      dispatch(setSentencesCount(values))
   }

   const submitFormData = (event) => {
      event.preventDefault()
      dispatch(getSentencesData({topic, tone, no_of_sentences, keywords, sentences, API_KEY}))
      // dispatch(reset())
   }

   const downloadFileEventHandler = () => {
      const data = retriveMsg
      const csvContent = 'data:text/csv;charset=utf-8,' + data.join('\n')
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      link.setAttribute('download', `${topic}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
   }

   const handleAPIKey = () => {
      setIsDisabled(true)
      if (inputComponentRef.current.getInput()?.trim() !== '') {
         dispatch(setAPIKey(inputComponentRef.current.getInput()?.trim()))
      }
   }

   const handleEdit = () => {
      setIsDisabled(false)
   }

   return (
      <Fragment>
         <MainHeader />
         <Box className="container-fluid" marginY="64px" maxWidth="85%">
            <div className="row">
               <div className="col-6">
                  <Card>
                     <CardContent sx={{padding: '24px'}}>
                        <Stack gap={3}>
                           <div className="openai_key">
                              <Grid container spacing={2} alignItems="center">
                                 <Grid item alignContent="center">
                                    <Typography variant="h5" fontWeight="600">
                                       OpenAI API Key:
                                    </Typography>
                                 </Grid>
                                 <Grid item md>
                                    <InputText
                                       id="apikey-input"
                                       placeHolder="Place your API Key"
                                       type="password"
                                       onEdit={handleEdit}
                                       disableInputBox={isDisabled}
                                       ref={inputComponentRef}
                                       handleBlur={handleAPIKey}
                                       isEditable={true}
                                    />
                                 </Grid>
                              </Grid>
                           </div>
                           <div className="topic-selector">
                              <Grid container spacing={2} alignItems="center">
                                 <Grid item>
                                    <TopicSelector
                                       menuItems={topics}
                                       topic={topic}
                                       onOptionSelected={onOptionSelected}
                                    />
                                 </Grid>
                                 <Grid item md>
                                    <InputText
                                       id="keyword-input"
                                       placeHolder="Add keywords.."
                                       onAdd={handleAddKeyword}
                                       disableInputBox={disableInputBox}
                                       ref={inputComponentRef}
                                    />
                                 </Grid>
                              </Grid>
                           </div>
                           <div className="row">
                              <div className="col-12">
                                 <InputText
                                    id="sentence-input"
                                    placeHolder="Add sample sentences.."
                                    onAdd={handleAddSentences}
                                    disableInputBox={disableInputBox}
                                    ref={inputComponentRef}
                                 />
                              </div>
                           </div>
                           <ToneSelector handleToneChange={handleToneChange} selectedTone={tone} />
                           <RowSlider
                              onChangeRowHandler={onChangeRowHandler}
                              no_of_sentences={no_of_sentences}
                           />
                           <form className="form-inline" onSubmit={submitFormData}>
                              <Button type="submit" variant="contained" sx={{fontSize: '14px'}}>
                                 Generate sentences
                              </Button>
                           </form>
                           <div className="form-inline">
                              {Object.keys(keywords).length > 0 && (
                                 <span className="tone__label_name">Keywords: </span>
                              )}
                              <ul style={{listStyle: 'none', margin: 0, padding: 0}}>
                                 {keywords.map((keyword, index) => (
                                    <li
                                       key={index}
                                       className="row-element"
                                       style={{
                                          display: 'inline-block',
                                          margin: '0 5px',
                                          padding: '4px 8px',
                                          borderRadius: '8px'
                                       }}>
                                       {keyword}
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        </Stack>
                     </CardContent>
                  </Card>
               </div>
               <div className="col-6">
                  <Card className="h-100">
                     <CardContent sx={{padding: '24px'}}>
                        <div className="row row-css">
                           <div className="col-lg-6 message-input">
                              {sentences?.length !== 0 && <InputMessages />}
                           </div>
                        </div>

                        {retriveMsg.length > 0 && (
                           <div className="row download-row">
                              <div className="col-lg-6 download-col">
                                 <p className="download-para">Please download your file: </p>
                                 <button
                                    onClick={downloadFileEventHandler}
                                    type="button"
                                    className="btn download-btn-success">
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       width="16"
                                       height="16"
                                       fill="currentColor"
                                       className="bi bi-download"
                                       viewBox="0 0 16 16">
                                       <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                       <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                    </svg>
                                 </button>
                              </div>
                           </div>
                        )}
                        {isLoading && (
                           <>
                              <RowText index="1" row="In Progress" />
                              <div className="spinner"></div>
                              <RowText index="2" row="Generating Sentences...." />
                           </>
                        )}
                        {retriveMsg.length > 5
                           ? retriveMsg.slice(0, 5).map((sentence, index) => {
                                return <RowText index={index} row={sentence} keywords={keywords} />
                             })
                           : retriveMsg.map((sentence, index) => {
                                return <RowText index={index} row={sentence} keywords={keywords} />
                             })}
                     </CardContent>
                  </Card>
               </div>
            </div>
         </Box>
      </Fragment>
   )
}

export default MesagesUI
