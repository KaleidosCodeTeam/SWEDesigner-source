/*
 *	@file Contiene test per Coder
 *	@author Sanna Giovanni - KaleidosCode
 *
 *	@requires ./javaCoder.js
 */

var Coder = require('./../coder.js');
var Parser = require('./../../parser/parser.js');

var jsonFile = require('./../../jsonProgramTester.json');

/* ---------------- TEST DI UNITÀ ----------------- */
/* Crea un oggetto parsedProgram e chiama la funzione statica di Coder, 'getCodedProgramJava(parsedProgram)',
 * per ottenere un oggetto CodedProgram contenente il codice sorgente in linguaggio Java, corrispondente
 * al programma in input. 
 * Crea un oggetto parsedProgram e chiama la funzione statica di Coder, 'getCodedProgramJs(parsedProgram)',
 * per ottenere un oggetto CodedProgram contenente il codice sorgente in linguaggio Javascript, corrispondente
 * al programma in input. 
 */

var parsedProg = Parser.parse(jsonFile);

var cpj = Coder.getCodedProgramJava(parsedProg);
var cpjs = Coder.getCodedProgramJs(parsedProg);



console.log(cpj.getSource(0));
console.log("*********************************************************");
console.log(cpj.getSource(1));
console.log("*********************************************************");
console.log(cpj.getSource(2));
console.log("*********************************************************");
console.log(cpj.getSource(3));
console.log("*********************************************************");
console.log(cpj.getSource(4));
console.log("*********************************************************");
console.log("");
console.log("*********************************************************");
console.log(cpjs.getSource(0));
console.log("*********************************************************");
console.log(cpjs.getSource(1));
console.log("*********************************************************");
console.log(cpjs.getSource(2));
console.log("*********************************************************");
console.log(cpjs.getSource(3));
console.log("*********************************************************");
console.log(cpjs.getSource(4));
console.log("*********************************************************");
