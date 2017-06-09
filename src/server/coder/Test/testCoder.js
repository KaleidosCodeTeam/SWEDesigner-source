
var JavaCoder = require('./../javaCoder.js');
var JavascriptCoder = require('./../javascriptCoder.js');

var parsedProgram = {
	classes : [
		{
			_name : "E",
			_visibility : "protected",
			isAbstract : false,
			isInterface : true,
			dependencies : [
				{
					_name : "F",
					_type : "Implementation"
				},
				{
					_name : "G",
					_type : "Implementation"
				}
			],
			constructorList : ["param1","param2","paramN"],
			attributes : [
				{
					_name : "_attr1",
					_type : "String",
					_default : "hello",
					_visibility : "private",
					isStatic : false,
					isFinal : true
				},
				{
					_name : "_attr2",
					_type : "int",
					_default : 2,
					_visibility : "public",
					isStatic : true,
					isFinal : true
				},
				{
					_name : "_attr2",
					_type : "classA",
					_default : "new classA()",
					_visibility : "public",
					isStatic : false,
					isFinal : true
				},
				{
					_name : "_attr3",
					_type : "int",
					_visibility : "private",
					isStatic : false,
					isFinal : false
				}
			],
			operations : [
				{
					_name : "getInfo",
					_visibility : "public",
					returnType : "T",
					isStatic : true,
					isAbstract : true,
					isFinal : true,
					parameters : [
						{
							_type : "String",
							_name : "param2",
							_default : 5	
						}
					]
				},
				{
					_name : "doStuff",
					_visibility : "public",
					returnType : "T",
					isStatic : false,
					isAbstract : false,
					isFinal : false,
					parameters : [	]
				},
				{
					_name : "getName",
					_visibility : "private",
					returnType : "T",
					isStatic : false,
					isAbstract : false,
					isFinal : false,
					parameters : [
						{
							_type : "String",
							_name : "param2",	
						},
						{
							_type : "int",
							_name : "param3",
							_default : "5"
						}
					]
				}
			],
			_package : "pack1/pack2",
			file : "fileName",
			dependencies : []
		}
	]
};

var cpj = JavaCoder.getCodedProgram(parsedProgram);
var cpjs = JavascriptCoder.getCodedProgram(parsedProgram);
console.log(cpj.getSource(0));
console.log(cpjs.getSource(0));