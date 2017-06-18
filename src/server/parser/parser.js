/**
 *	@file Contiene Parser
 *	@author Bonato Enrico - KaleidosCode
 *
 */
var JSONfn = require('json-fn');
/** @namespace */
var Parser={
    /**
*	@param {?string} err - Contiene l'eventuale stringa di errore.
*	@public
*	@function Parser.parse
*	@param {!string} jsonFile - file json da convertire.
*	@summary Trasforma il file json ricevuto in input in oggetti javascript.
*/

    parse: function ( jsonFile){
        var json=jsonFile;
        try{
                
            return JSONfn.parse(json);;
         }
        catch(err){
            console.log('Errore Parser :'+err);
        }
            
        }
    };
/* Esportazione del modulo */
module.exports = Parser  ;