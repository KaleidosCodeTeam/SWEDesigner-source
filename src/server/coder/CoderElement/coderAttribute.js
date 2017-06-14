/**
 *	@module Contiene CoderAttribute
 *	@author Sanna Giovanni - KaleidosCode
 *	@summary Espone le funzionalità per codificare un attributo di un oggetto in Java o Javascript
 */


/** 
*	@namespace
*	@description oggetto che espone le funzionalità (statiche) che permettono di codificare
*	un attributo, rappresentato dall'oggetto attributeObj in input, in Java (CoderAttribute.codeElementJava)
*	o Javascript (CoderAttribute.codeElementJavascript); entrambe le funzioni restituiscono 
*	la stringa del codice sorgente nel linguaggio scelto.
*/
var CoderAttribute = function() {};

/**
*	@function CoderAttribute.codeElementJava
*	@static
*	@public
*	@param {!Object} attributeObj - Oggetto che contiene le informazioni necessarie a codificare un attributo di classe
*	@return {String}
*	@description funzione statica di CoderAttribute; riceve in input attributeObj, un oggetto che rappresenta un attributo 
*	di classe; restituisce la stringa del codice sorgente, in Java, dell'attributo di input.
*/
CoderAttribute.codeElementJava = function(attributeObj) {
	source = "";
	if(attributeObj._visibility != 'package') {
		source += attributeObj._visibility + " ";
	}
	if(attributeObj.isStatic) {
		source += "static ";
	}
	if(attributeObj.isFinal) {
		source += "final ";
	}
	source += attributeObj._type + " " + attributeObj._name + " ";
	if(attributeObj._default) {
		if(attributeObj._type == "String"){
			source += " = \"" + attributeObj._default +"\"";
		}
		else {
			source += " = " + attributeObj._default;
		}
	}
	source += ";";
	return source;
}


/**
*	@function CoderAttribute.codeElementJavascript
*	@static
*	@public
*	@param {!Object} attributeObj - Oggetto che contiene le informazioni necessarie a codificare un attributo di classe
*	@param {String} className - Nome della classe che detiene l'attributo (necessaria solo se l'attributo di input è statico)
*	@return {String}
*	@description funzione statica di CoderAttribute; riceve in input attributeObj, un oggetto che rappresenta un attributo 
*	di classe; restituisce la stringa del codice sorgente, in Javascript, dell'attributo di input.
*/
CoderAttribute.codeElementJavascript = function(attributeObj, className) {
		source = "";
		if(!attributeObj.isStatic){
			if(attributeObj._visibility == "private") {
				source += "var " + attributeObj._name + " = ";
			}
			else {
				source += "this." + attributeObj._name + " = ";
			}
		}
		else {
			source += className + "." + attributeObj._name + " = ";
		}	

		if(attributeObj._default) {
			if(attributeObj._type == "String"){
				source += "\"" + attributeObj._default + "\";";
			}
			else {
				source += attributeObj._default + ";";
			}				
		}
		else {
			source += "null;";
		}
		return source;	
}

/** Esportazione del modulo */
module.exports = CoderAttribute;