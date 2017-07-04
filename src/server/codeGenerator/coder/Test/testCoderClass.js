/*
 *	@file Contiene test per CoderClass
 *	@author Sanna Giovanni - KaleidosCode
 *
 *	@requires ./../CoderElement/coderClass.js
 */

var coderClass = require('./../CoderElement/coderClass.js');

/* ---------------- TEST DI UNITÀ ----------------- */
/* 	Crea due oggetti che rappresentano una classe e ognuno di essi viene 
 *  usato come parametro di input per le due funzioni statiche di CoderClass, 'codeElementJava(classObj)' e
 *  codeElementJavascript(classObj), le quali restuiscono la stringa del codice sorgente, in Java o Javascript, corrispondente all'
 *  intestazione della classe in input.
 */

/* Oggetto che rappresenta un classe da codificare */
var parsedProgram = {"packages":{"packagesArray":[{"type":"packageDiagram.items.Package","position":{"x":330,"y":130},"size":{"width":100,"height":100},"values":{"_package":"PackageName","_importance":"alta","id":"6c64ee2e-eb22-409a-ba1a-82850f4d9a63"},"angle":0,"id":"6c64ee2e-eb22-409a-ba1a-82850f4d9a63","z":1,"attrs":{".uml-package-name-rect":{"height":40,"transform":"translate(0,0)"},".uml-package-name-text":{"text":"PackageName"}}}],"dependenciesArray":[]},"classes":{"classesArray":[{"type":"classDiagram.items.Class","position":{"x":580,"y":80},"size":{"width":100,"height":100},"attributesExpanded":true,"methodsExpanded":true,"values":{"_name":"parent","_visibility":"public","_importance":"alta","isAbstract":"true","isInterface":"false","constructorList":[],"attributes":[],"operations":[{"_name":"meth3","_visibility":"public","id":"fd82cfa0-0eb5-470a-96f9-eee980bfdcef","returnType":"int","isStatic":"false","isAbstract":"true","isFinal":"false","parameters":[{"_name":"par3","_type":"int","_default":"","_direction":"in"}]},{"_name":"meth4","_visibility":"public","id":"c9098da1-9aaf-41f8-b6a7-fb0db129a28b","returnType":"String","isStatic":"false","isAbstract":"false","isFinal":"false","parameters":[]}],"isStatic":"false","isFinal":"false","isFrozen":"false","isReadOnly":"false","isEnum":"false","isGeneric":"false","id":"333f6cbb-0e15-4e92-8c3b-aff299255ef2"},"angle":0,"id":"333f6cbb-0e15-4e92-8c3b-aff299255ef2","z":1,"attrs":{".uml-class-name-rect":{"height":16,"width":285,"transform":"translate(0,0)"},".uml-class-attrs-rect":{"height":16,"width":285,"transform":"translate(0,16)"},".uml-class-methods-rect":{"height":31,"width":285,"transform":"translate(0,32)"},".uml-class-name-text":{"text":"parent","font-style":"italic"},".uml-class-attrs-text":{"text":""},".uml-class-methods-text":{"text":"+ meth3(par3:int):int\n+ meth4():String"}}},{"type":"classDiagram.items.Class","position":{"x":220,"y":220},"size":{"width":100,"height":100},"attributesExpanded":true,"methodsExpanded":true,"values":{"_name":"classe1","_visibility":"public","_importance":"alta","isAbstract":"false","isInterface":"false","constructorList":[],"attributes":[{"_name":"attr1","_type":"int","_default":"2","_visibility":"private","isStatic":"false","isFinal":"false"},{"_name":"attr2","_type":"String","_default":"def","_visibility":"public","isStatic":"true","isFinal":"true"},{"_name":"attr3","_type":"char","_default":"c","_visibility":"protected","isStatic":"false","isFinal":"false"}],"operations":[{"_name":"meth1","_visibility":"public","id":"5577d39e-83c0-45e3-bf02-9d7d969a8a31","returnType":"int","isStatic":"true","isAbstract":"false","isFinal":"false","parameters":[{"_name":"par1","_type":"int","_default":"","_direction":"in"},{"_name":"par2","_type":"char","_default":"","_direction":"in"}]},{"_name":"meth2","_visibility":"protected","id":"91baa6dc-aa26-4f71-80c7-b56666ed27ef","returnType":"String","isStatic":"false","isAbstract":"false","isFinal":"true","parameters":[]}],"isStatic":"false","isFinal":"false","isFrozen":"false","isReadOnly":"false","isEnum":"false","isGeneric":"false","id":"37f5b8bf-e280-467a-8136-54a792ca3766"},"angle":0,"id":"37f5b8bf-e280-467a-8136-54a792ca3766","z":1,"attrs":{".uml-class-name-rect":{"height":16,"width":335,"transform":"translate(0,0)"},".uml-class-attrs-rect":{"height":46,"width":335,"transform":"translate(0,16)"},".uml-class-methods-rect":{"height":31,"width":335,"transform":"translate(0,62)"},".uml-class-name-text":{"text":"classe1","font-style":"normal"},".uml-class-attrs-text":{"text":"- attr1:int\n+ attr2:String\n# attr3:char"},".uml-class-methods-text":{"text":"+ meth1(par1:int,par2:char):int\n# meth2():String"}}},{"type":"classDiagram.items.Class","position":{"x":480,"y":430},"size":{"width":100,"height":100},"attributesExpanded":true,"methodsExpanded":true,"values":{"_name":"classe2","_visibility":"public","_importance":"alta","isAbstract":"false","isInterface":"false","constructorList":[],"attributes":[],"operations":[],"isStatic":"false","isFinal":"false","isFrozen":"false","isReadOnly":"false","isEnum":"false","isGeneric":"false","id":"8425da6c-0c0a-42a3-989b-5378b4200426"},"angle":0,"id":"8425da6c-0c0a-42a3-989b-5378b4200426","z":1,"attrs":{".uml-class-name-rect":{"height":16,"width":215,"transform":"translate(0,0)"},".uml-class-attrs-rect":{"height":16,"width":215,"transform":"translate(0,16)"},".uml-class-methods-rect":{"height":16,"width":215,"transform":"translate(0,32)"},".uml-class-name-text":{"text":"classe2","font-style":"normal"},".uml-class-attrs-text":{"text":""},".uml-class-methods-text":{"text":""}}},{"type":"classDiagram.items.Class","position":{"x":960,"y":290},"size":{"width":100,"height":100},"attributesExpanded":true,"methodsExpanded":true,"values":{"_name":"classe3","_visibility":"public","_importance":"alta","isAbstract":"false","isInterface":"false","constructorList":[],"attributes":[],"operations":[],"isStatic":"false","isFinal":"false","isFrozen":"false","isReadOnly":"false","isEnum":"false","isGeneric":"false","id":"e697060b-db0e-4fe4-89ff-60695edd7efe"},"angle":0,"id":"e697060b-db0e-4fe4-89ff-60695edd7efe","z":1,"attrs":{".uml-class-name-rect":{"height":16,"width":215,"transform":"translate(0,0)"},".uml-class-attrs-rect":{"height":16,"width":215,"transform":"translate(0,16)"},".uml-class-methods-rect":{"height":16,"width":215,"transform":"translate(0,32)"},".uml-class-name-text":{"text":"classe3","font-style":"normal"},".uml-class-attrs-text":{"text":""},".uml-class-methods-text":{"text":""}}},{"type":"classDiagram.items.Interface","position":{"x":980,"y":130},"size":{"width":100,"height":100},"methodsExpanded":true,"values":{"_name":"interfaccia1","_visibility":"public","_importance":"alta","isInterface":"true","operations":[],"id":"497618ff-0d98-4335-815b-e22632d2558d"},"angle":0,"id":"497618ff-0d98-4335-815b-e22632d2558d","z":1,"attrs":{".uml-class-name-rect":{"height":31,"width":240,"transform":"translate(0,0)"},".uml-class-methods-rect":{"height":16,"width":240,"transform":"translate(0,31)"},".uml-class-name-text":{"text":"<<interfaccia>>\ninterfaccia1"},".uml-class-methods-text":{"text":""}}},{"type":"classDiagram.items.Class","position":{"x":160,"y":430},"size":{"width":100,"height":100},"attributesExpanded":true,"methodsExpanded":true,"values":{"_name":"classe4","_visibility":"public","_importance":"alta","isAbstract":"false","isInterface":"false","constructorList":[],"attributes":[],"operations":[],"isStatic":"false","isFinal":"false","isFrozen":"false","isReadOnly":"false","isEnum":"false","isGeneric":"false","id":"56ba4b7a-d389-4fac-af93-6ddfa571e1d9"},"angle":0,"id":"56ba4b7a-d389-4fac-af93-6ddfa571e1d9","z":1,"attrs":{".uml-class-name-rect":{"height":16,"width":215,"transform":"translate(0,0)"},".uml-class-attrs-rect":{"height":16,"width":215,"transform":"translate(0,16)"},".uml-class-methods-rect":{"height":16,"width":215,"transform":"translate(0,32)"},".uml-class-name-text":{"text":"classe4","font-style":"normal"},".uml-class-attrs-text":{"text":""},".uml-class-methods-text":{"text":""}}}],"relationshipsArray":[{"type":"classDiagram.items.Generalization","source":{"id":"37f5b8bf-e280-467a-8136-54a792ca3766"},"target":{"id":"333f6cbb-0e15-4e92-8c3b-aff299255ef2"},"id":"49e561b7-34ad-4190-960d-f870fb67e6a4","z":1,"attrs":{}},{"type":"classDiagram.items.Implementation","source":{"id":"e697060b-db0e-4fe4-89ff-60695edd7efe"},"target":{"id":"497618ff-0d98-4335-815b-e22632d2558d"},"id":"f1672ca4-5145-4b53-a020-8e830779870b","z":1,"attrs":{}},{"type":"classDiagram.items.Aggregation","source":{"id":"8425da6c-0c0a-42a3-989b-5378b4200426"},"target":{"id":"37f5b8bf-e280-467a-8136-54a792ca3766"},"id":"67fd34bf-8ee3-4d48-9203-e7a05e14b3f6","z":1,"attrs":{}},{"type":"classDiagram.items.Composition","source":{"id":"e697060b-db0e-4fe4-89ff-60695edd7efe"},"target":{"id":"37f5b8bf-e280-467a-8136-54a792ca3766"},"id":"36334883-33bd-43d7-aa37-728966d58901","z":1,"attrs":{}},{"type":"classDiagram.items.Association","labels":[{"position":0.5,"attrs":{"text":{"text":"1 "}}}],"values":{"card":"1","attribute":"","id":"db44e8a8-6dff-4d32-9be7-f7b369b2dbe8"},"source":{"id":"56ba4b7a-d389-4fac-af93-6ddfa571e1d9"},"target":{"id":"37f5b8bf-e280-467a-8136-54a792ca3766"},"id":"db44e8a8-6dff-4d32-9be7-f7b369b2dbe8","z":2,"attrs":{}}]},"operations":[]}

