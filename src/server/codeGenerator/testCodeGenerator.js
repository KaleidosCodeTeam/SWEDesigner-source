/*
 *	@file Contiene test per codeGenerator
 *	@author Sanna Giovanni - KaleidosCode
 *
 *	@requires ./codeGenerator.js
 *  @requires ./jsonProgramTester.json
 */

/* ---------------- TEST DI UNITÀ ----------------- */
/* 	Utilizza il file json jsonProgramTester come input per la funzione statica di codeGenerator,
 * 	'generateJavaProgram(jsonProgram)', per creare il pacchetto compresso in formato .zip contenente
 *	il programma codificato in Java e strutturato in file e directory come da specifica del json di input.
 *  Utilizza il file json jsonProgramTester come input per la funzione statica di codeGenerator,
 * 	'generateJsProgram(jsonProgram)', per creare il pacchetto compresso in formato .zip contenente
 *	il programma codificato in Javascript e strutturato in file e directory come da specifica del json di input.
 */

var codeGenerator = require('./codeGenerator.js');
var jsonP =  require('./jsonProgramTester.json');

//codeGenerator.generateJavaProgram(jsonP);
codeGenerator.generateJsProgram(jsonP,"nomeZip");