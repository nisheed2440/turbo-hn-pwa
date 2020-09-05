const ejs = require('ejs');
const { client } = require('./utils/contentful');
const headers = require('./utils/headers');

const footerTemplate = ejs.compile(`
<footer class="footer mt-auto py-3">
    <div class="container">
    <span class="text-muted"><%- footerText %></span>
    </div>
</footer>
`);

exports.handler = async function (event, context) {
	try {
		const data = await client.getEntries({
			content_type: 'footer',
		});
		return {
			statusCode: 200,
			headers,
			body: footerTemplate(data.items[0].fields),
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