var classObj1 = {
				"type":"classDiagram.items.Class",
				"position":{"x":580,"y":80},
				"size": {"width":100,"height":100},
				"attributesExpanded":true,
				"methodsExpanded":true,
				"values": {
					"_name":"parent",
					"_visibility":"public",
					"_importance":"alta",
					"isAbstract":"true",
					"isInterface":"false",
					"constructorList":[],
					"attributes":[],
					"operations": [ 
							{
								"_name":"meth3",
								"_visibility":"public",
								"id":"fd82cfa0-0eb5-470a-96f9-eee980bfdcef",
								"returnType":"int",
								"isStatic":"false",
								"isAbstract":"true",
								"isFinal":"false",
								"parameters": [
										{
											"_name":"par3",
											"_type":"int",
											"_default":"",
											"_direction":"in"
										}
								]
							},
							{
								"_name":"meth4",
								"_visibility":"public",
								"id":"c9098da1-9aaf-41f8-b6a7-fb0db129a28b",
								"returnType":"String",
								"isStatic":"false",
								"isAbstract":"false",
								"isFinal":"false",
								"parameters":[]
							}
					],
					"isStatic":"false",
					"isFinal":"false",
					"isFrozen":"false",
					"isReadOnly":"false",
					"isEnum":"false",
					"isGeneric":"false",
					"id":"333f6cbb-0e15-4e92-8c3b-aff299255ef2"
				},
				"angle":0,
				"id":"333f6cbb-0e15-4e92-8c3b-aff299255ef2",
				"z":1,
				"attrs":{".uml-class-name-rect":{"height":16,"width":285,"transform":"translate(0,0)"},".uml-class-attrs-rect":{"height":16,"width":285,"transform":"translate(0,16)"},".uml-class-methods-rect":{"height":31,"width":285,"transform":"translate(0,32)"},".uml-class-name-text":{"text":"parent","font-style":"italic"},".uml-class-attrs-text":{"text":""},".uml-class-methods-text":{"text":"+ meth3(par3:int):int\n+ meth4():String"}}
			
};


