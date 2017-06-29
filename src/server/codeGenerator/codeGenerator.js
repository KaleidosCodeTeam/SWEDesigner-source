
var Parser = require('./parser/parser.js');
var Builder = require('./builder/builder.js');
var Coder = require('./coder/coder.js');
var Zipper = require('./zipper/zipper.js');

var codeGenerator = function() {}

codeGenerator.generateJsProgram = function(jsonProgram) {
	var parsedProg = Parser.parse(jsonProgram);
	var codedProg = Coder.getCodedProgramJs(parsedProg);
	var buildedProg = Builder.javascriptBuild(codedProg);
	var zippedProg = Zipper.zip(buildedProg.progDirectory, buildedProg.progPath, function(err) {
		if (err) throw err;
		else console.log('PROGRAM CREATION: DONE');
	});
}

codeGenerator.generateJavaProgram = function(jsonProgram) {
	var parsedProg = Parser.parse(jsonProgram);
	var codedProg = Coder.getCodedProgramJava(parsedProg);
	var buildedProg = Builder.javaBuild(codedProg);
	var zippedProg = Zipper.zip(buildedProg.progDirectory, buildedProg.progPath, function(err) {
		if (err) throw err;
		else console.log('PROGRAM CREATION: DONE');
	});
}

module.exports = {
	generateJsProgram : codeGenerator.generateJsProgram,
	generateJavaProgram : codeGenerator.generateJavaProgram
};