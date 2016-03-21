var express = require('express');
var router = express.Router();
var DB = require('../DB/db');

router.get('/get', function(req, res, next) {
	var messages = DB.getMessage();
	res.send({
		status: 0,
		body: messages
	});
})

router.post('/post', function(req, res, next) {
	DB.save(req.body.name, req.body.message);
	res.send({
		status: 0,
		body: 'ok'
	});
})

module.exports = router;