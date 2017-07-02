/**
 *	@file Contiene main
 *	@author Bonato Enrico - KaleidosCode
 *
 *  requires express
 *  requires fs
 *  requires multer
 *
 */
var express	        =  require("express");
var fs              =  require("fs");
var requestHandler  =  require('./requestHandler.js');
/** @namespace */
var app	    =	express();
var path            =  require('path');
//app.use(express.static('../../webapp'));

/**
*	@public
*	@function come lo chiamo ???? app.get('/')
*	@summary Ritorna il file index.html della webapp.
*/
app.get('/',function(req,res){
    requestHandler.getIndex(req,res);
});

/**
*	@param {?string} err - Contiene l'eventuale stringa di errore.
*	@public
*	@function come sopra
*	@summary Permette di caricare il file json da convertire in codice javascript.
*/
app.get('/caricaJs',function(req,res){
    requestHandler.caricaJs(res,req);
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

/**
*	@param {?string} err - Contiene l'eventuale stringa di errore.
*	@public
*	@function come sopra
*	@summary Permette di caricare il file json da convertire in codice Java.
*/
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

/**
*	@public
*	@function problema??
*	@summary Scarica lo zip precedentemente creato contenente il codice.
*/

app.get('/scarica/:response',function(req,res){
    requestHandler.scarica(res,req);
});

/**
*	@public
*	@function Parser.parse
*	@param {?string} id - Contiene la categoria di bubble desiderate.
*	@summary . Ritorna la categoria di bubble desiderate.
*/

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
