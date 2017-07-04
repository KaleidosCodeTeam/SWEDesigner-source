/**
 *	@file Contiene la classe statica CoderParameter
 *	@author Sanna Giovanni - KaleidosCode
 */

/** 
 *	@namespace
 *	@description Espone le funzionalità (statiche) che permettono di codificare
 *	un parametro di lista di funzione, rappresentato dall'oggetto parameterObj in input, in Java
 *	o Javascript; entrambe le funzioni restituiscono la stringa del codice 
 *	sorgente del parametro nel linguaggio scelto.
 */
var CoderParameter = function() {};
/**
 *	@function CoderParameter.codeElementJava
 *	@static
 *	@param {!Object} parameterObj - Le informazioni necessarie a codificare un parametro di una 
 *	lista di metodo/funzione.
 *	@return {string} Stringa del codice sorgente, in Java, del parametro parameterObj di input
 *	(i.e. 'int param = 3').
 *	@description Riceve in input parameterObj, un oggetto che rappresenta un parametro; 
 *	restituisce la stringa del codice sorgente, in Java, del parametro parameterObj di input.
 */
CoderParameter.codeElementJava = function(parameterObj) {
	source = parameterObj._type + " " + parameterObj._name;
	if(parameterObj._default != "") {
		if(parameterObj._type == "String"){
			source += " = \"" + parameterObj._default +"\"";
		}
		else if(parameterObj._type == "char"){
			source += " = \'" + parameterObj._default +"\'";
		}
		else {
			source += "=" + parameterObj._default;
		}
		
	}
	return source;
};
/**
 *	@function CoderParameter.codeElementJavascript
 *	@static
 *	@param {!Object} parameterObj - Le informazioni necessarie a codificare un parametro di una lista di metodo/funzione.
 *	@return {string} Stringa del codice sorgente, in Java, del parametro parameterObj di input
 *	(i.e. 'int param = 3').
 *	@description Riceve in input parameterObj, un oggetto che rappresenta un parametro; 
 *	restituisce la stringa del codice sorgente, in Javascript, del parametro parameterObj di input.
 */
CoderParameter.codeElementJavascript = function(parameterObj) {
	source = parameterObj._name;
	if(parameterObj._default != "") {
		if(parameterObj._type == "String"){
			source += " = \"" + parameterObj._default +"\"";
		}
		else if(parameterObj._type == "char"){
			source += " = \'" + parameterObj._default +"\'";
		}
		else {
			source += "=" + parameterObj._default;
		}
	}
	return source;
};

/** Esportazione del modulo */
module.exports = CoderParameter;
