/*
 *	@file Contiene test per Coder
 *	@author Sanna Giovanni - KaleidosCode
 *
 *	@requires ./../coder.js
 *  @requires ./../../parser/parser.js
 *  @requires ./tester.json
 */

var Coder = require('./../coder.js');
var Parser = require('./../../parser/parser.js');
var jsonFile = require('./tester.json');

/* ---------------- TEST DI UNITÀ ----------------- */
/* Inizializza cpj con un oggetto di tipo ParsedProgram e chiama la funzione statica di Coder, 'getCodedProgramJava(parsedProgram)',
 * per ottenere un oggetto CodedProgram contenente il codice sorgente in linguaggio Java, corrispondente
 * al programma in input. 
 * Inizializza cpjs con un oggetto di tipo ParsedProgram e chiama la funzione statica di Coder, 'getCodedProgramJs(parsedProgram)',
 * per ottenere un oggetto CodedProgram contenente il codice sorgente in linguaggio Javascript, corrispondente
 * al programma in input. 
 */

var parsedProg = Parser.parse(jsonFile);

var cpj = Coder.getCodedProgramJava(parsedProg);
var cpjs = Coder.getCodedProgramJs(parsedProg);

console.log("RISULTATO Coder.getCodedProgramJava");
for(var i=0; i<cpj._classes.length; i++) {
	console.log("******** START **********");
	console.log(cpj.getSource(i));
	console.log("******** END **********");
}
console.log("");

console.log("RISULTATO Coder.getCodedProgramJs");
for(var i=0; i<cpj._classes.length; i++) {
	console.log("******** START **********");
	console.log(cpjs.getSource(i));
	console.log("******** END **********");
}
console.log("");
