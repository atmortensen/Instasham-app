import axios from 'axios'

let baseURL = 'https://graph.facebook.com'

let Axios = function(){
	return axios.create({
	  baseURL: baseURL,
	})
}

export default Axios 