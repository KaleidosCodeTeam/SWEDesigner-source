/*
 *	@file Contiene test per CoderActivity
 *	@author Sanna Giovanni - KaleidosCode
 *
 *	@requires ./../CoderElement/coderActivity.js
 *  @requires ./tester.json
 */

var CoderActivity = require('./../CoderElement/coderActivity.js');
var jsonFile = require('./tester.json');

/* ---------------- TEST DI UNITÀ ----------------- */
/* Itera sugli oggetti di tipo ParsedOperation del ParsedProgram contenuto nella variabile jsonFile; ogni ParsedOperation
 * viene usata come input alla funzione CoderActivity.codeElementJava(ParsedOperation) che restituisce la stringa del codice sorgente 
 * in Java relativa all'implementazione della ParsedOperation.
 * Itera sugli oggetti di tipo ParsedOperation del ParsedProgram contenuto nella variabile jsonFile; ogni ParsedOperation
 * viene usata come input alla funzione CoderActivity.codeElementJavascript(ParsedOperation) che restituisce la stringa del codice sorgente 
 * in Javascript relativa all'implementazione della ParsedOperation. */
 
for(var i=0; i<jsonFile.operations.length;i++) {
	console.log(CoderActivity.codeElementJava(jsonFile.operations[i]));
}

for(var i=0; i<jsonFile.operations.length;i++) {
	console.log(CoderActivity.codeElementJavascript(jsonFile.operations[i]));
}
