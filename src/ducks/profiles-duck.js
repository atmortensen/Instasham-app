import axios from 'axios'
import {LoginManager, AccessToken} from 'react-native-fbsdk'
import {Alert, AsyncStorage} from 'react-native'
import myAxios from '../my-axios'

const SET_PROFILE = 'login/SET_PROFILE'
const SET_TOKEN = 'login/SET_TOKEN'
const LOADING = 'login/LOADING'
const INVALID_TOKEN = 'login/INVALID_TOKEN'
const LOGOUT = 'login/LOGOUT'

const initialState = {
	profile: null,
	loading: false,
	token: ''
}

export default (state = initialState, action) => {
	switch (action.type){
		case SET_PROFILE:
			return Object.assign({}, state, {profile: action.profile, loading: false})
		case SET_TOKEN:
			return Object.assign({}, state, {token: action.token})
		case LOGOUT:
			AsyncStorage.removeItem('token')
			return Object.assign({}, state, {profile: null, token: ''})
		case LOADING:
			return Object.assign({}, state, {loading: true})
		case INVALID_TOKEN:
			AsyncStorage.removeItem('token')
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
						type: SET_TOKEN,
						token: response.accessToken
					})
					AsyncStorage.setItem('token', response.accessToken)
					axios.get(`https://graph.facebook.com/me?fields=id,name,picture.type(large)&access_token=${response.accessToken}`)
					.then(response => {
						// Find or create user in db
						myAxios().post('/profiles/login', response.data).then((response) => {
							dispatch({
								type: SET_PROFILE,
								profile: response.data
							})
						}).catch(()=>dispatch({type: INVALID_TOKEN}))
					}).catch(()=>dispatch({type: INVALID_TOKEN}))
				}).catch(()=>dispatch({type: INVALID_TOKEN}))
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
					type: SET_TOKEN,
					token
				})
				// Use token to get facebook profile
				axios.get(`https://graph.facebook.com/me?fields=id,name,picture.type(large)&access_token=${token}`)
				.then(response => {
					// Find or create user in db
					myAxios().post('/profiles/login', response.data).then((response) => {
						dispatch({
							type: SET_PROFILE,
							profile: response.data
						})
					}).catch(()=>dispatch({type: INVALID_TOKEN}))
				}).catch(()=>dispatch({type: INVALID_TOKEN}))
			}	else {
				dispatch({type: INVALID_TOKEN})
			}
		})
	}
}
