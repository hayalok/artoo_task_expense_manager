var irc = require('irc');
var express = require('express');
var models = require('./models');

var routes = require('./routes/expense_routes');
var app = express();

app.use('/', routes);

models.sequelize.sync().then(function() {
  
  app.listen(3000, function () {
    console.log('webapp listening on port 3000.');
  });
});



var config = {
	channels: ["#yourhayalok"],
	server: "irc.freenode.net",
	botName: "hayalok20"
};


var client = new irc.Client(config.server, config.botName, {
	channels: config.channels
});



client.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);
	
	if (message.indexOf("@bot")!=-1){
		 var m1 = message.replace("@bot", "");
		 var eValue;
		 m1 = m1.trim();
		 var res = m1.split(" ");
		 for (var i in res) {
			if(!isNaN(res[i])){
				if(i == res.length-1){
					m1 = m1.replace(res[i], "");
				}else{
					m1 = m1.replace(res[i] + " ", "");
				}
				
				console.log("m1 after 2nd replace - "+m1);
				eValue = res[i]; 
				console.log("eval - "+eValue);
				break;
			}
			
		}
		var type = "";
		if(m1.indexOf("paid ") != -1){
			m1 = m1.replace("paid ", "");
			type = "paid";
		}else if(m1.indexOf("paid") != -1){
			m1 = m1.replace("paid", "");
			type = "paid";
		}else if(m1.indexOf("toget ") != -1){
			m1 = m1.replace("toget ", "");
			type = "toget";
		}else if(m1.indexOf("toget") != -1){
			m1 = m1.replace("toget", "");
			type = "toget";
		}
		m1 = m1.trim();
		
		if (type == ""){
			client.say('#yourhayalok',"Not a valid comment. Need transaction type as 'toget' or 'paid' ");
		} else{
			models.expense.create({
			username: from,
			value: parseInt(eValue),
			expense_info: m1,
			type: type
		}).then(function() {
		});
		client.say('#yourhayalok',"Transaction recorded as Username - "+ from +" type - "+ type+" Expense_Value - "+ eValue + " info - "+ m1);
		}
		console.log("Username - "+ from +" Expense_Value - "+ eValue +" type - "+ type+ " info - "+ m1);
		
	}
});
