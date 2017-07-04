/**
 *	@file Contiene Parser
 *	@author Bonato Enrico - KaleidosCode
 *
 *  @requires json-fn
 */

var JSONfn = require('json-fn');

/** @namespace */
var Parser={
    /**
     *  @function Parser.parse
     *	@param {?string} err - L'eventuale stringa di errore.
     *	@param {!string} jsonFile - Json da convertire.
     *  @return {Object} Oggetto Javascript.
     *	@summary Trasforma il file json ricevuto in input in oggetti Javascript.
     */
    parse: function(jsonFile) {
        var json=jsonFile;
        try {   
            return JSONfn.parse(json);
        } catch(err) {
            console.log('Errore Parser: '+err);
            return json;
        }        
    }
};

/** Esportazione del modulo */
module.exports = Parser;