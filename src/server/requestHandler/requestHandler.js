/**
 *	@file Contiene requestHandler
 *	@author Bonato Enrico - KaleidosCode
 *
 *  requires express
 *  requires fs
 *  requires multer
 *
 */

var express	=	require("express");
var fs      =   require("fs");
var multer	=	require('multer');

/** @namespace */
var app	    =	express();
var storage	=	multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/JsonUpload');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});
var upload = multer({ storage : storage}).single('JsonUp');

/**
*	@public
*	@function come lo chiamo ???? app.get('/')
*	@summary Ritorna il file index.html della webapp.
*/
app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html"); /*!!!!!!!!da cambiare!!!!!!!!!*/
});

/**
*	@param {?string} err - Contiene l'eventuale stringa di errore.
*	@public
*	@function come sopra
*	@summary Permette di caricare il file json da convertire in codice javascript.
*/
app.post('/caricaJs',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Errore upload: "+err);
        }
        /*
        genero lo zip gia compilato 
        */
        res.end(req.file.filename);
    });
});

/**
*	@param {?string} err - Contiene l'eventuale stringa di errore.
*	@public
*	@function come sopra
*	@summary Permette di caricare il file json da convertire in codice Java.
*/
app.post('/caricaJa',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Errore upload: "+err);
        }
        /*
        genero lo zip gia compilato 
        */
        res.end(req.file.filename);
    });
});

/**
*	@public
*	@function problema??
*	@summary Scarica lo zip precedentemente creato contenente il codice.
*/
app.get('/scarica/:response',function(req,res){
    var i=req.params.response;
    console.log(i);
    res.download(__dirname+"/uploads/JsonUpload/"+i);
});

/**
*	@public
*	@function Parser.parse
*	@param {?string} id - Contiene la categoria di bubble desiderate.
*	@summary . Ritorna la categoria di bubble desiderate.
*/
app.get('/getBubble/:id',function(req,res){
    var id = req.params.id;
    //var bubble =cose serverose(id)
    //res.send(bubble);
});

app.listen(3000,function(){
    console.log("requestHandler avviato correttamente sulla porta 3000");
});
