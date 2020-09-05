const ejs = require('ejs');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const { client } = require('./utils/contentful');
const headers = require('./utils/headers');

const categoryTemplate = ejs.compile(`
<div class="container">
    <div class="row">
        <% items.forEach(function(item){ %>
            <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="<%- item.label %>"><title><%- item.label %></title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em"><%- item.label %></text></svg>
                    <div class="card-body">
                    <p class="card-text"><%- item.description %></p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <a href="<%- item.url %>" class="btn btn-sm btn-outline-secondary">View</a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        <% }); %>
    </div>
</div>
`);

/**
 * Function to get category data
 * @param {object} data 
 */
const parsedCategoryData = (data) => {
	return {
		items: data.items.map((item) => {
			const { description, ...rest } = item.fields;
			return {
				...rest,
				description: documentToHtmlString(description),
			};
		}),
	};
};

exports.handler = async function (event, context) {
	try {
		const data = await client.getEntries({
			content_type: 'navLink',
		});
		return {
			headers,
			statusCode: 200,
			body: categoryTemplate(parsedCategoryData(data)),
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
