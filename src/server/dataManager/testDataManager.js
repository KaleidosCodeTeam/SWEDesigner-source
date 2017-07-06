
var DataManager = require('./dataManager.js');
var express = require('express');

var dm = new DataManager();
var app = express();

var result = function() {
	this.r = "X";
	this.setR = function(res) { this.r = res; }
	this.getR = function() { return this.r; }
}

var r = new result();

app.get('/', function (req, res) {
	var ris = "";
   dm.setConnection('sql11.freemysqlhosting.net', 'sql11180510', 'dvxPEVmife', 'sql11180510');
	dm.isPresentBubble("Pedone","Java",r);
	ris += r.getR() + "\n";
	//dm.insertBubble("Pedone","...codice...","Java", "codice per disegnare un pedone",res);
	dm.isPresentBubble("Pedone","Java",r);
	ris += r.getR() + "\n";
	dm.getAllBubbles(r);
	ris += r.getR() + "\n";
	dm.deleteBubble("Pedone","Java",r);
	ris += r.getR() + "\n";
	dm.getAllBubbles(r);
	ris += r.getR() + "\n";
	res.send(ris);
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});