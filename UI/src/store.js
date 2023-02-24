import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import combineReducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const initialState = {}
const middleware = [thunk]

export const store = createStore(
   combineReducers,
   initialState,
   composeEnhancers(applyMiddleware(...middleware))
)
