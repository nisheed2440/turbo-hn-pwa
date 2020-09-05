const ejs = require('ejs');
const { client } = require('./utils/contentful');
const headers = require('./utils/headers');


const bannerTemplate = ejs.compile(`
<section class="jumbotron text-center">
    <div class="container">
        <h1><%- title %></h1>
        <p class="lead text-muted"><%- subtitle %></p>
        <% if (hasCta) { %>
            <p>
                <a href="<%- ctaUrl %>" class="btn btn-primary my-2"><%- ctaLabel %></a>
            </p>
        <% } %>
    </div>
</section>
`);

exports.handler = async function (event, context, callback) {
    const { queryStringParameters } = event;
    const { bannerId } = queryStringParameters;
    try {
		const data = await client.getEntries({
            content_type: 'banner',
            'sys.id': bannerId,
        });
        console.log(data);
		return {
			statusCode: 200,
			headers,
			body: bannerTemplate(data.items[0].fields),
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
