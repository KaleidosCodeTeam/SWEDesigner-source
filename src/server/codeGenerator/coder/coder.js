/**
 *	@file Contiene le classi statiche JavaCoder e JavascriptCoder.
 *	@author Sanna Giovanni - KaleidosCode
 *
 *	@requires ./CoderElement/coderClass.js
 *  @requires ./CoderElement/coderAttribute.js
 *  @requires ./CoderElement/coderOperation.js
 *  @requires ./CoderElement/coderParameter.js
 *  @requires ./CoderElement/coderActivity.js
 *  @requires ./class.js
 *  @requires ./codedProgram.js
 */

var CoderClass = require('./CoderElement/coderClass.js');
var CoderAttribute = require('./CoderElement/coderAttribute.js');
var CoderOperation = require('./CoderElement/coderOperation.js');
var CoderParameter = require('./CoderElement/coderParameter.js');
var CoderActivity = require('./CoderElement/coderActivity.js');
var Class = require('./class.js');
var CodedProgram = require('./codedProgram.js');

//------------------------------------------------------------------- JAVACODER ---------------------------------------------------------------------------
/** 
 *	@namespace
 *	@description Espone le funzionalità (statiche) che permettono di codificare,
 *	in linguaggio Java, un oggetto che rappresenta un programma.
 */
var JavaCoder = function() {};

function getPackageDependencies(packageId, packages) {
	var dependencies = new Array();
	count = 0;
	for(var i=0; i< packages.dependenciesArray.length; i++) {
		if(packages.dependenciesArray[i].source.id == packageId) {
			finded = false;
			for(var j=0; j<packages.packagesArray.length && !finded; j++) {
				if(packages.packagesArray[j].id == packages.dependenciesArray[i].target.id) {
					finded = true;
					dependencies[count] = packages.packagesArray[j].values._package;
					count++;
				}
			} 
		}
	}

	return dependencies;
};
/**
 *	@function getPackNameById
 *	@param {!string} packageId - Identificativo del package di cui si vuole ottenere il nome.
 *	@param {!Object} packages - Oggetto che contiene l'array di tutti gli oggetti package.
 *	@return {string} Nome del package corrispondente al packageId di input. 
 *	@description Ritorna il nome del package corrispondente al packageId di input.
 */
function getPackNameById(packageId, packages){
	for(var i=0; i<packages.packagesArray.length; i++) {
		if(packages.packagesArray[i].values.id == packageId) {
			return packages.packagesArray[i].values._package;
		}
	}
	return null
};
/**
 *	@function getOperationById
 *	@param {!string} operId - Identificativo dell'operazione che si vuole ottenere.
 *	@param {!Object[]} operations - L'array di tutti i diagrammi delle bubble.
 *	@return {Object} Diagramma delle bubble corrispondente all'operId di input. 
 *	@description Ritorna il diagramma delle bubble corrispondente all'operId di input.
 */
function getOperationById(operId, operations) {
	for(var i=0; i<operations.length; i++) {
		if(operations[i].id == operId) {
			return operations[i];
		}
	}
	return null;
};
/**
 *	@function JavaCoder.coderParameters
 *	@static
 *	@param {!Object} operationObj - Le informazioni necessarie a codificare un metodo.
 *	@return {string} Stringa del codice sorgente, in Java, relativo alla lista completa dei parametri dell'oggetto di input.
 *	@description Riceve in input operationObj, un oggetto che rappresenta un metodo; 
 *	restituisce la stringa del codice sorgente, in Java, della lista dei parametri del metodo operationObj di input. Tale funzione 
 *	non viene esportata dal modulo.
 */
JavaCoder.coderParameters = function(operationObj) {
	source = "";
	var params = operationObj.parameters; // array dei parametri dell'operazione
	for(var z=0; z<params.length; z++) {
		source += CoderParameter.codeElementJava(params[z]);
		if(z != params.length-1) { source += ","; }
	}
	return source;
};
/**
 *	@function JavaCoder.coderAttributes
 *	@static
 *	@param {!Object} classObj - Le informazioni necessarie a codificare una classe.
 *	@return {string} Stringa del codice sorgente, in Java, relativo alla lista completa degli attributi dell'oggetto di input.
 *	@description Riceve in input classObj, un oggetto che rappresenta una classe; 
 *	restituisce la stringa del codice sorgente, in Java, di tutti gli attributi di classObj di input. Tale funzione 
 *	non viene esportata dal modulo.
 */
