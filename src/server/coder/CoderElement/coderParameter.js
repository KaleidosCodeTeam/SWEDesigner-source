/**
 *	@module Contiene CoderParameter
 *	@author Sanna Giovanni - KaleidosCode
 *	@summary Espone le funzionalità per codificare un parametro, in Java o Javascript, appartenente ad una lista di metodo/funzione.
 */

/** 
*	@namespace
*	@description oggetto che espone le funzionalità (statiche) che permettono di codificare
*	un parametro di lista di funzione, rappresentato dall'oggetto parameterObj in input, in Java
*	o Javascript; entrambe le funzioni restituiscono la stringa del codice 
*	sorgente del parametro nel linguaggio scelto.
*/
var CoderParameter = function() { 


/**
*	@function CoderParameter.codeElementJava
*	@static
*	@public
*	@param {!Object} parameterObj - Oggetto che contiene le informazioni necessarie a codificare un parametro di una 
*	lista di metodo/funzione.
*	@return {String} source - stringa del codice sorgente, in Java, del parametro parameterObj di input
*	(i.e. 'int param = 3') .
*	@description funzione statica di CoderParameter; riceve in input parameterObj, un oggetto che rappresenta un parametro; 
*	restituisce la stringa del codice sorgente, in Java, del parametro parameterObj di input.
*/
coderParameter.codeElementJava = function(parameterObj) {
	source = parameterObj._type + " " + parameterObj._name;
	if(parameterObj._default) {
		source += "=" + parameterObj._default;
	}
	return source;
}

/**
*	@function CoderParameter.codeElementJavascript
*	@static
*	@public
*	@param {!Object} parameterObj - Oggetto che contiene le informazioni necessarie a codificare un parametro di una lista di metodo/funzione.
*	@return {String} source - stringa del codice sorgente, in Java, del parametro parameterObj di input
*	(i.e. 'int param = 3') .
*	@description funzione statica di CoderParameter; riceve in input parameterObj, un oggetto che rappresenta un parametro; 
*	restituisce la stringa del codice sorgente, in Javascript, del parametro parameterObj di input.
*/
coderParameter.codeElementJavascript = function(parameterObj) {
	source = parameterObj._name;
	if(parameterObj._default) {
		source += "=" + parameterObj._default;
	}
	return source;
}

/** Esportazione del modulo */
module.exports = CoderParameter;
};