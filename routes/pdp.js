var express = require('express');
var router = express.Router();

/* GET product details. */
router.get('/:id', function(req, res, next) {
  res.render('index', { title: 'PDP', pageData: `
    <esi:include src="${process.env.BASE_URL}/header" />
    <esi:include src="${process.env.BASE_URL}/pdp?sku=${req.params.id}" />
    <esi:include src="${process.env.BASE_URL}/footer" />
  ` });
});

module.exports = router;
