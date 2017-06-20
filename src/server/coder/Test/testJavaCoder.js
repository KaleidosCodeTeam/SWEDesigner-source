/**
 *	@file Contiene test per JavaCoder
 *	@author Sanna Giovanni - KaleidosCode
 *
 *	@requires ./javaCoder.js
 */

var JavaCoder = require('./../javaCoder.js');

/** ---------------- TEST DI UNITÀ ----------------- */
/** Crea un oggetto parsedProgram e chiama la funzione statica di JavaCoder, 'getCodedProgram(parsedProgram)',
 * per ottenere un oggetto CodedProgram contenente il codice sorgente in linguaggio Java, corrispondente
 * al programma in input. 
 */

/**  */
var parsedProgram = {
	classes : [
		{
			_name : "E",
			_visibility : "protected",
			isAbstract : false,
			isInterface : true,
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
					_default : null,
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
			dependencies : [
				{
					_name : "F",
					_type : "Generalization",
					usage : "create/use",

				},
				{
					_name : "G",
					_type : "Implementation"
				}
			],
		}
	]
};

/** viene chiamata la funzione statica di JavaCoder che traduce l'oggetto parsedProgram di input 
* in un oggetto codedProgram e lo restituisce. 
*/
var cpj = JavaCoder.getCodedProgram(parsedProgram);


console.log(cpj.getSource(0));
