var express = require('express');
var router = express.Router();

/* GET product listing. */
router.get('/:id', function(req, res, next) {
  res.render('index', { title: 'PLP', pageData: `
    <esi:include src="${process.env.BASE_URL}/header" />
    <esi:include src="${process.env.BASE_URL}/plp?id=${req.params.id}" />
    <esi:include src="${process.env.BASE_URL}/footer" />
  ` });
});

module.exports = router;