JavaCoder.coderAttributes = function(classObj) {
	source = "";
	var attrs = classObj.values.attributes; // array degli attributi della classe classes[i]
	for(var x=0; x<attrs.length; x++) {
		source += CoderAttribute.codeElementJava(attrs[x]) + "\n";
	}
	return source;
};
/**
 *	@function JavaCoder.coderOperations
 *	@static
 *	@param {!Object} classObj - Le informazioni necessarie a codificare una classe.
 *	@return {string} Stringa del codice sorgente (definizione e implementazione), in Java, relativo a tutti i 
 *	metodi dell'oggetto di input.	 
 *	@description Riceve in input classObj, un oggetto che rappresenta una classe; 
 *	restituisce la stringa del codice sorgente, in Java, (definizione e implementazione) di tutti i metodi di classObj di input. 
 *	Tale funzione non viene esportata dal modulo.
 */
JavaCoder.coderOperations = function(classObj,operations) {
	source = "";
	var opers = classObj.values.operations; // array dei metodi della classe
	for(var y=0; y<opers.length; y++) {
		source += CoderOperation.codeElementJava(opers[y]);
		source += "("; // apre la lista dei parametri		
		source += JavaCoder.coderParameters(opers[y]);				
		source += ")"; 
		if(opers[y].isAbstract == "true" || classObj.type == "classDiagram.items.Interface") {
			source += "; \n";
		}
		else {
			source += " { \n";
			var finded = false;
			for(var i=0; i<operations.length && !finded; i++) {
				if(opers[y].id == operations[i].id) {
					finded = true;
					source += CoderActivity.codeElementJava(operations[i]); 
				}
			}
			source += " \n }; \n";
		}		
	}
	return source;
};
/**
 *	@function JavaCoder.getCodedProgram
 *	@static
 *	@param {!Object} parsedProgram - Le informazioni necessarie a codificare un programma in linguaggio Java.
 *	@return {Object} Istanza di CodedProgram, contenente il codice sorgente in Java corrispondente all'oggetto parsedProgram
 *	di input, più le informazioni necessarie per organizzare i vari file.	 
 *	@description Riceve in input parsedProgram, un oggetto che rappresenta un programma; 
 *	restituisce un oggetto istanza di CodedProgram, contente il codice sorgente in Java di tutte le classi presenti nell'oggetto 
 *	parsedProgram di input. Questa funzione viene esportata dal modulo.
 */
JavaCoder.getCodedProgram = function(parsedProgram) {
		var codedP = new CodedProgram();
		
		/* --- parsedProgram.classes chiave riservata, da modificare --- */
		var classes = parsedProgram.classes.classesArray; // array delle classi
		for(var i=0; i<classes.length; i++) {
			var packageId = classes[i].id;
			var packageName = getPackNameById(packageId, parsedProgram.packages);
			var items = classes[i].items;
			for(var j=0; j<items.length; j++) {
				var source = "";
				source += CoderClass.codeElementJava(items[j],parsedProgram); // restituisce l'intestazione della classe
				source += "\n { \n"; // apre la definizione della classe	
				if(items[j].values.isInterface == "false"){
					source += JavaCoder.coderAttributes(items[j]);
				}								
				source += JavaCoder.coderOperations(items[j],parsedProgram.operations);
				source += "};"; // chiude l'implementazione della classe
				codedP.add(new Class(items[j].values._name, source, packageName, items[j]._name, getPackageDependencies(classes[i].id, parsedProgram.packages)));
			}			
		}
		return codedP;
};

//------------------------------------------------------------------ JAVASCRIPTCODER ----------------------------------------------------------------------
/** 
 *	@namespace
 *	@description Espone le funzionalità (statiche) che permettono di codificare,
 *	in linguaggio Javascript, un oggetto che rappresenta un programma.
 */
var JavascriptCoder = function() {};

/*
coderParameters
funzione statica di JavascriptCoder che, dato un oggetto che rappresenta un'operazione, restituisce
la stringa contenente la lista di parametri dell'operazione.
i.e.  " param1,param2,paramN="defaultValue" "
*/

/**
 *	@function JavascriptCoder.coderParameters
 *	@static
 *	@param {!Object} operationObj - Le informazioni necessarie a codificare una funzione.
 *	@return {string} Stringa del codice sorgente, in Javascript, relativo alla lista completa dei parametri dell'oggetto di input.
 *	@description Riceve in input operationObj, un oggetto che rappresenta una funzione; 
 *	restituisce la stringa del codice sorgente, in Javascript, della lista dei parametri della funzione operationObj di input. Tale funzione 
 *	non viene esportata dal modulo.
 */
