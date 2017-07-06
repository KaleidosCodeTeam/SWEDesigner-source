/**
 *	@file Contiene la classe statica RequestHandler
 *	@author Bonato Enrico - KaleidosCode
 *
 *  @requires ../codeGenerator/codeGenerator.js
 *  @requires ../dataManager/dataManager.js
 *  @requires multer
 *  @requires path
 *  @requires url
 */


var CodeGenerator   = require('../codeGenerator/codeGenerator.js');
var dm              = require('../dataManager/dataManager.js');
var multer	        = require('multer');
var path            = require('path');
var url				= require('url');

var root=__dirname+'/../webapp';
var storage	=	multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/JsonUpload');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

var upload = multer({ storage : storage}).single('JsonUp');

/** @namespace */
var RequestHandler = {
	/**
	 *	@function RequestHandler.getIndex
	 *	@param {!string} req - Contiene informazioni sulla richiesta HTTP.
	 *	@param {!string} res - Risposta alla richiesta descritta in req.
	 *	@summary Invia il file index della Single Page Application.
	 */
    getIndex: function(req, res) {
        var percorso=root + '/../../webapp/SWEDesigner.html';
        res.sendFile(path.resolve(percorso));
    },

    /*
	 *	@function RequestHandler.getBubble
	 *	@summary Invia la bubble richiesta.
	 */
    /*getBubble: function(linguaggio, nome, callback) {
        dm.isPresentBubble(name,lenguage,function(presente){
            if(presente){
                dm.getBubble(name,language,function(bubble){
                    callback(bubble);
                });
            }
        });
    },*/

    /*
	 *	@function RequestHandler.getAllBubble
	 *	@summary Invia tutte le bubble presenti nel database.
	 */
    /*getAllBubble: function(callback) {
        dm.getAllBubbles(function(risultato){
            callback(risultato);    
        });
    },*/

    /**
	 *	@function RequestHandler.caricaJs
	 *	@param {!string} req - Contiene informazioni sulla richiesta HTTP.
	 *	@param {!string} res - Risposta alla richiesta descritta in req.
	 *	@summary Carica il file json nel server e ne genera il codice Javascript restituendo il nome della cartella compressa.
	 */
    caricaJs: function(req, res) {
        upload(req,res,function(err) {
            if(err) {
                return res.end("Errore upload: "+err);
            }
            var query = decodeURIComponent(url.parse(req.url).query);
            query = query.split('&')[1];
            var obj = JSON.parse(query);
            console.log('============================================================');
            console.log(obj.filename);
            console.log(JSON.stringify(obj.project));
            console.log('============================================================');
            var nome = obj.filename;
            var nomezip="Programma-"+nome;

            CodeGenerator.generateJsProgram(obj.project,nomezip);
            
            res.end(JSON.stringify({'nomezip': nomezip}));
        });
    },
    /**
	 *	@function RequestHandler.caricaJa
	 *	@param {!string} req - Contiene informazioni sulla richiesta HTTP.
	 *	@param {!string} res - Risposta alla richiesta descritta in req.
	 *	@summary Carica il file json nel server e ne genera il codice Java restituendo il nome della cartella compressa.
	 */
    caricaJa : function(req, res) {
        upload(req,res,function(err) {
            if(err) {
                return res.end("Errore upload: "+err);
            }
            var query = decodeURIComponent(url.parse(req.url).query);
            query = query.split('&')[1];
            var obj = JSON.parse(query);
            console.log('============================================================');
            console.log(obj.filename);
            console.log(JSON.stringify(obj.project));
            console.log('============================================================');
            var nome = obj.filename;
            var nomezip="Programma-"+nome;

            CodeGenerator.generateJavaProgram(obj.project,nomezip);
          
            res.jsonp(JSON.stringify({'nomezip': nomezip}));
        });
    },
    /**
	 *	@function RequestHandler.scarica
	 *	@param {!string} req - Contiene informazioni sulla richiesta HTTP.
	 *	@param {!string} res - Risposta alla richiesta descritta in req.
	 *	@summary Scarica il file zip indicato.
	 */
    scarica : function(req, res){
        var i=req.params.response;
        console.log(i);
        res.setHeader('Content-disposition', 'attachment; filename=Codice.zip'); 
        res.setHeader('Content-type', 'application/zip'); 
        res.download(__dirname+'/i'); 
    }
};

/** Esportazione del modulo */
module.exports = RequestHandler;
