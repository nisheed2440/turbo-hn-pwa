var express = require('express');
var router = express.Router();

/* GET product details. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PDP', pageData: `
  <div data-controller="PDP"></div>
  <esi:include src="http://localhost:3000/" />
  ` });
});

module.exports = router;
