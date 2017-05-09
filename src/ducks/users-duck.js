import myAxios from '../my-axios'
import {AsyncStorage} from 'react-native'

let token
AsyncStorage.getItem('token').then(t => token = t)

const GET_USERS = 'users/GET_USERS'

const initialState = {
	users: [],
	following: [],
	followers: []
}

export default (state = initialState, action) => {
	switch (action.type){
		case GET_USERS:
			return Object.assign({}, state, {users: action.users})
		default:
			return state
	}
}

export function getUsers(){
	return dispatch => {
		myAxios(token).get('/users/findAll').then(response => {
			dispatch({
				type: GET_USERS,
				users: response.data
			})
		})
	}
}

