
var CoderClass = require('./CoderElement/coderClass.js');
var CoderAttribute = require('./CoderElement/coderAttribute.js');
var CoderOperation = require('./CoderElement/coderOperation.js');
var CoderParameter = require('./CoderElement/coderParameter.js');
var CoderActivity = require('./CoderElement/coderActivity.js');
var Class = require('./class.js');
var CodedProgram = require('./codedProgram.js');


var JavascriptCoder = function() { };

JavascriptCoder.getCodedProgram = function(parsedProgram) {
		var codedP = new CodedProgram();

		var classes = parsedProgram.classes; // array delle classi
		for(var i=0; i<classes.length; i++) {
			var source = "";
			source += CoderClass.codeElementJavascript(classes[i]); // restituisce l'intestazione della classe
			source += "{"; // apre la definizione della classe
			
			var attrs = classes[i].attributes; // array degli attributi della classe classes[i]			
			for(var x=0; x<attrs.length; x++) {
				if(!attrs[x].isStatic) {
					source += CoderAttribute.codeElementJavascript(attrs[x]);
				}
			}
			
			var opers = classes[i].operations; // array dei metodi della classe
			for(var y=0; y<opers.length; y++) {
				if(!(opers[y].isStatic)) {
					source += CoderOperation.codeElementJavascript(opers[y]);
					source += "("; // apre la lista dei parametri
					
					var params = opers[y].parameters; // array dei parametri dell'operazione
					for(var z=0; z<params.length; z++) {
						source += CoderParameter.codeElementJavascript(params[z]);
						if(z != params.length-1) { source += ","; }
					}
					
					source += ") {"; // chiude la lista dei parametri e apre l'implementazione
					//source += CoderActivity.codeElementJavascript(opers[y]); // gli passo tutta l'operazione o basta il suo oggetto activity?
					source += "}"; // chiude l'implementazione dell'operazione
				}		
			}
			
			source += "}"; // chiude l'implementazione della classe

			for(var x=0; x<attrs.length; x++) {
				if(attrs[x].isStatic) {
					source += CoderAttribute.codeElementJavascript(attrs[x],classes[i]._name);
				}
			}

			for(var y=0; y<opers.length; y++) {
				if(opers[y].isStatic) {
					source += CoderOperation.codeElementJavascript(opers[y], classes[i]._name);
					source += "("; // apre la lista dei parametri
					
					var params = opers[y].parameters; // array dei parametri dell'operazione
					for(var z=0; z<params.length; z++) {
						source += CoderParameter.codeElementJavascript(params[z]);
						if(z != params.length-1) { source += ","; }
					}
					
					source += ") {"; // chiude la lista dei parametri e apre l'implementazione
					//source += CoderActivity.codeElementJavascript(opers[y]); // gli passo tutta l'operazione o basta il suo oggetto activity?
					source += "}"; // chiude l'implementazione dell'operazione
				}		
			}
			codedP.add(new Class(classes[i]._name, source, classes[i]._package, classes[i].file, classes[i].dependencies));
		}
		return codedP;	
}

module.exports = JavascriptCoder;