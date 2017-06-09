
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
		if(!operationObj.isStatic){
			if(operationObj._visibility == "private") {
				source += "var " + operationObj._name + " = function";
			}
			else {
				source += "this." + operationObj._name + " = function";
			}
		}
		else {
			source += className + "." + operationObj._name + "= function";
		}	
		return source;	
}


module.exports = CoderOperation;