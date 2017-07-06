/*
 *	@file Contiene test per CoderAttribute
 *	@author Sanna Giovanni - KaleidosCode
 *
 *	@requires ./../CoderElement/coderAttribute.js
 */
var coderAttribute = require('./../CoderElement/coderAttribute.js');

/* ---------------- TEST DI UNITÀ ----------------- */
/* 	Crea tre oggetti che rappresentano un attributo di classe e ognuno di essi viene 
 *  usato come parametro di input per le due funzioni statiche di Coderattribute, 'codeElementJava(attributeObj)' e
 *  codeElementJavascript(attributeObj), le quali restuiscono la stringa del codice sorgente, in Java o Javascript, corrispondente all'
 *  attributo della classe in input.
 */

/* Oggetto che rappresenta un attributo di classe */
var attributeObj1 = {
	_name : "_attr1",
	_type : "int",
	_default : 2,
	_visibility : "private",
	isStatic : false,
	isFinal : true
};

/* Oggetto che rappresenta un attributo di classe */
var attributeObj2 = {
	_name : "_attr2",
	_type : "String",
	_default : "defStr",
	_visibility : "public",
	isStatic : true,
	isFinal : false
};

/* Oggetto che rappresenta un attributo di classe */
var attributeObj3 = {
	_name : "_attr3",
	_type : "String",
	_visibility : "public",
	isStatic : false,
	isFinal : false
};

/* 	Viene chiamata la funzione statica di CoderAttribute che traduce l'oggetto in input
 *	nella corrispondente stringa, del codice sorgente in linguaggio Java, relativa all'attributo
 *  in input. 
 */
console.log("Risultato funzione codeElementJava(attributeObj)");
console.log(coderAttribute.codeElementJava(attributeObj1));
console.log(coderAttribute.codeElementJava(attributeObj2));
console.log(coderAttribute.codeElementJava(attributeObj3));
console.log("");

/* 	Viene chiamata la funzione statica di CoderAttribute che traduce l'oggetto in input
 * 	nella corrispondente stringa, del codice sorgente in linguaggio Javascript, relativa all'attributo
 *  in input. Se l'attributo è statico,viene passato in input anche il nome della classe a cui l attributo appartiene.
 */
console.log("Risultato funzione codeElementJavascript(attributeObj)");
console.log(coderAttribute.codeElementJavascript(attributeObj1));
console.log(coderAttribute.codeElementJavascript(attributeObj2, "className"));
console.log(coderAttribute.codeElementJavascript(attributeObj3));
console.log("");