JavascriptCoder.coderParameters = function(operationObj){
	source = "";
	var params = operationObj.parameters; // array dei parametri dell'operazione
	for(var z=0; z<params.length; z++) {
		source += CoderParameter.codeElementJavascript(params[z]);
		if(z != params.length-1) { source += ","; }
	}
	return source;
};

/*
coderInstanceAttributes
funzione statica di JavascriptCoder che, dato un oggetto che rappresenta una classe, restituisce
la stringa contenente gli attributi non statici della classe.
i.e.  " this.attr1 = "attrValue";
		var attr2 = "attrValue";
		...	"
*/

/**
 *	@function JavascriptCoder.coderInstanceAttributes
 *	@static
 *	@param {!Object} classObj - Le informazioni necessarie a codificare una classe.
 *	@return {string} Stringa del codice sorgente, in Javascript, relativo alla lista completa degli attributi non statici
 *	dell'oggetto di input.
 *	@description Riceve in input classObj, un oggetto che rappresenta una classe; 
 *	restituisce la stringa del codice sorgente, in Javascript, di tutti gli attributi non statici di classObj di input. Tale funzione 
 *	non viene esportata dal modulo.
 */
JavascriptCoder.coderInstanceAttributes = function(classObj) {
	var source = "";
	var attrs = classObj.values.attributes; // array degli attributi della classe classes[i]			
	for(var x=0; x<attrs.length; x++) {
		if(!attrs[x].isStatic == "true") {
			source += CoderAttribute.codeElementJavascript(attrs[x]) + "\n";
		}
	}
	return source;
};

/*
coderInstanceOperations
funzione statica di JavascriptCoder che, dato un oggetto che rappresenta una classe, restituisce
la stringa contenente le operazioni non statiche della classe.
i.e.  " this.doStuff = function() { } 
		var getName = function(param2,param3=5) { } "
*/

/**
 *	@function JavascriptCoder.coderInstanceOperations
 *	@static
 *	@param {!Object} classObj - Le informazioni necessarie a codificare una classe.
 *	@return {string} Stringa del codice sorgente (definizione e implementazione), in Javascript, relativo a tutte le 
 *	funzioni non statiche dell'oggetto di input.
 *	@description Riceve in input classObj, un oggetto che rappresenta una classe; 
 *	restituisce la stringa del codice sorgente, in Javascript, di tutte le funzioni non statiche di classObj di input. Tale funzione 
 *	non viene esportata dal modulo.
 */
JavascriptCoder.coderInstanceOperations = function(classObj, operations) {
	source = "";
	var opers = classObj.values.operations;	// array dei metodi della classe
	for(var y=0; y<opers.length; y++) {
		if(opers[y].isStatic == "false") {
			source += CoderOperation.codeElementJavascript(opers[y]);
			source += "("; 												// apre la lista dei parametri		
			source += JavascriptCoder.coderParameters(opers[y]);					
			source += ") \n { \n";
			var operation = getOperationById(opers[y].id,operations);	// chiude la lista dei parametri e apre l'implementazione
			if(operation && operation.items.length>0) {
				source += CoderActivity.codeElementJavascript(operation.items);
			}
			source += "} \n"; 											// chiude l'implementazione dell'operazione
		}		
	}
	return source;
};

/*
coderStaticAttributes
funzione statica di JavascriptCoder che, dato un oggetto che rappresenta una classe, restituisce
la stringa contenente gli attributi statici della classe.
i.e.  " className.attributeName = "attributeValue" "
*/

/**
 *	@function JavascriptCoder.coderStaticAttributes
 *	@static
 *	@param {!Object} classObj - Le informazioni necessarie a codificare una classe.
 *	@return {string} Stringa del codice sorgente, in Javascript, relativo alla lista completa degli attributi statici
 *	dell'oggetto di input.
 *	@description Riceve in input classObj, un oggetto che rappresenta una classe; 
 *	restituisce la stringa del codice sorgente, in Javascript, di tutti gli attributi statici di classObj di input. Tale funzione 
 *	non viene esportata dal modulo.
 */
