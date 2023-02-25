import React, {Fragment, useEffect, useRef, useState} from 'react'
import '../styles/styles.css'
import {useDispatch, useSelector} from 'react-redux'
import InputText from './InputText'
import constant from '../config.json'
import MainHeader from './MainHeader'
import InputTextSuggestion from './InputTextSuggestion'
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
   setTopicValue,
   resetData
} from '../app/features/dataSlice'
import ToneSelector from './ToneSelector'
import RowSlider from './RowSlider'
import {getSentencesData} from '../app/features/getData'
import {Button, Grid} from '@mui/material'
import TopicSelector from './TopicSelector'
import Result from './Result'
import AccordionWrapper from './AccordionWrapper'

const MesagesUI = () => {
   const {topics} = constant
   const dispatch = useDispatch()
   const sentenceInputRef = useRef()
   const keywordInputRef = useRef()
   const apiKeyInputRef = useRef()

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
         dispatch(setTopicValue(targetValue?.toLowerCase()))
      } else {
         setDisableInputBox(true)
         dispatch(setTopicValue(targetValue))
      }
   }

   const handleAddKeyword = () => {
      if (keywordInputRef.current.getInput()?.trim() !== '') {
         console.log(keywordInputRef.current?.getInput()?.trim())
         dispatch(setKeywords(keywordInputRef.current.getInput()?.trim()))
         keywordInputRef.current?.setText('')
      }
   }

   const handleAddSentences = () => {
      if (sentenceInputRef.current.getInput()?.trim() !== '') {
         console.log(sentenceInputRef.current?.getInput()?.trim())
         dispatch(setSentences(sentenceInputRef.current.getInput()?.trim()))
         sentenceInputRef.current?.setText('')
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
      if (validated()) {
         dispatch(getSentencesData({topic, tone, no_of_sentences, keywords, sentences, API_KEY}))
      }
   }

   const handleAPIKey = () => {
      if (apiKeyInputRef.current.getInput()?.length !== 0) {
         setIsDisabled(true)
      }
      if (apiKeyInputRef.current.getInput()?.trim() !== '') {
         dispatch(setAPIKey(apiKeyInputRef.current.getInput()?.trim()))
      }
   }

   const handleEdit = () => {
      setIsDisabled(false)
   }

   const validated = () => {
      if (
         topic &&
         tone &&
         no_of_sentences &&
         keywords?.length !== 0 &&
         sentences?.length !== 0 &&
         API_KEY
      ) {
         return true
      } else {
         return false
      }
   }

   useEffect(() => {
      validated()
   }, [topic, tone, no_of_sentences, keywords, sentences, API_KEY])

   const onResetData = (e) => {
      // apiKeyInputRef.current.setText('')
      keywordInputRef.current.setText('')
      sentenceInputRef.current.setText('')
      dispatch(resetData())
   }

   return (
      <Fragment>
         <MainHeader />
         <Box className="container-fluid" marginY="64px" maxWidth="85%">
            <div className="row">
               <div className="col-6">
                  <Card className="h-100">
                     <CardContent sx={{padding: '24px'}}>
                        <Stack gap={3}>
                           <div className="openai_key">
                              <AccordionWrapper>
                                 <InputText
                                    id="apikey-input"
                                    placeHolder="Place your API Key"
                                    type="password"
                                    onEdit={handleEdit}
                                    disableInputBox={isDisabled}
                                    ref={apiKeyInputRef}
                                    handleBlur={handleAPIKey}
                                    isEditable={true}
                                 />
                              </AccordionWrapper>

                              {/* <Grid container spacing={2} alignItems="center">
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
                                       ref={apiKeyInputRef}
                                       handleBlur={handleAPIKey}
                                       isEditable={true}
                                    />
                                 </Grid>
                              </Grid> */}
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
                                       ref={keywordInputRef}
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
                                    ref={sentenceInputRef}
                                    tooltipId="my-tooltip"
                                    tooltipContent="hello-world"
                                 />
                              </div>
                           </div>
                           <ToneSelector handleToneChange={handleToneChange} selectedTone={tone} />
                           <RowSlider
                              onChangeRowHandler={onChangeRowHandler}
                              no_of_sentences={no_of_sentences}
                           />

                           <Grid container spacing={2} alignItems="center">
                              <Grid item>
                                 <Button
                                    disabled={!validated()}
                                    onClick={submitFormData}
                                    variant="contained"
                                    sx={{fontSize: '14px'}}>
                                    Generate sentences
                                 </Button>
                              </Grid>
                              <Grid item md>
                                 <Button
                                    onClick={(e) => onResetData(e)}
                                    variant="outline"
                                    sx={{fontSize: '14px'}}>
                                    Reset
                                 </Button>
                              </Grid>
                           </Grid>

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
                  <Result
                     retriveMsg={retriveMsg}
                     sentences={sentences}
                     isLoading={isLoading}
                     keywords={keywords}
                     error={error}
                  />
               </div>
            </div>
         </Box>
      </Fragment>
   )
}

export default MesagesUI
