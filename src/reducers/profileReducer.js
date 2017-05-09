import axios from 'axios'
import {LoginManager, AccessToken} from 'react-native-fbsdk'
import {Alert, AsyncStorage} from 'react-native'
import myAxios from '../my-axios'

const SETPROFILE = 'login/SETPROFILE'
const SETTOKEN = 'login/SETTOKEN'
const LOADING = 'login/LOADING'
const DONE_LOADING = 'login/DONE_LOADING'
const LOGOUT = 'login/LOGOUT'

const initialState = {
	profile: null,
	loading: false,
	token: ''
}

export default (state = initialState, action) => {
	switch (action.type){
		case SETPROFILE:
			return Object.assign({}, state, {profile: action.profile, loading: false})
		case SETTOKEN:
			return Object.assign({}, state, {token: action.token})
		case LOGOUT:
			return Object.assign({}, state, {profile: null, token: ''})
		case LOADING:
			return Object.assign({}, state, {loading: true})
		case DONE_LOADING:
			return Object.assign({}, state, {loading: false})
		default:
			return state
	}
}

export function login(){
	return dispatch => {
		dispatch({type: LOADING})
		// Login to FB
		LoginManager.logInWithReadPermissions(['public_profile']).then((response) => {
			if(response.grantedPermissions.length>0){
				// Get FB token
				AccessToken.getCurrentAccessToken().then(response => {
					// Save token and use it to get facebook profile
					dispatch({
						type: SETTOKEN,
						token: response.accessToken
					})
					AsyncStorage.setItem('token', response.accessToken)
					axios.get(`https://graph.facebook.com/me?fields=id,name,picture.type(large)&access_token=${response.accessToken}`)
					.then(response => {
						myAxios().post('/login', response.data).then((response) => {
							dispatch({
								type: SETPROFILE,
								profile: response.data
							})
						})
					})
				})
			} else {
				Alert.alert('Login unsuccessful!')
			}
		})
	}
}

export function logout(){
	return {
		type: LOGOUT
	}
}

export function checkToken(){
	return dispatch => {
		dispatch({type: LOADING})
		AsyncStorage.getItem('token').then(token => {
			if(token){
				dispatch({
					type: SETTOKEN,
					token
				})
				// Use token to get facebook profile
				axios.get(`https://graph.facebook.com/me?fields=id,name,picture.type(large)&access_token=${token}`)
				.then(response => {
					myAxios().post('/login', response.data).then((response) => {
						dispatch({
							type: SETPROFILE,
							profile: response.data
						})
					})
				}).catch(()=>dispatch({type: DONE_LOADING}))
			}	else {
				dispatch({type: DONE_LOADING})
			}
		})
	}
}
