import {Button, Card, CardContent, Grid, Typography} from '@mui/material'
import React from 'react'
import InputMessages from './InputMessages'
import RowText from './RowText'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import ErrorIcon from '@mui/icons-material/Error'

const Result = ({retriveMsg, sentences, isLoading, keywords, error}) => {
   const downloadFileEventHandler = () => {
      const data = retriveMsg
      const csvContent = 'data:text/csv;charset=utf-8,' + data.join('\n')
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      // console.log("topic file name", topic)
      link.setAttribute('download', 'data.csv')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
   }

   const ResultRenderer = () => {
      return (
         <>
            {retriveMsg.length > 5
               ? retriveMsg.slice(0, 5).map((sentence, index) => {
                    return <RowText index={index} row={sentence} keywords={keywords} />
                 })
               : retriveMsg.map((sentence, index) => {
                    return <RowText index={index} row={sentence} keywords={keywords} />
                 })}
         </>
      )
   }

   return (
      <Card className="h-100">
         <CardContent sx={{padding: '24px'}} className="h-100">
            {!error ? (
               <div id="result">
                  <div className="row row-css">
                     <div className="col-lg-6 message-input">
                        {sentences?.length !== 0 && <InputMessages />}
                     </div>
                  </div>

                  {retriveMsg.length > 0 && (
                     <Grid marginBottom="8px" container spacing={2} alignItems="center">
                        <Grid item alignContent="center">
                           <Typography variant="h5" fontWeight="600">
                              Please download your file:
                           </Typography>
                        </Grid>
                        <Grid item md>
                           <Button onClick={downloadFileEventHandler}>
                              <CloudDownloadIcon sx={{fontSize: '32px'}} />
                           </Button>
                        </Grid>
                     </Grid>
                  )}

                  {isLoading ? (
                     <>
                        <div className="spinner"></div>
                        <RowText index="1" row="In Progress" />
                        <RowText index="2" row="Generating Sentences...." />
                     </>
                  ) : (
                     <ResultRenderer />
                  )}
               </div>
            ) : (
               <div className="error h-100 w-100">
                  <div className="d-flex flex-column align-items-center justify-content-center h-100">
                     <div className="error-icon mb-4">
                        <ErrorIcon sx={{fontSize: '72px', color: '#fd5d5d'}} />
                     </div>
                     <Typography variant="h4" fontWeight="600" marginBottom="1rem">
                        {error?.error}
                     </Typography>
                     <Typography variant="body1" textAlign="center" fontSize="12px">
                        {error?.message}
                     </Typography>
                  </div>
               </div>
            )}
         </CardContent>
      </Card>
   )
}

export default Result