JavascriptCoder.coderStaticAttributes = function(classObj) {
	var source = "";
	var attrs = classObj.values.attributes; // array degli attributi della classe classes[i]			
	for(var x=0; x<attrs.length; x++) {
		if(attrs[x].isStatic == "true") {
			source += CoderAttribute.codeElementJavascript(attrs[x],classObj.values._name) + "\n";
		}
	}
	return source;
};

/*
coderStaticOperations
funzione statica di JavascriptCoder che, dato un oggetto che rappresenta una classe, restituisce
la stringa contenente le operazioni statiche della classe.
i.e.  " className1.functionName1 = function() { }
		className2.functionName2 = function(param2,param3=5) { } "
*/

/**
 *	@function JavascriptCoder.coderStaticOperations
 *	@static
 *	@param {!Object} classObj - Le informazioni necessarie a codificare una classe.
 *	@return {string} Stringa del codice sorgente (definizione e implementazione), in Javascript, relativo a tutte le 
 *	funzioni statiche dell'oggetto di input.
 *	@description Riceve in input classObj, un oggetto che rappresenta una classe; 
 *	restituisce la stringa del codice sorgente, in Javascript, di tutte le funzioni statiche di classObj di input. Tale funzione 
 *	non viene esportata dal modulo.
 */
JavascriptCoder.coderStaticOperations = function(classObj, operations) {
	source = "";
	var opers = classObj.values.operations; // array dei metodi della classe
	for(var y=0; y<opers.length; y++) {
		if(opers[y].isStatic == "true") {
			source += CoderOperation.codeElementJavascript(opers[y],classObj.values._name);
			source += "("; // apre la lista dei parametri			
			source += JavascriptCoder.coderParameters(opers[y]);					
			source += ") \n { \n"; // chiude la lista dei parametri e apre l'implementazione
			var operation = getOperationById(opers[y].id, operations);
			if(operation && operation.items.length>0) {
				source += CoderActivity.codeElementJavascript(operation.items);
			}
			source += "} \n"; // chiude l'implementazione dell'operazione
		}		
	}
	return source;
};

/**
 *	@function JavascriptCoder.getCodedProgram
 *	@static
 *	@param {!Object} parsedProgram - Le informazioni necessarie a codificare un programma in linguaggio Javascript.
 *	@return {codedProgram} Istanza di CodedProgram, contenente il codice sorgente in Javascript corrispondente all'oggetto parsedProgram
 *	di input, più le informazioni necessarie per organizzare i vari file.	 
 *	@description Riceve in input parsedProgram, un oggetto che rappresenta un programma; 
 *	restituisce un oggetto istanza di CodedProgram, contente il codice sorgente in Javascript di tutte le classi presenti nell'oggetto 
 *	parsedProgram di input. Questa funzione viene esportata dal modulo.
 */
JavascriptCoder.getCodedProgram = function(parsedProgram) {
		var codedP = new CodedProgram();
		var classes = parsedProgram.classes.classesArray; // array delle classi
		for(var i=0; i<classes.length; i++) {
			var packageId = classes[i].id;
			var packageName = getPackNameById(packageId, parsedProgram.packages);
			var items = classes[i].items;
			for(var j=0; j<items.length; j++) {
				var source = "";
				source += CoderClass.codeElementJavascript(items[j],parsedProgram); // restituisce l'intestazione della classe
				source += "\n { \n"; // apre la definizione della classe	

				if(items[j].values.isInterface == "false"){		//   *** lanciare eccezione? ***
					source += JavascriptCoder.coderInstanceAttributes(items[j]);	
				}		

				source += JavascriptCoder.coderInstanceOperations(items[j], parsedProgram.operations);

				if(items[j].values.isFrozen == "true" || items[j].values.isReadOnly == "true") {
					source += "\n var freeze = function() { \n Object.freeze(this); \n }(); \n";									
				}

				source += "} \n"; // chiude l'implementazione della classe

				if(items[j].values.isInterface == "false"){ //   *** lanciare eccezione? ***
					source += JavascriptCoder.coderStaticAttributes(items[j]);
				}

				source += JavascriptCoder.coderStaticOperations(items[j], parsedProgram.operations);
				source += CoderClass.codeParentJavascript(items[j].id,parsedProgram);

				codedP.add(new Class(items[j].values._name, source, packageName, packageName, items[j].dependencies));		
			}
		}
		return codedP;	
};

/** Esportazione dei moduli */
module.exports = {
	getCodedProgramJs : JavascriptCoder.getCodedProgram,
	getCodedProgramJava : JavaCoder.getCodedProgram
};