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
					<img src="<%- item.imageUrl %>" class="card-img-top" alt="<%- item.label %>">
					<div class="card-body">
					<h5 class="card-title"><%- item.label %></h5>
						<p class="card-text"><%- item.description %></p>
						<div class="d-flex justify-content-between align-items-center">
							<div class="btn-group">
								<a href="/plp/<%- item.id %>" class="btn btn-sm btn-outline-secondary">View</a>
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
            const { id } = item.sys;
			const { description, ...rest } = item.fields;
			return {
                id,
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
