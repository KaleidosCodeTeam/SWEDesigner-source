
var CoderClass = require('./CoderElement/coderClass.js');
var CoderAttribute = require('./CoderElement/coderAttribute.js');
var CoderOperation = require('./CoderElement/coderOperation.js');
var CoderParameter = require('./CoderElement/coderParameter.js');
var CoderActivity = require('./CoderElement/coderActivity.js');
var Class = require('./class.js');
var CodedProgram = require('./codedProgram.js');




var JavascriptCoder = function() { };

/*
codeParameters
funzione statica di JavascriptCoder che, dato un oggetto che rappresenta un'operazione, restituisce
la stringa contenente la lista di parametri dell'operazione.
i.e.  " param1,param2,paramN="defaultValue" "
*/
JavascriptCoder.codeParameters = function(operationObj){
	source = "";
	var params = operationObj.parameters; // array dei parametri dell'operazione
	for(var z=0; z<params.length; z++) {
		source += CoderParameter.codeElementJavascript(params[z]);
		if(z != params.length-1) { source += ","; }
	}
	return source;
}

/*
codeInstanceAttributes
funzione statica di JavascriptCoder che, dato un oggetto che rappresenta una classe, restituisce
la stringa contenente gli attributi non statici della classe.
i.e.  " this.attr1 = "attrValue";
		var attr2 = "attrValue";
		...	"
*/
JavascriptCoder.codeInstanceAttributes = function(classObj) {
	var source = "";
	var attrs = classObj.attributes; // array degli attributi della classe classes[i]			
	for(var x=0; x<attrs.length; x++) {
		if(!attrs[x].isStatic) {
			source += CoderAttribute.codeElementJavascript(attrs[x]) + "\n";
		}
	}
	return source;
} 

/*
codeInstanceOperations
funzione statica di JavascriptCoder che, dato un oggetto che rappresenta una classe, restituisce
la stringa contenente le operazioni non statiche della classe.
i.e.  " this.doStuff = function() { } 
		var getName = function(param2,param3=5) { } "
*/
JavascriptCoder.codeInstanceOperations = function(classObj) {
	source = "";
	var opers = classObj.operations; // array dei metodi della classe
	for(var y=0; y<opers.length; y++) {
		if(!(opers[y].isStatic)) {
			source += CoderOperation.codeElementJavascript(opers[y]);
			source += "("; 											// apre la lista dei parametri		
			source += JavascriptCoder.codeParameters(opers[y]);					
			source += ") \n { \n"; 									// chiude la lista dei parametri e apre l'implementazione
			//source += CoderActivity.codeElementJavascript(opers[y]); // gli passo tutta l'operazione o basta il suo oggetto activity?
			source += "} \n"; 										// chiude l'implementazione dell'operazione
		}		
	}
	return source;
}

/*
codeStaticAttributes
funzione statica di JavascriptCoder che, dato un oggetto che rappresenta una classe, restituisce
la stringa contenente gli attributi statici della classe.
i.e.  " className.attributeName = "attributeValue" "
*/
JavascriptCoder.codeStaticAttributes = function(classObj) {
	var source = "";
	var attrs = classObj.attributes; // array degli attributi della classe classes[i]			
	for(var x=0; x<attrs.length; x++) {
		if(attrs[x].isStatic) {
			source += CoderAttribute.codeElementJavascript(attrs[x],classObj._name) + "\n";
		}
	}
	return source;
} 

/*
codeStaticOperations
funzione statica di JavascriptCoder che, dato un oggetto che rappresenta una classe, restituisce
la stringa contenente le operazioni statiche della classe.
i.e.  " className1.functionName1 = function() { }
		className2.functionName2 = function(param2,param3=5) { } "
*/
JavascriptCoder.codeStaticOperations = function(classObj) {
	source = "";
	var opers = classObj.operations; // array dei metodi della classe
	for(var y=0; y<opers.length; y++) {
		if(opers[y].isStatic) {
			source += CoderOperation.codeElementJavascript(opers[y],classObj._name);
			source += "("; // apre la lista dei parametri			
			source += JavascriptCoder.codeParameters(opers[y]);					
			source += ") \n { \n"; // chiude la lista dei parametri e apre l'implementazione
			//source += CoderActivity.codeElementJavascript(opers[y]); // gli passo tutta l'operazione o basta il suo oggetto activity?
			source += "} \n"; // chiude l'implementazione dell'operazione
		}		
	}
	return source;
}

JavascriptCoder.getCodedProgram = function(parsedProgram) {
		var codedP = new CodedProgram();
		var classes = parsedProgram.classes; // array delle classi
		for(var i=0; i<classes.length; i++) {
			var source = "";
			source += CoderClass.codeElementJavascript(classes[i]); // restituisce l'intestazione della classe
			source += "\n { \n"; // apre la definizione della classe			
			source += JavascriptCoder.codeInstanceAttributes(classes[i]);			
			source += JavascriptCoder.codeInstanceOperations(classes[i]);		
			source += "} \n"; // chiude l'implementazione della classe
			source += JavascriptCoder.codeStaticAttributes(classes[i]);
			source += JavascriptCoder.codeStaticOperations(classes[i]);
			source += CoderClass.codeParentJavascript(classes[i]);

			codedP.add(new Class(classes[i]._name, source, classes[i]._package, classes[i].file, classes[i].dependencies));
		}
		return codedP;	
}

module.exports = {
	getCodedProgram : JavascriptCoder.getCodedProgram
};