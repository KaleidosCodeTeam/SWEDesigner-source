
var CoderParameter = function() {

}

coderParameter.codeElementJava = function(parameterObj) {
	source = parameterObj._type + " " + parameterObj._name;
	if(parameterObj._default) {
		source += "=" + parameterObj._default;
	}
	return source;
}

coderParameter.codeElementJavascript = function(parameterObj) {
	source = parameterObj._name;
	if(parameterObj._default) {
		source += "=" + parameterObj._default;
	}
	return source;
}

module.exports = CoderParameter;