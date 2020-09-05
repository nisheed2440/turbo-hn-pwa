var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Homepage', pageData: `
      <esi:include src="http://localhost:9000/header" />
      <esi:include src="http://localhost:9000/banner?bannerId=4r9fAMPBG4C0OtMj9SwFDE" />
      <esi:include src="http://localhost:9000/categories" />
      <esi:include src="http://localhost:9000/footer" />
  ` });
});

module.exports = router;
