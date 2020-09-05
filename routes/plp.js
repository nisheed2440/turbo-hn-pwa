var express = require('express');
var router = express.Router();

/* GET product listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PLP', pageData: `
    <esi:include src="http://localhost:9000/header" />
    <div class="container" data-controller="PLP"></div>
    <esi:include src="http://localhost:9000/footer" />
  ` });
});

module.exports = router;
