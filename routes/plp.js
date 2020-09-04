var express = require('express');
var router = express.Router();

/* GET product listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PLP', pageData: `
  <div data-controller="PLP"></div>
  <esi:include src="http://localhost:3000/" />
  ` });
});

module.exports = router;
