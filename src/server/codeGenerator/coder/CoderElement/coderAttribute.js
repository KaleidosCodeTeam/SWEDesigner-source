/**
 *	@file Contiene la classe CoderAttribute
 *	@author Sanna Giovanni - KaleidosCode
 */

/** 
 *	@namespace
 *	@description Espone le funzionalità che permettono di codificare
 *	un attributo, rappresentato dall'oggetto di tipo ParsedAttribute in input, in Java (CoderAttribute.codeElementJava)
 *	o Javascript (CoderAttribute.codeElementJavascript); entrambe le funzioni restituiscono 
 *	la stringa del codice sorgente nel linguaggio scelto.
 */
var CoderAttribute = function() {};
/**
 *	@function CoderAttribute.codeElementJava
 *	@static
 *	@param {!ParsedAttribute} attributeObj - Le informazioni necessarie a codificare un attributo di classe.
 *	@return {string} Stringa del codice sorgente, in Java, dell'attributo di input.
 *	@description Riceve in input attributeObj, un oggetto che rappresenta un attributo 
 *	di classe; restituisce la stringa del codice sorgente, in Java, dell'attributo di input.
 */
CoderAttribute.codeElementJava = function(attributeObj) {
	source = "";
	if(attributeObj._visibility != 'package') {
		source += attributeObj._visibility + " ";
	}
	if(attributeObj.isStatic == "true") {
		source += "static ";
	}
	if(attributeObj.isFinal == "true") {
		source += "final ";
	}
	source += attributeObj._type + " " + attributeObj._name + " ";
	if(attributeObj._default != "") {
			source += " = " + attributeObj._default; 
	}
	source += ";";
	return source;
};
/**
 *	@function CoderAttribute.codeElementJavascript
 *	@static
 *	@param {!ParsedAttribute} attributeObj - Le informazioni necessarie a codificare un attributo di classe.
 *	@param {string} className - Nome della ParsedClass che detiene l'attributo (necessaria solo se l'attributo di input è statico).
 *	@return {string} Stringa del codice sorgente, in Javascript, dell'attributo di input.
 *	@description Riceve in input attributeObj, un oggetto che rappresenta un attributo 
 *	di classe; restituisce la stringa del codice sorgente, in Javascript, dell'attributo di input.
 */
CoderAttribute.codeElementJavascript = function(attributeObj, className) {
		source = "";
		if(attributeObj.isStatic == "false"){
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

		if(attributeObj._default != "") {
			source += attributeObj._default + ";"; 			
		}
		else {
			source += "undefined;";
		}
		return source;	
};

/** Esportazione del modulo */
module.exports = CoderAttribute;