/* Oggetto che rappresenta un classe da codificare */
var classObj2 = {
				"type":"classDiagram.items.Class",
				"position":{"x":220,"y":220},
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
					"attributes":[
						{
							"_name":"attr1",
							"_type":"int",
							"_default":"2",
							"_visibility":"private",
							"isStatic":"false",
							"isFinal":"false"
						},
						{
							"_name":"attr2",
							"_type":"String",
							"_default":"def",
							"_visibility":"public",
							"isStatic":"true",
							"isFinal":"true"
						},
						{
							"_name":"attr3",
							"_type":"char",
							"_default":"c",
							"_visibility":"protected",
							"isStatic":"false",
							"isFinal":"false"
						}
					],
					"operations":[
						{
							"_name":"meth1",
							"_visibility":"public",
							"id":"5577d39e-83c0-45e3-bf02-9d7d969a8a31",
							"returnType":"int",
							"isStatic":"true",
							"isAbstract":"false",
							"isFinal":"false",
							"parameters":[
								{
									"_name":"par1",
									"_type":"int",
									"_default":"",
									"_direction":"in"
								},
								{
									"_name":"par2",
									"_type":"char",
									"_default":"",
									"_direction":"in"
								}
							]
						},
						{
							"_name":"meth2",
							"_visibility":"protected",
							"id":"91baa6dc-aa26-4f71-80c7-b56666ed27ef",
							"returnType":"String",
							"isStatic":"false",
							"isAbstract":"false",
							"isFinal":"true",
							"parameters":[]
						}
					],
				"isStatic":"true","isFinal":"true","isFrozen":"false","isReadOnly":"false","isEnum":"false","isGeneric":"false","id":"37f5b8bf-e280-467a-8136-54a792ca3766"
				},
				"angle":0,
				"id":"37f5b8bf-e280-467a-8136-54a792ca3766",
				"z":1,
				"attrs":{".uml-class-name-rect":{"height":16,"width":335,"transform":"translate(0,0)"},".uml-class-attrs-rect":{"height":46,"width":335,"transform":"translate(0,16)"},".uml-class-methods-rect":{"height":31,"width":335,"transform":"translate(0,62)"},".uml-class-name-text":{"text":"classe1","font-style":"normal"},".uml-class-attrs-text":{"text":"- attr1:int\n+ attr2:String\n# attr3:char"},".uml-class-methods-text":{"text":"+ meth1(par1:int,par2:char):int\n# meth2():String"}}
			
};

