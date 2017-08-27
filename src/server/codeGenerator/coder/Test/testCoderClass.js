/*
 *	@file Contiene test per CoderClass
 *	@author Sanna Giovanni - KaleidosCode
 *
 *	@requires ./../CoderElement/coderClass.js
 *	@requires ./tester.json
 */

var coderClass = require('./../CoderElement/coderClass.js');
var jsonFile = require('./tester.json');

/* ---------------- TEST DI UNITÀ ----------------- */
/* 	Itera sugli oggetti di tipo ParsedClass contenuti nella variabile jsonFile e ognuno di essi viene 
 *  usato come parametro di input per le due funzioni statiche di CoderClass, 'codeElementJava(classObj)' e
 *  codeElementJavascript(classObj), le quali restuiscono la stringa del codice sorgente, in Java o Javascript, corrispondente all'
 *  intestazione della classe in input.
 */

/* 	Viene chiamata la funzione statica di CoderClass che traduce l'oggetto in input
 * 	nella corrispondente stringa, del codice sorgente in linguaggio Java, relativa all'intestazione della
 * 	classe in input. 
 */
console.log("Risultato funzione codeElementJava(classObj)");
for(var i=0; i<jsonFile.classes.classesArray.length; i++) {
	for(var j=0; j<jsonFile.classes.classesArray[i].items.length; j++) {
		console.log(coderClass.codeElementJava(jsonFile.classes.classesArray[i].items[j],jsonFile));
	}
}
console.log("");

/* 	Viene chiamata la funzione statica di CoderClass che traduce l'oggetto in input
 * 	nella corrispondente stringa, del codice sorgente in linguaggio Javascript, relativa all'intestazione della
 * 	classe in input. 
 */
console.log("Risultato funzione codeElementJavascript(classObj)");
for(var i=0; i<jsonFile.classes.classesArray.length; i++) {
	for(var j=0; j<jsonFile.classes.classesArray[i].items.length; j++) {
		console.log(coderClass.codeElementJavascript(jsonFile.classes.classesArray[i].items[j],jsonFile));
	}
}
console.log("");