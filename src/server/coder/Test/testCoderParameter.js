
var coderParameter = require('./../Coder/coderParameter');

var parameterObj1 = {
	_type : "int",
	_name : "param1",
};

var parameterObj2 = {
	_type : "String",
	_name : "param2",
	_default : 5
};

console.log("Risultato funzione codeElementJava(parameterObj)");
console.log(coderParameter.codeElementJava(parameterObj1));
console.log(coderParameter.codeElementJava(parameterObj2));
console.log("");

console.log("Risultato funzione codeElementJavascript(parameterObj)");
console.log(coderParameter.codeElementJavascript(parameterObj1));
console.log(coderParameter.codeElementJavascript(parameterObj2));
console.log("");
