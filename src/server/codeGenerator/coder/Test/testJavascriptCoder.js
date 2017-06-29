/**
 *	@file Contiene test per JavascriptCoder
 *	@author Sanna Giovanni - KaleidosCode
 *
 *	@requires ./javascriptCoder.js
 */


var JavascriptCoder = require('./../javascriptCoder.js');


/** ---------------- TEST DI UNITÀ ----------------- */
/** Crea un oggetto parsedProgram e chiama la funzione statica di JavascriptCoder, 'getCodedProgram(parsedProgram)',
 per ottenere un oggetto CodedProgram contenente il codice sorgente in linguaggio Javascript, corrispondente
 al programma in input. */

/** */
var parsedProgram = {
	"packages":
	{
		"packagesArray":[
		{
			"type":"packageDiagram.items.Package",
			"position":{"x":280,"y":170},"size":{"width":100,"height":100},
			"values":
			{
				"_package":"package1",
				"_importance":"alta",
				"id":"ed900e2c-a3ea-4bd8-bb27-e990116f144c"
			},
			"angle":0,
			"id":"ed900e2c-a3ea-4bd8-bb27-e990116f144c",
			"z":1,
			"attrs":{".uml-package-name-rect":{"height":40,"transform":"translate(0,0)"},".uml-package-name-text":{"text":"package1"}}
		}
		],
		"dependenciesArray":[]
	},

	"classes":
	{
		"classesArray":
		[
			{
				"id":"ed900e2c-a3ea-4bd8-bb27-e990116f144c",
				"items": [
					{
						"type":"classDiagram.items.Class",
						"position":{"x":590,"y":390},
						"size":{"width":100,"height":100},
						"attributesExpanded":true,
						"methodsExpanded":true,
						"values":{
							"_name":"classe2",
							"_visibility":"public",
							"_importance":"alta",
							"isAbstract":"false",
							"isInterface":"false",
							"constructorList":[],
							"attributes":[],
							"operations":[],
							"isStatic":"false",
							"isFinal":"false",
							"isFrozen":"true",
							"isReadOnly":"false",
							"isEnum":"false",
							"isGeneric":"false",
							"id":"6d8cf576-5b28-4304-b6f1-b4afa8e1bb03"
						},
						"angle":0,
						"id":"6d8cf576-5b28-4304-b6f1-b4afa8e1bb03",
						"z":1,
						"attrs":{".uml-class-name-rect":{"height":16,"width":215,"transform":"translate(0,0)"},".uml-class-attrs-rect":{"height":16,"width":215,"transform":"translate(0,16)"},".uml-class-methods-rect":{"height":16,"width":215,"transform":"translate(0,32)"},".uml-class-name-text":{"text":"classe2","font-style":"normal"},".uml-class-attrs-text":{"text":""},".uml-class-methods-text":{"text":""}}
					},
					{
						"type":"classDiagram.items.Interface",
						"position":{"x":860,"y":90},"size":{"width":100,"height":100},"methodsExpanded":true,
						"values":{
							"_name":"interfaccia1",
							"_visibility":"public",
							"_importance":"alta",
							"isInterface":"true",
							"operations":[
							{
								"_name":"OperInter",
								"_visibility":"public",
								"id":"74744a8f-d7a0-4b04-b4a8-5a515eefd0d3",
								"returnType":"int",
								"isStatic":"false",
								"isAbstract":"false",
								"isFinal":"false",
								"parameters":[
								{
									"_name":"ParInt1",
									"_type":"char",
									"_default":"d",
									"_direction":"in"
								}
								]
							},
							{
								"_name":"OperInter2",
								"_visibility":"protected",
								"id":"4ec11bf0-1b18-48eb-8155-95fcbabc283b",
								"returnType":"int",
								"isStatic":"false",
								"isAbstract":"false",
								"isFinal":"false",
								"parameters":[
								{
									"_name":"ParInt2",
									"_type":"int",
									"_default":"3",
									"_direction":"in"
								}
								]
							}
							],
							"id":"cb2b7baa-3d25-40a4-9b5b-9b996bfbe998"
						},
						"angle":0,"id":"cb2b7baa-3d25-40a4-9b5b-9b996bfbe998","z":1,"attrs":{".uml-class-name-rect":{"height":31,"width":325,"transform":"translate(0,0)"},".uml-class-methods-rect":{"height":31,"width":325,"transform":"translate(0,31)"},".uml-class-name-text":{"text":"<<interfaccia>>\ninterfaccia1"},".uml-class-methods-text":{"text":"+ OperInter(ParInt1:char):int\n# OperInter2(ParInt2:int):int"}}
					},
					{
						"type":"classDiagram.items.Class",
						"position":{"x":220,"y":390},
						"size":{"width":100,"height":100},
						"attributesExpanded":true,
						"methodsExpanded":true,
						"values":{
							"_name":"classe1",
							"_visibility":"public",
							"_importance":"alta",
							"isAbstract":"false",
							"isInterface":"false",
							"constructorList":[],
							"attributes":[],
							"operations":[],
							"isStatic":"true",
							"isFinal":"true",
							"isFrozen":"false",
							"isReadOnly":"false",
							"isEnum":"false",
							"isGeneric":"false",
							"id":"3f4f3852-0a33-4433-99f2-b2f26572f8eb"
						},
						"angle":0,"id":"3f4f3852-0a33-4433-99f2-b2f26572f8eb","z":1,"attrs":{".uml-class-name-rect":{"height":16,"width":215,"transform":"translate(0,0)"},".uml-class-attrs-rect":{"height":16,"width":215,"transform":"translate(0,16)"},".uml-class-methods-rect":{"height":16,"width":215,"transform":"translate(0,32)"},".uml-class-name-text":{"text":"classe1","font-style":"normal"},".uml-class-attrs-text":{"text":""},".uml-class-methods-text":{"text":""}}
					},
					{"type":"classDiagram.items.Class","position":{"x":300,"y":110},"size":{"width":100,"height":100},"attributesExpanded":true,"methodsExpanded":true,"values":{"_name":"parent","_visibility":"public","_importance":"alta","isAbstract":"true","isInterface":"false","constructorList":[],"attributes":[],"operations":[{"_name":"Operazione1","_visibility":"public","id":"3d4ad434-c322-42ac-bd4d-1fae015e4788","returnType":"int","isStatic":"false","isAbstract":"true","isFinal":"false","parameters":[{"_name":"Par1","_type":"int","_default":"2","_direction":"in"},{"_name":"Par2","_type":"String","_default":"def","_direction":"in"}]},{"_name":"Operazione2","_visibility":"private","id":"bb8fc94e-1558-49c3-8683-4e563fcafe4a","returnType":"char","isStatic":"true","isAbstract":"false","isFinal":"true","parameters":[{"_name":"Par3","_type":"int","_default":"","_direction":"in"}]}],"isStatic":"false","isFinal":"false","isFrozen":"false","isReadOnly":"false","isEnum":"false","isGeneric":"false","id":"4c61fc06-3335-4257-865b-3a7d33311c6d"},"angle":0,"id":"4c61fc06-3335-4257-865b-3a7d33311c6d","z":1,"attrs":{".uml-class-name-rect":{"height":16,"width":375,"transform":"translate(0,0)"},".uml-class-attrs-rect":{"height":16,"width":375,"transform":"translate(0,16)"},".uml-class-methods-rect":{"height":31,"width":375,"transform":"translate(0,32)"},".uml-class-name-text":{"text":"parent","font-style":"italic"},".uml-class-attrs-text":{"text":""},".uml-class-methods-text":{"text":"+ Operazione1(Par1:int,Par2:String):int\n- Operazione2(Par3:int):char"}}},
					{"type":"classDiagram.items.Class","position":{"x":970,"y":390},"size":{"width":100,"height":100},"attributesExpanded":true,"methodsExpanded":true,"values":{"_name":"classe3","_visibility":"public","_importance":"alta","isAbstract":"false","isInterface":"false","constructorList":[],"attributes":[],"operations":[],"isStatic":"false","isFinal":"false","isFrozen":"false","isReadOnly":"false","isEnum":"false","isGeneric":"false","id":"b65fa25f-6996-4167-8f9a-77ee021eea53"},"angle":0,"id":"b65fa25f-6996-4167-8f9a-77ee021eea53","z":1,"attrs":{".uml-class-name-rect":{"height":16,"width":215,"transform":"translate(0,0)"},".uml-class-attrs-rect":{"height":16,"width":215,"transform":"translate(0,16)"},".uml-class-methods-rect":{"height":16,"width":215,"transform":"translate(0,32)"},".uml-class-name-text":{"text":"classe3","font-style":"normal"},".uml-class-attrs-text":{"text":""},".uml-class-methods-text":{"text":""}}}
				] // fine array items
			} // fine oggetto class di classesArray
		], //  fine classesArray

		"relationshipsArray":[
		{
			"id":"ed900e2c-a3ea-4bd8-bb27-e990116f144c",
			"items":[
			{
				"type":"classDiagram.items.Implementation",
				"source":{"id":"b65fa25f-6996-4167-8f9a-77ee021eea53"},
				"target":{"id":"cb2b7baa-3d25-40a4-9b5b-9b996bfbe998"},
				"id":"f07749a2-084a-423f-a509-3a228fa94ad8",
				"z":1,
				"attrs":{}
			},
			{
				"type":"classDiagram.items.Association",
				"labels":[
					{
						"position":0.5,
						"attrs":{"text":{"text":"2 cl2"}}
					}
				],
					"values":{
						"card":"2",
						"attribute":"cl2",
						"id":"3b2fe780-af6c-4dff-992f-a01a11d3fa67"
					},
					"source":{"id":"3f4f3852-0a33-4433-99f2-b2f26572f8eb"},
					"target":{"id":"6d8cf576-5b28-4304-b6f1-b4afa8e1bb03"},
					"id":"3b2fe780-af6c-4dff-992f-a01a11d3fa67",
					"z":1,
					"attrs":{}
			},
			{
				"type":"classDiagram.items.Composition",
				"source":{"id":"6d8cf576-5b28-4304-b6f1-b4afa8e1bb03"},
				"target":{"id":"b65fa25f-6996-4167-8f9a-77ee021eea53"},
				"id":"a5b89b86-21d8-4555-b4ee-442e2b176c83",
				"z":1,
				"vertices":[{"x":880,"y":410}],"attrs":{}
			},
			{
				"type":"classDiagram.items.Generalization",
				"source":{"id":"3f4f3852-0a33-4433-99f2-b2f26572f8eb"},
				"target":{"id":"4c61fc06-3335-4257-865b-3a7d33311c6d"},
				"id":"53e614f5-9cb9-4a62-b614-f5f89616d8d3",
				"z":1,
				"attrs":{}
			},
			{
				"type":"classDiagram.items.Aggregation",
				"source":{"id":"3f4f3852-0a33-4433-99f2-b2f26572f8eb"},
				"target":{"id":"b65fa25f-6996-4167-8f9a-77ee021eea53"},
				"id":"15c542ec-b5a1-4156-96f1-b7dcaab2b541",
				"z":2,
				"vertices":[{"x":680,"y":590}],"attrs":{}
			}
			]
		}
		]},"operations":[]}


/** viene chiamata la funzione statica di JavascriptCoder che traduce l'oggetto parsedProgram di input 
* in un oggetto codedProgram e lo restituisce. 
*/
var cpjs = JavascriptCoder.getCodedProgram(parsedProgram);

console.log(cpjs.getSource(0));
console.log("*********************************************************");
console.log(cpjs.getSource(1));
console.log("*********************************************************");
console.log(cpjs.getSource(2));
console.log("*********************************************************");
console.log(cpjs.getSource(3));
console.log("*********************************************************");
console.log(cpjs.getSource(4));
console.log("*********************************************************");
//console.log(cpjs.getSource(5));
//console.log("*********************************************************");
