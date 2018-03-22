export const config = () => ({
	options: {
		mode: 'cors',
		headers: { 'Content-Type': 'application/json' }
	},
	base: process.env.NODE_ENV === 'production'
		? 'https://api.ryaposov.com' : 'https://api.ryaposov.com'
});

// Basic wrapper around fetch()
export default (url, options = {}) => {
	let fullResponse;
	let configuration = {};

	configuration = Object.assign({}, config().options, options);

	return fetch(config().base + url, configuration)
		.then(response => {
			fullResponse = response;
			return response.json()
		})
		.then(response => ({
			response: fullResponse,
			body: response
		}))
		.catch(err => {
			throw err;
		})
};
