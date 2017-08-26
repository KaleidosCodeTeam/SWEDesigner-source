/*
 *	@file Contiene test per CoderParameter
 *	@author Sanna Giovanni - KaleidosCode
 *
 *	@requires ./../CoderElement/coderParameter.js
 */

var coderParameter = require('./../CoderElement/coderParameter.js');

/* ---------------- TEST DI UNITÀ ----------------- */
/*  Crea due oggetti che rappresentano un ParsedParameter e ognuno di essi viene 
 *  usato come parametro di input per le due funzioni statiche di CoderParameter, 'codeElementJava(parameterObj)' e
 *  codeElementJavascript(parameterObj), le quali restuiscono la stringa  del codice sorgente, in Java o Javascript, corrispondente all'
 *  oggetto di tipo ParsedParameter in input.
 */

/* Oggetto che rappresenta un parametro di una lista di metodo/funzione */
var parameterObj1 = {
	_type : "int",
	_name : "param1",
	_default : ""
};

/* Oggetto che rappresenta un parametro di una lista di metodo/funzione */
var parameterObj2 = {
	_type : "String",
	_name : "param2",
	_default : "5"
};


/* 	Viene chiamata la funzione statica di CoderParameter che traduce l'oggetto in input, che rappresenta un oggetto di tipo ParsedParameter,
 * 	nella corrispondente stringa del codice sorgente in linguaggio Java. 
 */
console.log("Risultato funzione codeElementJava(parameterObj)");
console.log(coderParameter.codeElementJava(parameterObj1));
console.log(coderParameter.codeElementJava(parameterObj2));
console.log("");

/* 	Viene chiamata la funzione statica di CoderParameter che traduce l'oggetto in input, che rappresenta un oggetto di tipo ParsedParameter,
 * 	nella corrispondente stringa del codice sorgente in linguaggio Javascript. 
 */
console.log("Risultato funzione codeElementJavascript(parameterObj)");
console.log(coderParameter.codeElementJavascript(parameterObj1));
console.log(coderParameter.codeElementJavascript(parameterObj2));
console.log("");
