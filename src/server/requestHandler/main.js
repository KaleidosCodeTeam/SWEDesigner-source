/**
 *	@file Contiene lo script di inizializzazione del lato server della Single Page Application
 *	@author Bonato Enrico - KaleidosCode
 *
 *  @requires express
 *  @requires fs
 *  requires multer
 *  @requires ./requestHandler.js
 */

var express	        = require("express");
var fs              = require("fs");
var requestHandler  = require('./requestHandler.js');

var app	            =	express();
var path            = require('path');
//app.use(express.static('../../webapp'));

var bodyParser = require('body-parser')

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

app.get('/',function(req,res){
    requestHandler.getIndex(req,res);
});

app.get('/caricaJs',function(req,res){
    requestHandler.caricaJs(req,res);
   /*console.log(req.query.project);
   console.log('=========================================================================');
   console.log('query (STRINGIFY): ' + JSON.stringify(req.query));
   var query = JSON.stringify(req.query);
   console.log(query);
   console.log('params: ' + JSON.stringify(req.params));
   console.log('body: ' + JSON.stringify(req.body));
   console.log('query: ' + JSON.stringify(req.query));
   res.header('Content-type','application/json');
   res.header('Charset','utf8');
   res.jsonp(JSON.stringify(query));*/
});

app.get('/caricaJa',function(req,res){
   requestHandler.caricaJa(req,res);
   /*console.log(req.query.project);
   console.log('=========================================================================');
   console.log('query (STRINGIFY): ' + JSON.stringify(req.query));
   var query = JSON.stringify(req.query);
   console.log(query);
   console.log('params: ' + JSON.stringify(req.params));
   console.log('body: ' + JSON.stringify(req.body));
   console.log('query: ' + JSON.stringify(req.query));
   res.header('Content-type','application/json');
   res.header('Charset','utf8');
   res.jsonp(JSON.stringify(query));*/
});

app.post('/caricaJs',function(req,res){
    //requestHandler.caricaJs(req,res);
   requestHandler.caricaJs(req,res);
   /*console.log('=========================================================================');
   console.log("app.post");
   console.log('params: ' + JSON.stringify(req.params));
   console.log('body: ' + JSON.stringify(req.body));
   console.log('query: ' + JSON.stringify(req.query));
   res.header('Access-Control-Allow-Origin: http://localhost');
   res.header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
   res.header('Access-Control-Max-Age: 1000');
   res.header('Access-Control-Allow-Headers: Content-Type');
   res.header('Content-type','application/json');
   res.header('Charset','utf8');
   res.send(req.body);*/
});

app.post('/caricaJa',function(req,res){
   requestHandler.caricaJa(req,res);
   /*console.log('=========================================================================');
   console.log("app.post");
   console.log('params: ' + JSON.stringify(req.params));
   console.log('body: ' + JSON.stringify(req.body));
   console.log('query: ' + JSON.stringify(req.query));
   res.header('Access-Control-Allow-Origin: http://localhost');
   res.header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
   res.header('Access-Control-Max-Age: 1000');
   res.header('Access-Control-Allow-Headers: Content-Type');
   res.header('Content-type','application/json');
   res.header('Charset','utf8');
   res.send(req.body);*/
});

app.get('/scarica/:response',function(req,res){
    requestHandler.scarica(res,req);
});

app.get('/getBubble/:linguaggio/:nome',function(req,res){
    var linguaggio = req.params.linguaggio;
    var nome = req.params.nome;	
    if(linguaggio&&nome){
        requestHandler.getBubble(linguaggio,nome,function(bubble){
            if(bubble){
                res.send(JSONfn.stringify(bubble));
            }
            else{
                console.log("errore ottenimento bubble");       
            }
        });
    }
    else{
        requestHandler.getAllBubbles(function(bubble){
            res.send(JSONfn.stringify(bubble));         
        }); 

    }
});

app.listen(3000,function(){
    console.log("requestHandler avviato correttamente sulla porta 3000");
});
