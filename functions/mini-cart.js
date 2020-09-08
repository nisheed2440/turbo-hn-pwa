const ejs = require('ejs');
const axios = require('axios').default;
const { client } = require('./utils/contentful');
const headers = require('./utils/headers');

const miniCartTemplate = ejs.compile(`
<a href="/cart" class="btn btn-primary">
    Cart <span id="mini-cart-count" class="badge badge-light"><%- count %></span>
</a>
`);

exports.handler = async function (event, context) {
    console.log(process.env.BASE_URL);
	try {
        const response = await axios.get(`${process.env.BASE_URL}/add-to-cart`);
        console.log(miniCartTemplate(response.data));
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