var classObj3 = {
				"type":"classDiagram.items.Class",
				"position":{"x":480,"y":430},
				"size":{"width":100,"height":100},
				"attributesExpanded":true,
				"methodsExpanded":true,
				"values":{"_name":"classe2","_visibility":"public","_importance":"alta","isAbstract":"false","isInterface":"false","constructorList":[],"attributes":[],"operations":[],"isStatic":"false","isFinal":"false","isFrozen":"false","isReadOnly":"false","isEnum":"false","isGeneric":"false","id":"8425da6c-0c0a-42a3-989b-5378b4200426"},
				"angle":0,
				"id":"8425da6c-0c0a-42a3-989b-5378b4200426",
				"z":1,
				"attrs":{".uml-class-name-rect":{"height":16,"width":215,"transform":"translate(0,0)"},".uml-class-attrs-rect":{"height":16,"width":215,"transform":"translate(0,16)"},".uml-class-methods-rect":{"height":16,"width":215,"transform":"translate(0,32)"},".uml-class-name-text":{"text":"classe2","font-style":"normal"},".uml-class-attrs-text":{"text":""},".uml-class-methods-text":{"text":""}}
			};

var classObj4 = {
				"type":"classDiagram.items.Class",
				"position":{"x":960,"y":290},
				"size":{"width":100,"height":100},
				"attributesExpanded":true,
				"methodsExpanded":true,
				"values":{"_name":"classe3","_visibility":"public","_importance":"alta","isAbstract":"false","isInterface":"false","constructorList":[],"attributes":[],"operations":[],"isStatic":"false","isFinal":"false","isFrozen":"false","isReadOnly":"false","isEnum":"false","isGeneric":"false","id":"e697060b-db0e-4fe4-89ff-60695edd7efe"},
				"angle":0,
				"id":"e697060b-db0e-4fe4-89ff-60695edd7efe",
				"z":1,
				"attrs":{".uml-class-name-rect":{"height":16,"width":215,"transform":"translate(0,0)"},".uml-class-attrs-rect":{"height":16,"width":215,"transform":"translate(0,16)"},".uml-class-methods-rect":{"height":16,"width":215,"transform":"translate(0,32)"},".uml-class-name-text":{"text":"classe3","font-style":"normal"},".uml-class-attrs-text":{"text":""},".uml-class-methods-text":{"text":""}}
			};

