/**
 *  @file Contiene la classe DataManager
 *  @author Sanna Giovanni - KaleidosCode
 *
 *  @requires mysql
 */

var mysql = require('mysql');

/*
var ris = function() {
    this.r = "x";
    this.setR = function(nr) { this.r = nr; }
}
*/

/** 
 * @namespace server::DataManager
 * @description Espone le funzionalità che permettono di interagire con il database delle bubbles,
 * in particolare inserire/eliminare una bubble, controllare se è presultente una specifica bubble, ottenere le
 * informazioni di una particolare bubble o ottenere le informazioni di tutte le bubble memorizzate.
 */
var DataManager = (function() {
    var _private = {
        /** 
         *  @var {string} server::DataManager.host_ - L'hostname del database mysql a cui connettersi.
         *  @private
         */
    	host_      : 'sql11.freemysqlhosting.net',
        /** 
         *  @var {string} server::DataManager.user - Lo username per il login al database.
         *  @private
         */
      	user       : 'sql11180510',
        /** 
         *  @var {string} server::DataManager.password - La password per il login al database.
         *  @private
         */
      	password   : 'dvxPEVmife',
        /** 
         *  @var {string} server::DataManager.database - Il nome del database a cui connettersi.
         *  @private
         */
      	database   : 'sql11180510',
        /** 
         *  @var {Object} server::DataManager.connection - La connessione al database.
         *  @private
         */
      	connection :  mysql.createConnection({
            host     : 'sql11.freemysqlhosting.net',
            user     : 'sql11180510',
            password : 'dvxPEVmife',
            database : 'sql11180510'
        }),
    };
    /**
     *  @function server::DataManager._startConnection
     *  @descripton Inizializza l'oggetto DataManager._private.connection e esegue la connessione al database.
     *  @private
     */
    _startConnection = function() {
        _private.connection = mysql.createConnection({
            host     : _private.host_,
            user     : _private.user,
            password : _private.password,
            database : _private.database
        });
        _private.connection.connect();
    };
    return {
        /**
         *  @function server::DataManager.setConnection
         *  @param {!string} host - L'hostname del database mysql a cui connettersi.
         *  @param {!string} user - L'username per il login al database.
         *  @param {!string} psw - La password per il login al database.
         *  @param {!string} db - Il nome del database a cui connettersi.
         *  @descripton Setta le proprietà di DataManager._private necessarie a creare una connessione.
         */
      	setConnection : function(host, user, psw, db) {
      		_private.host_ = host;
      		_private.user = user;
      		_private.password = psw;
      		_private.database = db;
      	},
        /**
         *  @function server::DataManager.insertBubble
         *  @param {!string} name - Attributo 'Name' della bubble da inserire.
         *  @param {!string} source - Attributo 'Source' della bubble da inserire.
         *  @param {!string} language - Attributo 'Language' della bubble da inserire.
         *  @param {!string} descr - Attributo 'Description' della bubble da inserire.
         *  @descripton Inserisce una nuova bubble nel database.
         *  @throw mysql exception
         */
      	insertBubble : function(name, source, language, descr) {
            _startConnection();
        		_private.connection.query('insert into Bubbles  values("' + name + '","' + descr + '","' + source + '","' + language +'");', function(err, rows, fields) {
          			if (err) {
                        _private.connection.end();
            			throw err;
                    }
        		});
            _private.connection.end();
      	},
        /**
         *  @function server::DataManager.deleteBubble
         *  @param {!string} name - Attributo 'Name' della bubble da eliminare.
         *  @param {!string} language - Attributo 'Language' della bubble da eliminare.
         *  @descripton Elimina una bubble dal database.
         *  @throw mysql exception
         */
        deleteBubble : function(name, language) {
            _startConnection();
            _private.connection.query('delete from Bubbles where Name="' + name + '" and Language="' + language + '";', function(err, rows, fields) {
                if (err) {
                    _private.connection.end();
                    throw err;
                }
            });
            _private.connection.end();
        },
        /**
         *  @function server::DataManager.getBubble
         *  @param {!string} name - Attributo 'Name' della bubble cercata.
         *  @param {!string} language - Attributo 'Language' della bubble cercata.
         *  @descripton Restituisce le informazioni della bubble cercata, se questa esiste.
         *  @throw mysql exception
         */
      	getBubble : function(name, language) {
        		_startConnection();
        		_private.connection.query('select * from Bubbles where Name="' + name + '" and Language="' + language + '";', function(err, rows, fields) {
          			if (!err) {
                        if (rows.length > 0) {
                            console.log(rows);
                        }
                    } else {
                        _private.connection.end();
            		    throw err;
                    }
        		});
        		_private.connection.end();
      	},
        /**
         *  @function server::DataManager.getAllBubble
         *  @descripton Restituisce le informazioni di tutte le bubble presenti nel database.
         *  @throw mysql exception
         */
        getAllBubbles : function() {
            _startConnection();
            _private.connection.query('select * from Bubbles;', function(err, rows, fields) {
                if (err) {  
                    _private.connection.end();        
                    throw err;
                }
            });
            _private.connection.end();
        },
        /**
         *  @function server::DataManager.isPresentBubble
         *  @param {!string} name - Attributo 'Name' della bubble cercata.
         *  @param {!string} language - Attributo 'Language' della bubble cercata.
         *  @descripton Controlla se una specifica bubble è presente nel database.
         *  @throw mysql exception
         */
        isPresentBubble : function(name, language) {
            _startConnection();
            _private.connection.query('select * from Bubbles where Name="' + name + '" and Language="' + language + '";', function(err, rows, fields,r) {
                if (err) {     
                    _private.connection.end(); 
                    throw err;
                }
            });
            _private.connection.end(); 
        }
    };
}());

/**  Esportazione del modulo */
module.exports = DataManager;
