import axios from 'axios'
import {createAsyncThunk} from '@reduxjs/toolkit'
import constant from '../../config.json'
const REQUEST_TIMEOUT = 3600
let cancelToken
export const getSentencesData = createAsyncThunk('data/getSentences', async (data, thunkAPI) => {
   console.log('🚀 ~ file: getData.js:7 ~ getSentencesData ~ data:', data)
   //Check if there are any previous pending requests
   //    if (typeof cancelToken != typeof undefined) {
   //       cancelToken.cancel('Operation canceled due to new request.')
   //    }
   //Save the cancel token for the current request
   //    cancelToken = axios.CancelToken.source()

   const url = `${constant.SERVER_HOST_AND_PORT}/api/sentences`
   //    const timeout = setTimeout(() => {
   //       // Cancelling Request due to time out.
   //       cancelToken.cancel('Request Time Out')
   //    }, REQUEST_TIMEOUT)

   try {
      //   const response = await axios.post(url, data, {cancelToken: cancelToken.token})
      const response = await axios.post(url, data)
      //   clearTimeout(timeout)
      console.log('Response', response.data)
      const sentences = response.data?.data
      return sentences
   } catch (error) {
      let errorBuilder

      if (error.message === 'Operation canceled due to new request.') {
         errorBuilder = {
            code: null,
            type: 'newRequest',
            title: 'Request Aborted',
            detail: 'Operation canceled due to new request.'
         }
      } else if (error.message === 'Network Error') {
         errorBuilder = {
            code: null,
            type: 'networkError',
            title: 'Network Error',
            detail: `Can't connect to IBM Network`
         }
      } else if (error.message === 'Connectors Not Found') {
         errorBuilder = {
            code: '001',
            type: 'utteranceError',
            title: 'Connectors Not Found',
            detail: 'Unable to find a flow.'
         }
      } else if (error.message === 'Bad Utterance') {
         errorBuilder = {
            code: '002',
            type: 'utteranceError',
            title: 'Bad Utterance',
            detail: 'Unable to find a flow.'
         }
      } else if (error.message === 'Request Time Out') {
         errorBuilder = {
            code: '408',
            type: 'Request Time Out',
            title: 'Request Time Out',
            detail: 'Request Time Out.'
         }
      }

      return error.response
         ? thunkAPI.rejectWithValue({error: error.response.data})
         : thunkAPI.rejectWithValue({error: errorBuilder})
   }
})
