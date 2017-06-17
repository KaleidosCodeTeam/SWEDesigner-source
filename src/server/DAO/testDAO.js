
var DAO = require('./DAO.js');
var express = require('express');

var dao = new DAO();
var app = express();

var result = function() {
	this.r = "X";
	this.setR = function(res) { this.r = res; }
	this.getR = function() { return this.r; }
}

var r = new result();

app.get('/', function (req, res) {
	var ris = "";
   dao.setConnection('sql11.freemysqlhosting.net', 'sql11180510', 'dvxPEVmife', 'sql11180510');
	dao.isPresentBubble("Pedone","Java",r);
	ris += r.getR() + "\n";
	//dao.insertBubble("Pedone","...codice...","Java", "codice per disegnare un pedone",res);
	dao.isPresentBubble("Pedone","Java",r);
	ris += r.getR() + "\n";
	dao.getAllBubbles(r);
	ris += r.getR() + "\n";
	dao.deleteBubble("Pedone","Java",r);
	ris += r.getR() + "\n";
	dao.getAllBubbles(r);
	ris += r.getR() + "\n";
	res.send(ris);
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});