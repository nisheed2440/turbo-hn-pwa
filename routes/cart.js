var express = require('express');
var router = express.Router();

/* GET product details. */
router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'Cart',
		pageData: `
    <esi:include src="${process.env.BASE_URL}/header" />
    <esi:include src="${process.env.BASE_URL}/cart" />
    <esi:include src="${process.env.BASE_URL}/footer" />
  `,
	});
});

module.exports = router;
