
var coderClass = require('./../Coder/coderClass.js');

var classObj1 = {
				_name : "A",
				_visibility : "public",
				isAbstract : true,
				isInterface : false,
				Dependencies : [
					{
						_name : "B",
						_type : "Generalization"
					},
					{
						_name : "C",
						_type : "Implementation"
					},
					{
						_name : "D",
						_type : "Implementation"
					}
				]
};
;

var classObj2 = {
				_name : "E",
				_visibility : "protected",
				isAbstract : false,
				isInterface : true,
				Dependencies : [
					{
						_name : "F",
						_type : "Implementation"
					},
					{
						_name : "G",
						_type : "Implementation"
					}
				],
				constructorList : ["param1","param2","paramN"]
};

console.log("Risultato funzione codeElementJava(classObj)");
console.log(coderClass.codeElementJava(classObj1));
console.log(coderClass.codeElementJava(classObj2));
console.log("");

console.log("Risultato funzione codeElementJavascript(classObj)");
console.log(coderClass.codeElementJavascript(classObj1));
console.log(coderClass.codeElementJavascript(classObj2));
console.log("");

