
var CoderOperation = function() { }

CoderOperation.codeElementJava = function(operationObj) {
		var source = "";

		// visibilità del metodo
		if(operationObj._visibility != 'package') {
			source += operationObj._visibility + " ";
		}

		// proprietà del metodo (abstract, static, final, synchronized)
		if(operationObj.isAbstract) {
			source += "abstract ";
		}
		if(operationObj.isStatic) {
			source += "static ";
		}
		if(operationObj.isFinal) {
			source += "final ";
		}
		if(operationObj.isSynchronized) {
			source += "synchronized ";
		}


		// tipo di ritorno
		source += operationObj.returnType + " ";

		// nome del metodo
		source += operationObj._name;

		return source;
	};

CoderOperation.codeElementJavascript = function(operationObj, className) {
		source = "";
		if(!operationObj.isStatic){   //  funzione statica
			if(operationObj._visibility == "private") {  // funzione privata
				source += "var " + operationObj._name + " = function";
			}
			else { // funzione pubblica
				source += "this." + operationObj._name + " = function";
			}
		}
		else { // funzione d'istanza
			source += className + "." + operationObj._name + "= function";
		}	
		return source;	
}


module.exports = CoderOperation;