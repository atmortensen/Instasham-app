import myAxios from '../my-axios'
import {AsyncStorage} from 'react-native'

let token
AsyncStorage.getItem('token').then(t => token = t)

const GET_USERS = 'users/GET_USERS'
const GET_USER = 'users/GET_USER'

const initialState = {
	users: [],
	selectedUser: {}
}

export default (state = initialState, action) => {
	switch (action.type){
		case GET_USERS:
			return Object.assign({}, state, {users: action.users})
		case GET_USER:
			return Object.assign({}, state, {selectedUser: action.user})
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

export function getUser(id){
	return dispatch => {
		myAxios(token).get('/users/findOne/' + id).then(response => {
			dispatch({
				type: GET_USER,
				user: response.data
			})
		})
	}
}
