const ejs = require('ejs');
const ESI = require('nodesi');
const { client } = require('./utils/contentful');
const headers = require('./utils/headers');

// Instance of the ESI class
const esi = new ESI({
    baseUrl: process.env.BASE_URL,
    cache: false,
});

/**
 * Nav Data
 * @param {object} data
 */
const parseNavData = (data) => {
	const { navData, ...rest } = data.items[0].fields;
	return { ...rest, navData: parsedSubNavData(navData) };
};

/**
 * Parsed sub nav data
 * @param {object} data
 */
const parsedSubNavData = (data) => {
	return data.map((item) => {
        const { id } = item.sys;
		const { subNavLinks, label, url, isExternal } = item.fields;
		if (subNavLinks) {
			return {
                id,
				label,
				url,
				isExternal,
				navData: parsedSubNavData(subNavLinks),
			};
		}
		return {
            id,
			label,
			url,
			isExternal,
		};
	});
};

const navTemplate = ejs.compile(`
<nav data-turbolinks-permanent class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand mr-0 mr-md-2" href="<%- url %>">
        <img width="60" src="<%- logoUrl %>" alt="<%- brandLabel %>"/>
    </a>
    <esi:include src="/mini-cart" />
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <% navData.forEach(function(data){ %>     
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="<%- data.id %>" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#"><%- data.label %></a>
                    <div class="dropdown-menu" aria-labelledby="<%- data.id %>">
                        <% data.navData.forEach(function(subNavData){ %>  
                            <a class="dropdown-item" href="<%- subNavData.url %>"><%- subNavData.label %></a>
                        <% }); %>
                    </div>
                </li>
            <% }); %>
        </ul>
    </div>
</nav>
`);

exports.handler = async function (event, context) {
	try {
		const data = await client.getEntries({
			content_type: 'mainNavigation',
			include: 5,
		});
        const navData = parseNavData(data);
        const esiData = await esi.process(navTemplate(navData));
		return {
			statusCode: 200,
			headers,
			body: esiData,
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
