import {Card, CardContent} from '@mui/material'
import React from 'react'
import InputMessages from './InputMessages'
import RowText from './RowText'

const Result = ({retriveMsg, sentences, isLoading, keywords}) => {
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

   return (
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
                  <div className="spinner"></div>
                  <RowText index="1" row="In Progress" />
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
   )
}

export default Result
