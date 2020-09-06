const ejs = require('ejs');
const { client } = require('./utils/contentful');
const headers = require('./utils/headers');

const plpTemplate = ejs.compile(`
<section class="jumbotron text-center">
    <div class="container">
        <h1><%- label %></h1>
    </div>
</section>
<div class="container" data-controller="plp">
    <div class="row">
        <% items.forEach(function(item){ %>
            <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <img src="<%- item.imageUrl %>" class="card-img-top" alt="<%- item.label %>">
                    <div class="card-body">
                        <p class="card-text"><%- item.label %></p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <a href="<%- item.url %>" class="btn btn-sm btn-outline-secondary">View</a>
                                <button id="<%- item.id %>" data-sku="<%- item.sku %>" class="btn btn-sm btn-primary add-to-cart-btn">Add To Cart</a>
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
    const { label, subNavLinks } = data.items[0].fields;
	return {
        label,
		items: subNavLinks.map((item) => {
            const { id } = item.sys;
			return {
                id,
				...item.fields,
			};
		}),
	};
};

exports.handler = async function (event, context) {
	try {
        const { queryStringParameters } = event;
        const { id } = queryStringParameters;
		const data = await client.getEntries({
            content_type: 'navLink',
            include: 2,
            'sys.id': id
        });
		return {
			headers,
			statusCode: 200,
			body: plpTemplate(parsedCategoryData(data)),
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
