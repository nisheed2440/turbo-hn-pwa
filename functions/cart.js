const ejs = require('ejs');
const axios = require('axios').default;
const { client } = require('./utils/contentful');
const headers = require('./utils/headers');

const cartTemplate = ejs.compile(`
<div class="container" data-controller="cart">
    <div class="card">
        <div class="card-header bg-dark text-light">
             Shipping cart
             &nbsp;
             <a href="/" class="btn btn-outline-info btn-sm pull-right">Continue shopping</a>
             <div class="clearfix"></div>
        </div>
        <div class="card-body">
            <% if (!items.length) { %>
                <h3 class="text-center">
                   Cart Empty
                </h3>
            <% } %>
            <% items.forEach(function(item){ %>   
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-2 text-center">
                            <img class="img-responsive" src="<%- item.imageUrl %>" alt="prewiew" width="120" >
                    </div>
                    <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
                        <h4 class="product-name"><strong><%- item.label %></strong></h4>
                        <h4>
                            <small>SKU: <%- item.sku %></small>
                        </h4>
                    </div>
                    <div class="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                        <div class="col-3 col-sm-3 col-md-6 text-md-right" style="padding-top: 5px">
                            <h6><strong>Count: <%- item.count %></strong></h6>
                        </div>
                        <div class="col-2 col-sm-2 col-md-2 text-right">
                            <button id="<%- item.id %>" type="button" class="btn btn-outline-danger btn-xs remove-item-cart-btn" data-sku="<%- item.sku %>">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
                <hr>
            <% }); %>
        </div>
    </div>
</div>
`);

const parseCartData = (cartData, cartObj) => {
    return {
        items: cartData.items.map((item) => {
            return {
                id: item.sys.id,
                ...item.fields,
                count: cartObj[item.fields.sku],
            };
        }),
    };
};

exports.handler = async function (event, context) {
    console.log(process.env.BASE_URL);
	try {
        const response = await axios.get(`${process.env.BASE_URL}/add-to-cart`);
        const { cartObj } = response.data;
        const cartData = await client.getEntries({
            content_type: 'product',
            include: 2,
            'fields.sku[in]': Object.keys(cartObj).join(','),
        });
        const parsedCartData = parseCartData(cartData, cartObj);
        console.log(parsedCartData);
		return {
			headers,
			statusCode: 200,
			body: cartTemplate(parsedCartData),
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