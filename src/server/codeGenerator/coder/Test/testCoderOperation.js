/*
 *	@file Contiene test per CoderOperation
 *	@author Sanna Giovanni - KaleidosCode
 *
 *	@requires ./../CoderElement/coderOperation.js
 *  @requires ./tester.json
 */

var coderOperation = require('./../CoderElement/coderOperation.js');
var jsonFile = require('./tester.json');

/* ---------------- TEST DI UNITÀ ----------------- */
/* 	Itera sugli oggetti di tipo ParsedOperation contenuti nella variabile jsonFile e ognuno di essi viene 
 *  usato come parametro di input per le due funzioni statiche di CoderOperation, 'codeElementJava(operationObj)' e
 *  codeElementJavascript(operationObj), le quali restuiscono la stringa del codice sorgente, in Java o Javascript, corrispondente all'
 *  intestazione del metodo/funzione ParsedOperation in input.
 */

/* 	Viene chiamata la funzione statica di CoderOperation che traduce l'oggetto in input
 * 	nella corrispondente stringa, del codice sorgente in linguaggio Java, relativa all'intestazione del
 * 	metodo/funzione in input. 
 */
 
console.log("Risultato funzione codeElementJava(operationObj)");
for(var i=0;i<jsonFile.classes.classesArray.length;i++) {
	for(var j=0; j<jsonFile.classes.classesArray[i].items.length;j++) {
		for(var k=0; k<jsonFile.classes.classesArray[i].items[j].values.operations.length; k++) {
			if(jsonFile.classes.classesArray[i].items[j].values.isStatic == "false") {
				console.log(coderOperation.codeElementJava(jsonFile.classes.classesArray[i].items[j].values.operations[k]));
			}	
			else {
				console.log(coderOperation.codeElementJava(jsonFile.classes.classesArray[i].items[j].values.operations[k], jsonFile.classes.classesArray[i].items[j].values._name));
			}
		}
	}
}
console.log("");
/* 	Viene chiamata la funzione statica di CoderOperation che traduce l'oggetto in input
 * 	nella corrispondente stringa, del codice sorgente in linguaggio Javascript, relativa all'intestazione del
 * 	metodo/funzione in input. 
 */
console.log("Risultato funzione codeElementJavascript(operationObj)");
for(var i=0;i<jsonFile.classes.classesArray.length;i++) {
	for(var j=0; j<jsonFile.classes.classesArray[i].items.length;j++) {
		for(var k=0; k<jsonFile.classes.classesArray[i].items[j].values.operations.length; k++) {
			if(jsonFile.classes.classesArray[i].items[j].values.isStatic == "false") {
				console.log(coderOperation.codeElementJavascript(jsonFile.classes.classesArray[i].items[j].values.operations[k]));
			}	
			else {
				console.log(coderOperation.codeElementJavascript(jsonFile.classes.classesArray[i].items[j].values.operations[k], jsonFile.classes.classesArray[i].items[j].values._name));
			}
		}
	}
}
console.log("");
