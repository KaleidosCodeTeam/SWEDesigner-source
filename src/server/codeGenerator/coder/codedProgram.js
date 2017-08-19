/**
 *	@file Contiene la classe CodedProgram
 *	@author Sanna Giovanni - KaleidosCode
 */

/**
 *  @class CodedProgram
 *	@description Contenitore di oggetti di tipo Class (definiti in ./class.js). Espone le funzionalità
 *	per aggiungere un oggetto Class al contenitore, e per ottenerne il codice 
 *	sorgente della classe contenuta all'indice specificato in input.
 *	Tale oggetto è restituito dalla funzione 'getCodedProgram(parsedprogram)' di JavaCoder e JavascriptCoder.
 */
function CodedProgram() {
	/** 
	 *	@var {Class[]} CodedProgram#_classes - Array contenente oggetti di tipo Class.
	 */
	this._classes = new Array();
	/**
	 *	@function CodedProgram#add
	 *	@param {!Class} _class - Oggetto di tipo Class che si vuole aggiungere al contenitore.
	 *	@description Aggiunge all'array this._classes l'oggetto di tipo Class in input.
	 */
	this.add = function(_class) {
		this._classes[this._classes.length] = _class;
	}
	/**
	 *	@function CodedProgram#getSource
	 *	@param {!Number} i - Indice dell'oggetto di tipo Class di cui si vuole ottenere il codice sorgente.
	 *	@return {string} Stringa del codice sorgente dell'oggetto Class di indice 'i'.
	 *	@description Aggiunge all'array this._classes l'oggetto di tipo Class in input.
	 */
	this. getSource = function(i) { return this._classes[i]._source; }
};

/** Esportazione del modulo */
module.exports = CodedProgram;