var classObj5 = {
	
				"type":"classDiagram.items.Interface",
				"position":{"x":980,"y":130},
				"size":{"width":100,"height":100},
				"methodsExpanded":true,
				"values":{"_name":"interfaccia1","_visibility":"public","_importance":"alta","isInterface":"true","operations":[],"id":"497618ff-0d98-4335-815b-e22632d2558d"},
				"angle":0,
				"id":"497618ff-0d98-4335-815b-e22632d2558d",
				"z":1,
				"attrs":{".uml-class-name-rect":{"height":31,"width":240,"transform":"translate(0,0)"},".uml-class-methods-rect":{"height":16,"width":240,"transform":"translate(0,31)"},".uml-class-name-text":{"text":"<<interfaccia>>\ninterfaccia1"},".uml-class-methods-text":{"text":""}}
			};

var classObj6 = {
				"type":"classDiagram.items.Class",
				"position":{"x":160,"y":430},
				"size":{"width":100,"height":100},
				"attributesExpanded":true,
				"methodsExpanded":true,
				"values":{"_name":"classe4","_visibility":"public","_importance":"alta","isAbstract":"false","isInterface":"false","constructorList":[],"attributes":[],"operations":[],"isStatic":"false","isFinal":"false","isFrozen":"false","isReadOnly":"false","isEnum":"false","isGeneric":"false","id":"56ba4b7a-d389-4fac-af93-6ddfa571e1d9"},
				"angle":0,
				"id":"56ba4b7a-d389-4fac-af93-6ddfa571e1d9",
				"z":1,
				"attrs":{".uml-class-name-rect":{"height":16,"width":215,"transform":"translate(0,0)"},".uml-class-attrs-rect":{"height":16,"width":215,"transform":"translate(0,16)"},".uml-class-methods-rect":{"height":16,"width":215,"transform":"translate(0,32)"},".uml-class-name-text":{"text":"classe4","font-style":"normal"},".uml-class-attrs-text":{"text":""},".uml-class-methods-text":{"text":""}}
			}

/* 	Viene chiamata la funzione statica di CoderClass che traduce l'oggetto in input
 * 	nella corrispondente stringa, del codice sorgente in linguaggio Java, relativa all'intestazione della
 * 	classe in input. 
 */
console.log("Risultato funzione codeElementJava(classObj)");
console.log(coderClass.codeElementJava(classObj1,parsedProgram));
console.log(coderClass.codeElementJava(classObj2,parsedProgram));
console.log(coderClass.codeElementJava(classObj3,parsedProgram));
console.log(coderClass.codeElementJava(classObj4,parsedProgram));
console.log(coderClass.codeElementJava(classObj5,parsedProgram));
console.log(coderClass.codeElementJava(classObj6,parsedProgram));
console.log("");

/* 	Viene chiamata la funzione statica di CoderClass che traduce l'oggetto in input
 * 	nella corrispondente stringa, del codice sorgente in linguaggio Javascript, relativa all'intestazione della
 * 	classe in input. 
 */
console.log("Risultato funzione codeElementJavascript(classObj)");
console.log(coderClass.codeElementJavascript(classObj1,parsedProgram));
console.log(coderClass.codeElementJavascript(classObj2,parsedProgram));
console.log(coderClass.codeElementJavascript(classObj3,parsedProgram));
console.log(coderClass.codeElementJavascript(classObj4,parsedProgram));
console.log(coderClass.codeElementJavascript(classObj6,parsedProgram));

console.log("");

