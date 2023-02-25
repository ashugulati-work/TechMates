import {configureStore} from '@reduxjs/toolkit'
import dataReducer from '../app/features/dataSlice'

export const store = configureStore({
   reducer: {
      data: dataReducer
   }
})
