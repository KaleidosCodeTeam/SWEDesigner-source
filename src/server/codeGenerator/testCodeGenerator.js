
var codeGenerator = require('./codeGenerator.js');


var jsonP =  require('./jsonProgramTester.json');


codeGenerator.generateJavaProgram(jsonP);
codeGenerator.generateJsProgram(jsonP);