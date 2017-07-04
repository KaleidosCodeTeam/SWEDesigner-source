/**
 *  @file Contiene la classe statica DAO
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
 * @namespace
 * @description Espone le funzionalità che permettono di interagire con il database delle bubbles,
 * in particolare inserire/eliminare una bubble, controllare se è presultente una specifica bubble, ottenere le
 * informazioni di una particolare bubble o ottenere le informazioni di tutte le bubble memorizzate.
 */
var DAO = (function() {
    var _private = {
        /** 
         *  @var {string} DAO.host_ - L'hostname del database mysql a cui connettersi.
         *  @private
         */
    		host_      : 'sql11.freemysqlhosting.net',
        /** 
         *  @var {string} DAO.user - Lo username per il login al database.
         *  @private
         */
      	user       : 'sql11180510',
        /** 
         *  @var {string} DAO.password - La password per il login al database.
         *  @private
         */
      	password   : 'dvxPEVmife',
        /** 
         *  @var {string} DAO.database - Il nome del database a cui connettersi.
         *  @private
         */
      	database   : 'sql11180510',
        /** 
         *  @var {Object} DAO.connection - La connessione al database.
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
     *  @function DAO._startConnection
     *  @descripton Inizializza l'oggetto DAO._private.connection e esegue la connessione al database.
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
         *  @function DAO.setConnection
         *  @param {!string} host - L'hostname del database mysql a cui connettersi.
         *  @param {!string} user - L'username per il login al database.
         *  @param {!string} psw - La password per il login al database.
         *  @param {!string} db - Il nome del database a cui connettersi.
         *  @descripton Setta le proprietà di DAO._private necessarie a creare una connessione.
         */
      	setConnection : function(host, user, psw, db) {
      		  _private.host_ = host;
      		  _private.user = user;
      		  _private.password = psw;
      		  _private.database = db;
      	},
        /**
         *  @function DAO.insertBubble
         *  @param {!string} name - Attributo 'Name' della bubble da inserire.
         *  @param {!string} source - Attributo 'Source' della bubble da inserire.
         *  @param {!string} language - Attributo 'Language' della bubble da inserire.
         *  @param {!string} descr - Attributo 'Description' della bubble da inserire.
         *  @descripton Inserisce una nuova bubble nel database.
         *  @throw mysql exception
         */
      	insertBubble : function(name, source, language, descr, result) {
            _startConnection();
        		_private.connection.query('insert into Bubbles  values("' + name + '","' + descr + '","' + source + '","' + language +'");', function(err, rows, fields) {
          			if (!err) {
                    if (result) { result.setR('Insertion of ' + name + " in " + language + " DONE."); }
                } else {
            			  throw err;
                }
        		});
            _private.connection.end();
      	},
        /**
         *  @function DAO.deleteBubble
         *  @param {!string} name - Attributo 'Name' della bubble da eliminare.
         *  @param {!string} language - Attributo 'Language' della bubble da eliminare.
         *  @descripton Elimina una bubble dal database.
         *  @throw mysql exception
         */
        deleteBubble : function(name, language, result) {
            _startConnection();
            _private.connection.query('delete from Bubbles where Name="' + name + '" and Language="' + language + '";', function(err, rows, fields) {
                if (!err) {
                    if(result) { result.setR('Delete of ' + name + " in " + language + " DONE."); }
                } else {
                    throw err;
                }
            });
            _private.connection.end();
        },
        /**
         *  @function DAO.getBubble
         *  @param {!string} name - Attributo 'Name' della bubble cercata.
         *  @param {!string} language - Attributo 'Language' della bubble cercata.
         *  @descripton Restituisce le informazioni della bubble cercata, se questa esiste.
         *  @throw mysql exception
         */
      	getBubble : function(name, language, result) {
        		_startConnection();
        		_private.connection.query('select * from Bubbles where Name="' + name + '" and Language="' + language + '";', function(err, rows, fields) {
          			if (!err) {
                    if (rows.length > 0) {
                        console.log(rows);
                        if (result) { result.setR(rows); }
                    } else {
                        console.log(null);
                    }
                } else {
            			  throw err;
                }
        		});
        		_private.connection.end();
      	},
        /**
         *  @function DAO.getAllBubble
         *  @descripton Restituisce le informazioni di tutte le bubble presenti nel database.
         *  @throw mysql exception
         */
        getAllBubbles : function(result) {
            _startConnection();
            _private.connection.query('select * from Bubbles;', function(err, rows, fields) {
                if (!err) {
                    console.log(rows);
                    if (result) { result.setR(rows); }
                } else {
                    throw err;
                }
            });
            _private.connection.end();
        },
        /**
         *  @function DAO.isPresentBubble
         *  @param {!string} name - Attributo 'Name' della bubble cercata.
         *  @param {!string} language - Attributo 'Language' della bubble cercata.
         *  @descripton Controlla se una specifica bubble è presente nel database.
         *  @throw mysql exception
         */
        isPresentBubble : function(name, language, result) {
            _startConnection();
            _private.connection.query('select * from Bubbles where Name="' + name + '" and Language="' + language + '";', function(err, rows, fields,r) {
                if (!err) {
                    if (rows.length > 0) { 
                        console.log(true); 
                        if (result) { result.setR(true); }
                    } else {
                        console.log(false); 
                        if(result) { result.setR(false); }
                    }
                } else {
                    throw err;
                }
            });
            _private.connection.end(); 
        }
    };
}());

/**  Esportazione del modulo */
module.exports = DAO;


//var d = new DAO();

//d.insertBubble("pedone","...codice...","Javascript","");
//d.getBubble("Mossa","Javascript");
//d.getBubble("Mossa","Javascript");

//console.log(d.isPresultentBubble("",""));
//console.log(d.isPresultentBubble("Mossa","Javascript"));

// create table Bubbles ( Name INT NOT NULL PRIMARY KEY, Description VARCHAR(100), Source VARCHAR(1000), Language VARCHAR(20)
// insert into Bubbles  values("Scacchiera","codice per disegnare scacchiera","...codice...","Java");
// insert into Bubbles  values("Mossa","codice per eseguire una mossa","...codice...","Java");