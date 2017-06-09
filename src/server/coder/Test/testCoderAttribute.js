
var coderAttribute = require('./../Coder/coderAttribute.js');

var attributeObj1 = {
	_name : "_attr1",
	_type : "int",
	_default : 2,
	_visibility : "private",
	isStatic : false,
	isFinal : true
};

var attributeObj2 = {
	_name : "_attr2",
	_type : "String",
	_default : "defStr",
	_visibility : "public",
	isStatic : true,
	isFinal : false
};

var attributeObj3 = {
	_name : "_attr3",
	_type : "String",
	_visibility : "public",
	isStatic : false,
	isFinal : false
};

console.log("Risultato funzione codeElementJava(attributeObj)");
console.log(coderAttribute.codeElementJava(attributeObj1));
console.log(coderAttribute.codeElementJava(attributeObj2));
console.log(coderAttribute.codeElementJava(attributeObj3));
console.log("");

console.log("Risultato funzione codeElementJavascript(attributeObj)");
console.log(coderAttribute.codeElementJavascript(attributeObj1));
console.log(coderAttribute.codeElementJavascript(attributeObj2, "className"));
console.log(coderAttribute.codeElementJavascript(attributeObj3));
console.log("");
