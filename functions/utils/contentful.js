const contentful = require('contentful');

/**
 * Creat contentful client
 */
const client = contentful.createClient({
	space: 'kbus1niv7yd5',
	accessToken: 'XJQxi6jhhUTY3V0ISfmo1Pbl93VUxCaLha3Gl5ZHcb0',
});

module.exports = {
    client,
};
