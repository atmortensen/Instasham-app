import {createStore, applyMiddleware, combineReducers} from 'redux'
import profileReducer from './reducers/profileReducer'
import thunk from 'redux-thunk'

export default createStore(
	combineReducers({profileReducer}), 
	applyMiddleware(thunk)
)
