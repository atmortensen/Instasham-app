import axios from 'axios'

const myAxios = function(token){
	let auth = {}
	if(token){
		auth = {'Authorization': token}
	}
	return axios.create({
	  baseURL: 'http://192.168.1.128:3000',
	  // baseURL: 'https://instasham-server.herokuapp.com',
	  headers: auth
	})
}

export default myAxios