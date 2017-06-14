
/**
 *	@module Contiene CoderAttribute
 *	@author Sanna Giovanni - KaleidosCode
 *	@summary Espone le funzionalità per codificare l'intestazione di una classe in Java o Javascript
 */

/** 
*	@namespace
*	@description oggetto che espone le funzionalità (statiche) che permettono di codificare
*	l'intestazione di una classe, rappresentata dall'oggetto classObj in input, in Java (CoderClass.codeElementJava)
*	o Javascript (CoderClass.codeElementJavascipt); entrambe le funzioni restituiscono la stringa del codice 
*	sorgente, relativa all'intestazione della classe, nel linguaggio scelto.
*	Inoltre espone due funzionalità di utilità che permettono di codificare, in Java (CoderClass.codeParentJava) o 
*	Javascript (CoderClass.codeParentJava) la parte della classe relativa alla specifica di estensione.
*/
var CoderClass = function() {
	
}

/**
*	@function CoderClass.codeParentJava
*	@static
*	@public
*	@param {!Object} classObj - Oggetto che contiene le informazioni necessarie a codificare una classe
*	@return {String} source - Stringa del codice sorgente, in Java, relativo alle specifiche di estensione della classe di input
*	@description funzione statica di CoderClass; riceve in input classObj, un oggetto che rappresenta una 
*	classe; restituisce la stringa del codice sorgente, in Java, della parte di intestazione relativa alle specifiche
*	di estensione.
*/
CoderClass.codeParentJava = function(classObj) {
	source = "";
	for(var i=0; i<classObj.dependencies.length; i++) { 
		if(classObj.dependencies[i]._type == 'Generalization') {
			source += "extends "+ classObj.dependencies[i]._name + " ";
		}
	}
	return source;
}

/**
*	@function CoderClass.codeParentJavascript
*	@static
*	@public
*	@param {!Object} classObj - Oggetto che contiene le informazioni necessarie a codificare una classe
*	@return {String} source - Stringa del codice sorgente, in Javascript, relativo alle specifiche di estensione della classe di input
*	@description funzione statica di CoderClass; riceve in input classObj, un oggetto che rappresenta una 
*	classe; restituisce la stringa del codice sorgente, in Javascript, della parte di intestazione relativa alle specifiche
*	di estensione.
*/
CoderClass.codeParentJavascript = function(classObj) {
	source = "";
	for(var i=0; i<classObj.dependencies.length; i++) { 
		if(classObj.dependencies[i]._type == 'Generalization') {
			// bisogna aggiungere un costruttore corretto; dipende dalla struttura dell'oggetto
			source += classObj._name + ".prototype = new " + classObj.dependencies[i]._name + "();\n ";
			source += classObj._name + ".prototype.constructor = " + classObj._name;
		}
	}
	return source;
}

/**
*	@function CoderClass.codeElementJava
*	@static
*	@public
*	@param {!Object} classObj - Oggetto che contiene le informazioni necessarie a codificare una classe
*	@return {String} source - stringa del codice sorgente, in Java, dell'intestazione della classe classObj di input.
*	@description funzione statica di CoderClass; riceve in input classObj, un oggetto che rappresenta una  
*	classe; restituisce la stringa del codice sorgente, in Java, dell'intestazione della classe classObj di input.
*/
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
	source += CoderClass.codeParentJava(classObj);

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


/**
*	@function CoderClass.codeElementJavascript
*	@static
*	@public
*	@param {!Object} classObj - Oggetto che contiene le informazioni necessarie a codificare una classe
*	@return {String} source - stringa del codice sorgente, in Javascript, dell'intestazione della classe classObj di input.
*	@description funzione statica di CoderClass; riceve in input classObj, un oggetto che rappresenta una  
*	classe; restituisce la stringa del codice sorgente, in Javascript, relativa all'intestazione della classe classObj di input.
*/
CoderClass.codeElementJavascript = function(classObj) {
	var source = "function " + classObj._name + "(";

	// constructorList : proprietà che contiene la lista dei parametri del costruttore
	//                   dell'oggetto.
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

/** Esportazione del modulo */
module.exports= CoderClass;