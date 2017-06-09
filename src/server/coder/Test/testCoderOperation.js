
var coderOperation = require('./../Coder/coderOperation.js');

var operationObj1 = {
				_name : "getInfo",
				_visibility : "public",
				returnType : "T",
				isStatic : true,
				isAbstract : true,
				isFinal : true
};

var operationObj2 = {
				_name : "getInfo",
				_visibility : "private",
				returnType : "T",
				isStatic : false,
				isAbstract : true,
				isFinal : true
};			

var operationObj3 = {
				_name : "getInfo",
				_visibility : "public",
				returnType : "T",
				isStatic : false,
				isAbstract : true,
				isFinal : true
};

console.log("Risultato funzione codeElementJava(operationObj)");
console.log(coderOperation.codeElementJava(operationObj1, "className"));
console.log(coderOperation.codeElementJava(operationObj2));
console.log(coderOperation.codeElementJava(operationObj3));
console.log("");

console.log("Risultato funzione codeElementJavascript(operationObj)");
console.log(coderOperation.codeElementJavascript(operationObj1, "className"));
console.log(coderOperation.codeElementJavascript(operationObj2));
console.log(coderOperation.codeElementJavascript(operationObj3));
console.log("");