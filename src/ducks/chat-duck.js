import myAxios from '../my-axios'
import {AsyncStorage} from 'react-native'

let token
AsyncStorage.getItem('token').then(t => token = t)

const SENT_MESSAGE = 'chat/SENT_MESSAGE'
const MESSAGES_RECEIVED = 'chat/MESSAGES_RECEIVED'

const initialState = {
	messages: {}
}

export default (state = initialState, action) => {
	switch (action.type){
		case SENT_MESSAGE:
			return state
		case MESSAGES_RECEIVED:
			return Object.assign({}, state, {messages: action.messages})
		default:
			return state
	}
}

export function newMessage(sender, receiver, message){
	return dispatch => {
		myAxios(token).post('/chat/message', {sender, receiver, message}).then(()=>{
			dispatch({
				type: SENT_MESSAGE
			})
		})
	}
}

export function getMessages(user1, user2){
	return dispatch => {
		myAxios(token).get(`/chat/messages/${user1}/${user2}`).then(response => {
			dispatch({
				type: MESSAGES_RECEIVED,
				messages: response.data
			})
		})
	}
}

