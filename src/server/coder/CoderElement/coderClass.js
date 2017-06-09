

var CoderClass = function() {
	
}

CoderClass.codeElementJava = function(classObj) {
		var source = "";

		// visibilità della classe
		if(classObj._visibility != 'package') {
			source += classObj._visibility+" ";
		}

		// se la classe è astratta si aggiunge la relativa keyword
		if(classObj.isAbstract) {
			source += "abstract ";
		}

		// se la classe è un'interfaccia si aggiunge la relativa keyword, altrimenti si aggiunge la keyword 'class'
		// NOTA: nessun controllo d'errore nel caso la classe sia  marcata abstract ed interface  
		if(classObj.isInterface) {
			source += "interface ";
		}
		else {
			source += "class ";
		}

		// si aggiunge il nome della classe
		source += classObj._name + " ";

		// si aggiunge la classe padre, se esiste
		// dependencies è la proprietà che contiene le dipendenze OUT della classe
		// NOTA: nessun controllo d'errore nel caso ci sia più di una classe padre
		for(var i=0; i<classObj.dependencies.length; i++) { 
			if(classObj.dependencies[i]._type == 'Generalization') {
				source += "extends "+ classObj.dependencies[i]._name + " ";
			}
		}

		// di aggiungono le interfacce che implementa
		// NOTA: nessun controllo d'errore nel caso la classe padre sia effettivamente un'interfaccia
		var firstClass = true;
		for(var i=0; i<classObj.dependencies.length; i++) { 
			if(classObj.dependencies[i]._type == 'Implementation') {
				if(firstClass){
					source += "implements "+ classObj.dependencies[i]._name + " ";
					firstClass = false;
				}
				else {
					source += "," + classObj.dependencies[i]._name + " ";
				}				
			}
		}
		// ritorno la stringa del codice Java: i.e. public class X extends Y implements Z ,W
		return source;
	}; // fine funzione CodeElementJava(classObj)

	CoderClass.codeElementJavascript = function(classObj) {
		var source = "function " + classObj._name + "(";
		if(classObj.constructorList){
			for (var i=0; i<classObj.constructorList.length; i++) {
				source += classObj.constructorList[i];
				if(i!=classObj.constructorList.length-1) {
					source += ",";
				}
			}
		}
		source += ")";

		

		return source;
	};


module.exports= CoderClass;