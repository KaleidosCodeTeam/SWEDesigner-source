/**
 *	@file Contiene la classe statica CoderOperation
 *	@author Sanna Giovanni - KaleidosCode
 */

/** 
 *	@namespace
 *	@description Espone le funzionalità (statiche) che permettono di codificare
 *	un metodo/funzione, rappresentato dall'oggetto operationObj in input, in Java
 *	o Javascript; entrambe le funzioni restituiscono la stringa del codice 
 *	sorgente, relativa all'intestazione della classe, nel linguaggio scelto.
 */
var CoderOperation = function() {};
/**
 *	@function CoderOperation.codeElementJava
 *	@static
 *	@param {!Object} operationObj - Le informazioni necessarie a codificare un metodo/funzione.
 *	@return {string} Stringa del codice sorgente, in Java, della definizione del metodo/funzione operationObj di input
 *	(i.e. 'public abstract static final T foo').
 *	@description Riceve in input operationObj, un oggetto che rappresenta un metodo/funzione; 
 *	restituisce la stringa del codice sorgente, in Java, della definzione del metodo/funzione operationObj di input.
 */
CoderOperation.codeElementJava = function(operationObj) {
	var source = "";
	if(operationObj._visibility != 'package') {
		source += operationObj._visibility + " ";
	}
	if(operationObj.isAbstract  == "true") {
		source += "abstract ";
	}
	if(operationObj.isStatic  == "true") {
		source += "static ";
	}
	if(operationObj.isFinal  == "true") {
		source += "final ";
	}
	/*if(operationObj.isSynchronized) {
		source += "synchronized ";
	}*/
	source += operationObj.returnType + " ";
	source += operationObj._name;
	return source;
};
/**
 *	@function CoderOperation.codeElementJavascript
 *	@static
 *	@param {!Object} operationObj - Le informazioni necessarie a codificare un metodo/funzione.
 *	@param {string} className - Nome della classe che detiene il metodo/funzione (necessario solo se il metodo/funzione di input è statico).
 *	@return {string} Stringa del codice sorgente, in Javascript, della definizione del metodo/funzione operationObj di input
 *	(i.e. 'var doStuff = function'). 
 *	@description Riceve in input operationObj, un oggetto che rappresenta un metodo/funzione; 
 *	restituisce la stringa del codice sorgente, in Javascript, della definzione del metodo/funzione operationObj di input.
 */
CoderOperation.codeElementJavascript = function(operationObj, className) {
	source = "";
	if(operationObj.isStatic == "false") {	// funzione statica
		if(operationObj._visibility == "private") {	// funzione privata
			source += "var " + operationObj._name + " = function";
		} else {	// funzione pubblica
			source += "this." + operationObj._name + " = function";
		}
	} else {	// funzione d'istanza
		source += className + "." + operationObj._name + "= function";
	}	
	return source;	
};

/** Esportazione del modulo */
module.exports = CoderOperation;