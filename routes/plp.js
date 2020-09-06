var express = require('express');
var router = express.Router();

/* GET product listing. */
router.get('/:id', function(req, res, next) {
  res.render('index', { title: 'PLP', pageData: `
    <esi:include src="http://localhost:9000/header" />
    <esi:include src="http://localhost:9000/plp?id=${req.params.id}" />
    <esi:include src="http://localhost:9000/footer" />
  ` });
});

module.exports = router;
