var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Homepage', pageData: `
      <esi:include src="${process.env.BASE_URL}/header" />
      <esi:include src="${process.env.BASE_URL}/banner?bannerId=4r9fAMPBG4C0OtMj9SwFDE" />
      <esi:include src="${process.env.BASE_URL}/categories" />
      <esi:include src="${process.env.BASE_URL}/footer" />
  ` });
});

module.exports = router;
