/**
 *	@module Contiene JavascriptCoder
 *	@author Sanna Giovanni - KaleidosCode
 *	@summary Espone le funzionalità per codificare in Javascript un oggetto che rappresenta un programma.
 *
 *	@require ./CoderElement/coderClass.js
 *	@require ./CoderElement/coderAttribute.js
 *	@require ./CoderElement/coderOperation.js
 *	@require ./CoderElement/coderParameter.js
 *	@require ./CoderElement/coderActivity.js
 *	@require ./class.js
 *	@require ./codedProgram.js
 */

var CoderClass = require('./CoderElement/coderClass.js');
var CoderAttribute = require('./CoderElement/coderAttribute.js');
var CoderOperation = require('./CoderElement/coderOperation.js');
var CoderParameter = require('./CoderElement/coderParameter.js');
var CoderActivity = require('./CoderElement/coderActivity.js');
var Class = require('./class.js');
var CodedProgram = require('./codedProgram.js');



/** 
*	@namespace
*	@description oggetto che espone le funzionalità (statiche) che permettono di codificare,
*	in linguaggio Javascript, un oggetto che rappresenta un programma.
*/
var JavascriptCoder = function() { };

/*
coderParameters
funzione statica di JavascriptCoder che, dato un oggetto che rappresenta un'operazione, restituisce
la stringa contenente la lista di parametri dell'operazione.
i.e.  " param1,param2,paramN="defaultValue" "
*/

/**
*	@function JavascriptCoder.coderParameters
*	@static
*	@param {!Object} operationObj - Oggetto che contiene le informazioni necessarie a codificare una funzione.
*	@return {String} source - Stringa del codice sorgente, in Javascript, relativo alla lista completa dei parametri dell'oggetto di input
*	@description funzione statica di JavascriptCoder; riceve in input operationObj, un oggetto che rappresenta una funzione; 
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
}

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
*	@param {!Object} classObj - Oggetto che contiene le informazioni necessarie a codificare una classe.
*	@return {String} source - Stringa del codice sorgente, in Javascript, relativo alla lista completa degli attributi non statici
*	dell'oggetto di input.
*	@description funzione statica di JavascriptCoder; riceve in input classObj, un oggetto che rappresenta una classe; 
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
} 

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
*	@param {!Object} classObj - Oggetto che contiene le informazioni necessarie a codificare una classe.
*	@return {String} source - Stringa del codice sorgente (definizione e implementazione), in Javascript, relativo a tutte le 
*	funzioni non statiche dell'oggetto di input.
*	@description funzione statica di JavascriptCoder; riceve in input classObj, un oggetto che rappresenta una classe; 
*	restituisce la stringa del codice sorgente, in Javascript, di tutte le funzioni non statiche di classObj di input. Tale funzione 
*	non viene esportata dal modulo.
*/
JavascriptCoder.coderInstanceOperations = function(classObj) {
	source = "";
	var opers = classObj.values.operations; // array dei metodi della classe
	for(var y=0; y<opers.length; y++) {
		if(opers[y].isStatic == "false") {
			source += CoderOperation.codeElementJavascript(opers[y]);
			source += "("; 											// apre la lista dei parametri		
			source += JavascriptCoder.coderParameters(opers[y]);					
			source += ") \n { \n"; 									// chiude la lista dei parametri e apre l'implementazione
			//source += CoderActivity.codeElementJavascript(opers[y]); // gli passo tutta l'operazione o basta il suo oggetto activity?
			source += "} \n"; 										// chiude l'implementazione dell'operazione
		}		
	}
	return source;
}

/*
coderStaticAttributes
funzione statica di JavascriptCoder che, dato un oggetto che rappresenta una classe, restituisce
la stringa contenente gli attributi statici della classe.
i.e.  " className.attributeName = "attributeValue" "
*/

/**
*	@function JavascriptCoder.coderStaticAttributes
*	@static
*	@param {!Object} classObj - Oggetto che contiene le informazioni necessarie a codificare una classe.
*	@return {String} source - Stringa del codice sorgente, in Javascript, relativo alla lista completa degli attributi statici
*	dell'oggetto di input.
*	@description funzione statica di JavascriptCoder; riceve in input classObj, un oggetto che rappresenta una classe; 
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
} 

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
*	@param {!Object} classObj - Oggetto che contiene le informazioni necessarie a codificare una classe.
*	@return {String} source - Stringa del codice sorgente (definizione e implementazione), in Javascript, relativo a tutte le 
*	funzioni statiche dell'oggetto di input.
*	@description funzione statica di JavascriptCoder; riceve in input classObj, un oggetto che rappresenta una classe; 
*	restituisce la stringa del codice sorgente, in Javascript, di tutte le funzioni statiche di classObj di input. Tale funzione 
*	non viene esportata dal modulo.
*/
JavascriptCoder.coderStaticOperations = function(classObj) {
	source = "";
	var opers = classObj.values.operations; // array dei metodi della classe
	for(var y=0; y<opers.length; y++) {
		if(opers[y].isStatic == "true") {
			source += CoderOperation.codeElementJavascript(opers[y],classObj.values._name);
			source += "("; // apre la lista dei parametri			
			source += JavascriptCoder.coderParameters(opers[y]);					
			source += ") \n { \n"; // chiude la lista dei parametri e apre l'implementazione
			//source += CoderActivity.codeElementJavascript(opers[y]); // gli passo tutta l'operazione o basta il suo oggetto activity?
			source += "} \n"; // chiude l'implementazione dell'operazione
		}		
	}
	return source;
}

JavascriptCoder.getCodedProgram = function(parsedProgram) {
		var codedP = new CodedProgram();
		var classes = parsedProgram.classes.classesArray; // array delle classi
		for(var i=0; i<classes.length; i++) {
			var items = classes[i].items;
			for(var j=0; j<items.length; j++) {
				var source = "";
				source += CoderClass.codeElementJavascript(items[j],parsedProgram); // restituisce l'intestazione della classe
				source += "\n { \n"; // apre la definizione della classe	

				if(items[j].values.isInterface == "false"){		//   *** lanciare eccezione? ***
					source += JavascriptCoder.coderInstanceAttributes(items[j]);	
				}		

				source += JavascriptCoder.coderInstanceOperations(items[j]);

				if(items[j].values.isFrozen == "true" || items[j].values.isReadOnly == "true") {
					source += "\n var freeze = function() { \n Object.freeze(this); \n }(); \n";									
				}

				source += "} \n"; // chiude l'implementazione della classe

				if(items[j].values.isInterface == "false"){ //   *** lanciare eccezione? ***
					source += JavascriptCoder.coderStaticAttributes(items[j]);
				}

				source += JavascriptCoder.coderStaticOperations(items[j]);
				source += CoderClass.codeParentJavascript(items[j].id,parsedProgram);

				codedP.add(new Class(items[j].values._name, source, "", items[j].file, items[j].dependencies));		
			}
		}
		return codedP;	
}

module.exports = {
	getCodedProgram : JavascriptCoder.getCodedProgram
};