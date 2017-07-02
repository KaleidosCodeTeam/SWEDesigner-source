/**
 *	@file Contiene requestHandler
 *	@author Bonato Enrico - KaleidosCode
 *

 *  requires JavaCoder      
 *  requires JavascriptCoder 
 *  requires zipper         
 *  requires parser
 *  requires builder         
 *  requires dao             
 *  requires multer	        
 *
 */

/*
var JavaCoder       =  require('../coder/javaCoder.js');
var JavascriptCoder =  require('../coder/javascriptCoder.js');
var zipper          =  require('../zipper/zipper.js');
var parser          =  require('../parser/parser.js');
var builder         =  require('../builder/builder.js');
*/
var CodeGenerator = require('../codeGenerator/codeGenerator.js');
var dao             =  require('../DAO/DAO.js');
var multer	        =  require('multer');
var path            =  require('path');

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

//** @namespace */
var requestHandler= {

    /**
	/**
	 *	@public
	 *	@function requestHandler.getIndex
	 *	@param {!string} req - contiene informazioni sulla richiesta HTTP.
	 *	@param {!string} res - risposta alla richiesta descritta in req.
	 *	@summary Invia il file index.
	 */

     getIndex: function(req,res){
         var percorso=root + '/../../webapp/SWEDesigner.html';
            res.sendFile(path.resolve(percorso));
    },


    /**
	 *	@public
	 *	@function requestHandler.getIndex
	 *	@param {!string} req - contiene informazioni sulla richiesta HTTP.
	 *	@param {!string} res - risposta alla richiesta descritta in req.
	 *	@summary Invia il file index.
	 */

    getBubble: function(linguaggio, nome, callback){
        dao.isPresentBubble(name,lenguage,function(presente){
            if(presente){
                dao.getBubble(name,language,function(bubble){
                    callback(bubble);
                });
            }
        });
    },

    /**
	 *	@public
	 *	@function requestHandler.getIndex
	 *	@param {!string} req - contiene informazioni sulla richiesta HTTP.
	 *	@param {!string} res - risposta alla richiesta descritta in req.
	 *	@summary Invia il file index.
	 */

    getAllBubble: function(callback){
        dao.getAllBubbles(function(risultato){
            callback(risultato);    
        });
    },

    /**
	 *	@public
	 *	@function requestHandler.caricaJs
	 *	@param {!string} req - contiene informazioni sulla richiesta HTTP.
	 *	@param {!string} res - risposta alla richiesta descritta in req.
	 *	@summary carica il file json nel server e ne genera il codice Javascript restituendo il nome della cartella compressa.
	 */

    caricaJs: function(res, req){
        upload(req,res,function(err) {
            if(err) {
                return res.end("Errore upload: "+err);
            }
            var nome = req.file.filename;
            var nomezip="Programma-"+nome.split[1]+".zip";
            /*
            var parsedProgram = parser.parse(req.file);
            var program = JavascriptCoder.getCodedProgram(parsedProgram);
            var cartella = builder.javascriptBuild(program);
            var zippato =Zipper.zip(nomezip,cartella,function(err){
                if(err)
                    console.log(err);}
                                   );
            */
            CodeGenerator.generateJsProgram(req.file,nomezip);
            res.end(nomezipe);
        });
    },

    /**
	 *	@public
	 *	@function requestHandler.caricaJa
	 *	@param {!string} req - contiene informazioni sulla richiesta HTTP.
	 *	@param {!string} res - risposta alla richiesta descritta in req.
	 *	@summary carica il file json nel server e ne genera il codice Java restituendo il nome della cartella compressa.
	 */

    caricaJa : function(res, req){
        upload(req,res,function(err) {
            if(err) {
                return res.end("Errore upload: "+err);
            }
            /*
            var nome = req.file.filename;
            var nomezip="Programma-"+nome.split[1]+".zip";
            var parsedProgram = parser.parse(req.file);
            var program = JavaCoder.getCodedProgram(parsedProgram);
            var cartella = builder.javaBuild(program);
            var zippato =Zipper.zip(nomezip,cartella,function(err){
                if(err)
                    console.log(err);}
                                   );
            */
            CodeGenerator.generateJavaProgram(req.file,nomezip);
            res.end(nomezipe);
        });

    },


    /**
	 *	@public
	 *	@function requestHandler.scarica
	 *	@param {!string} req - contiene informazioni sulla richiesta HTTP.
	 *	@param {!string} res - risposta alla richiesta descritta in req.
	 *	@summary Scarica il file zip indicato.
	 */

    scarica : function(req,res){
        var i=req.params.response;
        console.log(i);
        res.setHeader('Content-disposition', 'attachment; filename=Codice.zip'); 
        res.setHeader('Content-type', 'application/zip'); 
        res.download(__dirname+'/i'); 
    }

};
/** Esportazione del modulo */
module.exports=requestHandler;