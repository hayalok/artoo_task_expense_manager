var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/transaction/:user_id/:from/:to', function(req, res) {
  models.expense.findAll({
	where: {
		username: req.params.user_id,
		createdAt: {
			$lte: req.params.to,
			$gte: req.params.from
		}
	}	
  }).then(function(data) {
	  var paidTotal = 0;
	  var togetTotal = 0;
	  var netTotal = 0;
	  for (var i in data) {
		if (data[i].type == "paid"){
			paidTotal += data[i].value;
		}else if(data[i].type == "toget"){
			togetTotal += data[i].value
		}
	  }
	  netTotal = togetTotal - paidTotal;
	  var response = {
			"summary": {
				"Amount paid": paidTotal,
				"Amount to get": togetTotal,
				"Net Total": netTotal
			},
			"transactions": data
	  };
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(response));
  });
});

router.get('/transaction/:user_id', function(req, res) {
 models.expense.findAll({
	where: {
		username: req.params.user_id
	}	
 }).then(function(data) {
	  var paidTotal = 0;
	  var togetTotal = 0;
	  var netTotal = 0;
	  for (var i in data) {
		if (data[i].type == "paid"){
			paidTotal += data[i].value;
		}else if(data[i].type == "toget"){
			togetTotal += data[i].value
		}
	  }
	  netTotal = togetTotal - paidTotal;
	  var response = {
			"summary": {
				"Amount paid": paidTotal,
				"Amount to get": togetTotal,
				"Net Total": netTotal
			},
			"transactions": data
	  };
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(response));
  });
});

router.get('/all/total/:from/:to', function(req, res) {
 models.expense.findAll({
	where: {
		createdAt: {
			$lte: req.params.to,
			$gte: req.params.from
		}
	}	
 }).then(function(data) {
	 var summary = [];
	 var usernameArray = [];
	 for (var i in data){
	    if (usernameArray.indexOf(data[i].username) == -1 ){
			usernameArray.push(data[i].username);
			var currentUsername = data[i].username;
			var paidTotal=0;
			var togetTotal=0;
			for (var j in data){
				if(data[j].username == currentUsername){
					if(data[j].type == "paid"){
						paidTotal += data[j].value;
					}else if(data[j].type == "toget"){
						togetTotal += data[j].value;
					}
				}
			}
			var temp = {
				"Name": currentUsername,
				"Amount paid": paidTotal,
				"Amount to get": togetTotal,
				"Net total": togetTotal - paidTotal
			}
			summary.push(temp);
		}
	 
	 }
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(summary));
  });
 
});

router.get('/all/total', function(req, res) {
 models.expense.findAll({
	 
 }).then(function(data) {
	 var summary = [];
	 var usernameArray = [];
	 for (var i in data){
	    if (usernameArray.indexOf(data[i].username) == -1 ){
			usernameArray.push(data[i].username);
			var currentUsername = data[i].username;
			var paidTotal=0;
			var togetTotal=0;
			for (var j in data){
				if(data[j].username == currentUsername){
					if(data[j].type == "paid"){
						paidTotal += data[j].value;
					}else if(data[j].type == "toget"){
						togetTotal += data[j].value;
					}
				}
			}
			var temp = {
				"Name": currentUsername,
				"Amount paid": paidTotal,
				"Amount to get": togetTotal,
				"Net total": togetTotal - paidTotal
			}
			summary.push(temp);
		}
	 
	 }
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(summary));
  });
});

module.exports = router;