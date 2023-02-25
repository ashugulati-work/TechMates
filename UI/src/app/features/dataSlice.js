import {createSlice} from '@reduxjs/toolkit'
import {getSentencesData} from './getData'

const initialState = {
   API_KEY: '',
   form: {
      topics: [],
      keyword: '',
      sentence: ''
   },
   formData: {
      no_of_sentences: 5,
      sentences: [],
      topic: '',
      tone: 'neutral',
      keywords: []
   },
   getInputMsg: [],
   retriveMsg: [],
   downloadData: undefined,
   showOutput: false,
   isLoading: false,
   error: null
}

export const dataSlice = createSlice({
   name: 'data',
   initialState,
   reducers: {
      setForm: (state, action) => {
         state[action.payload.name] = action.payload.value
      },
      setAPIKey: (state, action) => {
         state.API_KEY = action.payload
      },
      setSentencesCount: (state, action) => {
         state.formData.no_of_sentences = action.payload
      },
      setSentences: (state, action) => {
         state.formData.sentences.push(action.payload)
      },
      deleteSentence: (state, action) => {
         const indexToDelete = action.payload
         state.formData.sentences.splice(indexToDelete, 1)
      },
      setTopicValue: (state, action) => {
         state.formData.topic = action.payload
      },
      setTone: (state, action) => {
         state.formData.tone = action.payload
      },
      setKeywords: (state, action) => {
         state.formData.keywords.push(action.payload)
      },
      reset: (state) => initialState
   },
   extraReducers: (builder) => {
      builder.addCase(getSentencesData.pending, (state, action) => {
         console.log('Pending')
         state.formData = initialState.formData
         state.error = initialState.error
         state.isLoading = true
      })
      builder.addCase(getSentencesData.fulfilled, (state, action) => {
         state.isLoading = false
         state.retriveMsg = action.payload // Bcoz we are getting array of object
         state.error = initialState.error
      })
      builder.addCase(getSentencesData.rejected, (state, action) => {
         const {error} = action.payload
         if (error?.type === 'newRequest') {
            state.isLoading = true
         } else {
            state.isLoading = false
            state.error = error
         }
      })
   }
})

// Action creators are generated for each case reducer function
export const {
   setForm,
   setAPIKey,
   setSentencesCount,
   setSentences,
   deleteSentence,
   setTopicValue,
   setTone,
   setKeywords
} = dataSlice.actions

export default dataSlice.reducer
