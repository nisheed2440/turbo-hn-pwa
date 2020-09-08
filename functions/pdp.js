const ejs = require('ejs');
const { client } = require('./utils/contentful');
const headers = require('./utils/headers');

const pdpTemplate = ejs.compile(`
<div class="container" data-controller="pdp">
    <div class="row">
        <div class="col-md-6">
            <div class="card">
                <img src="<%- imageUrl %>" class="card-img-top" alt="<%- label %>">
            </div>
        </div>
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <h3><%- label %></h3>
                    <p><%- description %></p>
                    <button id="<%- id %>" data-sku="<%- sku %>" class="btn btn-primary add-to-cart-btn">Add To Cart</button>
                </div>
            </div>
        </div>
    </div>
</div>
`);

/**
 * Function to get category data
 * @param {object} data 
 */
const parsedProductData = (data) => {
	return {
        id: data.items[0].sys.id,
        ...data.items[0].fields
	};
};

exports.handler = async function (event, context) {
	try {
        const { queryStringParameters } = event;
        const { sku } = queryStringParameters;
		const data = await client.getEntries({
            content_type: 'product',
            include: 2,
            'fields.sku': sku
        });
        console.log(JSON.stringify(data));
		return {
			headers,
			statusCode: 200,
			body: pdpTemplate(parsedProductData(data)),
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
