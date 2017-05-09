import {createStore, applyMiddleware, combineReducers} from 'redux'
import profilesDuck from './ducks/profiles-duck'
import usersDuck from './ducks/users-duck'
import chatDuck from './ducks/chat-duck'
import thunk from 'redux-thunk'

export default createStore(
	combineReducers({ profilesDuck, usersDuck, chatDuck }), 
	applyMiddleware(thunk)
)
