/**
 *	@file Contiene la classe statica codeGenerator
 *	@author Sanna Giovanni - KaleidosCode
 *
 *	@requires ./parser/parser.js
 *	@requires ./coder/coder.js
 *	@requires ./builder/builder.js
 *	@requires ./zipper/zipper.js
 */

var Parser = require('./parser/parser.js');
var Builder = require('./builder/builder.js');
var Coder = require('./coder/coder.js');
var Zipper = require('./zipper/zipper.js');

/** 
 *	@namespace
 *	@description Espone le funzionalità (statiche) che permettono di codificare
 *	un programma, rappresentato dal file json di input, in Java (codeGenerator.generateJavaProgram)
 *	o Javascript (codeGenerator.generateJsProgram); entrambe le funzioni creano un pacchetto in formato .zip contenente
 *	il programma codificato e strutturato in file e directory come da specifica del json di input.
 */
var codeGenerator = function() {};
/**
 *	@function codeGenerator.generateJsProgram
 *	@static
 *	@param {!json} jsonProgram - Le informazioni necessarie a codificare un programma.
 *	@param {!nomeZip} string - Specifica il nome con cui verrà nominato l'archivio zip prodotto.
 *	@description Codifica, in Javascript, il programma rappresentanto dal json in input
 *	e costruisce un pacchetto compresso in formato .zip contenente
 *	il programma codificato e strutturato in file e directory come da specifica del json di input.
 */
codeGenerator.generateJsProgram = function(jsonProgram, nomeZip) {
	var parsedProg = Parser.parse(jsonProgram);
	var codedProg = Coder.getCodedProgramJs(parsedProg);
	var buildedProg = Builder.javascriptBuild(codedProg);
	var zippedProg = Zipper.zip(nomeZip, buildedProg.progPath, function(err) {
		if (err) throw err;
		else console.log('PROGRAM CREATION: DONE');
	});
};
/**
 *	@function codeGenerator.generateJavaProgram
 *	@static
 *	@param {!json} jsonProgram - Le informazioni necessarie a codificare un programma.
 *	@param {!nomeZip} string - Specifica il nome con cui verrà nominato l'archivio zip prodotto.
 *	@description Codifica, in Java, il programma rappresentanto dal json in input
 *	e costruisce un pacchetto compresso in formato .zip contenente
 *	il programma codificato e strutturato in file e directory come da specifica del json di input.
 */
codeGenerator.generateJavaProgram = function(jsonProgram, nomeZip) {
	var parsedProg = Parser.parse(jsonProgram);
	var codedProg = Coder.getCodedProgramJava(parsedProg);
	var buildedProg = Builder.javaBuild(codedProg);
	var zippedProg = Zipper.zip(nomeZip, buildedProg.progPath, function(err) {
		if (err) throw err;
		else console.log('PROGRAM CREATION: DONE');
	});
};

/** Esportazione del modulo */
module.exports = {
	generateJsProgram : codeGenerator.generateJsProgram,
	generateJavaProgram : codeGenerator.generateJavaProgram
};