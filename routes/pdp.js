var express = require('express');
var router = express.Router();

/* GET product details. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PDP', pageData: `
    <esi:include src="${process.env.BASE_URL}/header" />
    <div class="container" data-controller="PDP"></div>
    <esi:include src="${process.env.BASE_URL}/footer" />
  ` });
});

module.exports = router;
