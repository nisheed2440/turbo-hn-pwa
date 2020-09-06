const ejs = require('ejs');
const axios = require('axios').default;
const { client } = require('./utils/contentful');
const headers = require('./utils/headers');

const miniCartTemplate = ejs.compile(`
<button type="button" class="btn btn-primary">
    Cart <span id="mini-cart-count" class="badge badge-light"><%- count %></span>
</button>
`);

exports.handler = async function (event, context) {
	try {
        const response = await axios.get('http://localhost:9000/add-to-cart');
		return {
			headers,
			statusCode: 200,
			body: miniCartTemplate(response.data),
		};
	} catch (e) {
		return {
			body: JSON.stringify({
				error: e.message,
			}),
			statusCode: 400,
		};
	}
};