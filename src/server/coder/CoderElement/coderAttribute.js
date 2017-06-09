/*
Contiene CoderAttribute, oggetto che espone le funzionalità (statiche) che permettono di codificare
un attributo, rappresentato dall'oggetto attributeObj in input, in Java (CoderAttribute.codeElementJava)
o Javascript (CoderAttribute.codeElementJavascript); entrambe le funzioni restituiscono 
la stringa del codice sorgente nel linguaggio scelto.
*/

var CoderAttribute = function() {};

/*
codeElementJava
funzione statica di CoderAttribute; riceve in input attributeObj, un oggetto che rappresenta un attributo 
di classe; restituisce la stringa del codice sorgente, in Java, dell'attributo di input.
Tale stinga è formata dalla visibilità, dalle keyword static e final (se specificate), dal tipo, dal nome
e dal valore di default dell'oggetto attributo di input.
*/
CoderAttribute.codeElementJava = function(attributeObj) {
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

/*
codeElementJavascript
funzione statica di CoderAttribute; riceve in input attributeObj, un oggetto che rappresenta un attributo 
di classe; restituisce la stringa del codice sorgente, in Javascript, dell'attributo di input.
La sintassi Javascript di un attributo cambia se esso è statico o d'istanza, in quest'ultimo caso inoltre 
la sintassi è differente nel caso sia un attributo d'istanza privato oppure pubblico. Infine viene aggiunto 
il valore di default.
*/
CoderAttribute.codeElementJavascript = function(attributeObj, className) {
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

module.exports = CoderAttribute;