
var CodeAttribute = function() {};

CodeAttribute.codeElementJava = function(attributeObj) {
	source = "";

	// visibilità del metodo
	if(attributeObj._visibility != 'package') {
		source += attributeObj._visibility + " ";
	}

	if(attributeObj.isStatic) {
		source += "static ";
	}

	if(attributeObj.isFinal) {
		source += "final ";
	}

	source += attributeObj._type + " " + attributeObj._name + " ";

	if(attributeObj._default) {
		if(attributeObj._type == "String"){
			source += " = \"" + attributeObj._default +"\"";
		}
		else {
			source += " = " + attributeObj._default;
		}
	}
		

	source += ";";

	return source;
}

CodeAttribute.codeElementJavascript = function(attributeObj, className) {
		source = "";
		if(!attributeObj.isStatic){
			if(attributeObj._visibility == "private") {
				source += "var " + attributeObj._name + " = ";
			}
			else {
				source += "this." + attributeObj._name + " = ";
			}
		}
		else {
			source += className + "." + attributeObj._name + " = ";
		}	

		if(attributeObj._default) {
			if(attributeObj._type == "String"){
				source += "\"" + attributeObj._default + "\";";
			}
			else {
				source += attributeObj._default + ";";
			}				
		}
		else {
			source += "null;";
		}

		return source;	
}

module.exports = CodeAttribute;