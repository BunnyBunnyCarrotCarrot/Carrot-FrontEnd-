import axios from 'axios';

const api = axios.create({
	baseURL: 'apis',
	headers: {
		'content-type': 'application/json;charset=UTF-8',
		accept: 'application/json,',
	},
});

api.interceptors.request.use(function (config) {
	const accessToken = document.cookie.split('=')[1];
	config.headers.common['X-AUTH-TOKEN'] = `${accessToken}`; //TOKEN 종류 입력
	return config;
});

export const apis = {
	// item
	add: (data) => api.post('/api/item', data),
	edit: (itemId, data) => api.put(`api/item/${itemId}/update`, data),
	del: (itemId) => api.delete(`api/item/${itemId}`),
	itemsLoad: () => api.get('/api/main'),
	itemIdLoad: (itemId) => api.get(`/api/item/${itemId}`),

};