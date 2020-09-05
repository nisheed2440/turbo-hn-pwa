var express = require('express');
var router = express.Router();

/* GET product details. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PDP', pageData: `
    <esi:include src="http://localhost:9000/header" />
    <div class="container" data-controller="PDP"></div>
    <esi:include src="http://localhost:9000/footer" />
  ` });
});

module.exports = router;
