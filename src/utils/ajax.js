import axios from 'axios'

const service = axios.create({
	baseURL: 'https://cnodejs.org/api/v1',
	timeout: 10000
})

export default {
	post (url, data) {
		return service({
			url,
			data,
			method: 'post'
		})
	},
	get (url, params) {
		return service({
			url,
			params,
			method: 'get'
		})
	}
}