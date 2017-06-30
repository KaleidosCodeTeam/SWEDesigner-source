
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
*	@function getNameById
*	@param {!String} classId - Stringa identificativa della classe di cui si vuole ottenere il nome.
*	@param {!Object} parsedProgram - Oggetto che contiene l'array di tutti gli oggetti che rappresentano una classe.
*	@return {String} - Nome della classe corrispondente al classId di input. 
*	@description funzione che ritorna il nome della classe corrispondente al classId di input.
*/
function getNameById(classId, parsedProgram) {
	var classesArray = parsedProgram.classes.classesArray;
	for(var i=0; i<classesArray.length; i++) {
		var items = classesArray[i].items;
		for(var j=0; j<items.length; j++) {
			if(items[j].id == classId) {
				return items[j].values._name;
			}
		}		
	}
	return undefined;
}

/**
*	@function CoderClass.codeParentJava
*	@static
*	@public
*	@param {!String} sourceId - Oggetto che contiene le informazioni necessarie a codificare una classe
*	@param {!Object} parsedProgram - Oggetto che contiene le informazioni necessarie a codificare un programma.
*	@return {String} source - Stringa del codice sorgente, in Java, relativo alle specifiche di estensione della classe di input
*	@description funzione statica di CoderClass; codifica, in Java, le specifiche di estensione della classe di identificativo @sourceId, 
*	contenuta in @parsedProgram.
*/
CoderClass.codeParentJava = function(sourceId, parsedProgram) {
	source = "";
	finded = false;
	relationshipsArray = parsedProgram.classes.relationshipsArray;
	for(var i=0; i<relationshipsArray.length && !finded; i++) { 
		var items = relationshipsArray[i].items;
		for(var j=0; j<items.length && !finded; j++) {
			if(items[j].type == 'classDiagram.items.Generalization' && items[j].source.id == sourceId) {
				finded = true;
				targetId = items[j].target.id;
				source += "extends "+ getNameById(targetId,parsedProgram) + " ";
			}
		}
		
	}
	return source;
}

/**
*	@function CoderClass.codeParentJavascript
*	@static
*	@public
*	@param {!String} sourceId - Oggetto che contiene le informazioni necessarie a codificare una classe
*	@param {!Object} parsedProgram - Oggetto che contiene le informazioni necessarie a codificare un programma.
*	@return {String} source - Stringa del codice sorgente, in Javascript, relativo alle specifiche di estensione della classe di input
*	@description funzione statica di CoderClass; codifica, in Javascript, le specifiche di estensione della classe di identificativo @sourceId, 
*	contenuta in @parsedProgram.
*/
CoderClass.codeParentJavascript = function(sourceId, parsedProgram) {
	source = "";
	finded = false;
	relationshipsArray = parsedProgram.classes.relationshipsArray;
	for(var i=0; i<relationshipsArray.length && !finded; i++) { 
		var items =relationshipsArray[i].items;
		for(var j=0; j<items.length && !finded; j++) {
			if(items[j].type == 'classDiagram.items.Generalization' && items[j].source.id == sourceId) {
				finded = true;
				targetId = items[j].target.id;
				// bisogna aggiungere un costruttore corretto; dipende dalla struttura dell'oggetto
				source += getNameById(sourceId,parsedProgram) + ".prototype = new " + getNameById(targetId,parsedProgram) + "();\n ";
				source += getNameById(sourceId,parsedProgram) + ".prototype.constructor = " + getNameById(sourceId,parsedProgram) + "; \n";
			}
		}		
	}
	return source;
}

/**
*	@function CoderClass.codeElementJava
*	@static
*	@public
*	@param {!Object} classObj - Oggetto che contiene le informazioni necessarie a codificare una classe.
*	@param {!Object} parsedProgram - Oggetto che contiene le informazioni necessarie a codificare un programma.
*	@return {String} source - stringa del codice sorgente, in Java, dell'intestazione della classe classObj di input.
*	@description funzione statica di CoderClass; riceve in input classObj, un oggetto che rappresenta una  
*	classe; restituisce la stringa del codice sorgente, in Java, dell'intestazione della classe classObj di input; 
*	contenuta in parsedProgram.
*/
CoderClass.codeElementJava = function(classObj, parsedProgram) {
	var source = "";

	// visibilità della classe
	if(classObj.values._visibility != 'package') {
		source += classObj.values._visibility+" ";
	}

	// se la classe è astratta si aggiunge la relativa keyword
	if(classObj.values.isAbstract == "true") {
		source += "abstract ";
	}

	if(classObj.values.isStatic == "true") {
		source += "static ";
	}

	if(classObj.values.isFinal == "true") {
		source += "final ";
	}

	// se la classe è un'interfaccia si aggiunge la relativa keyword, altrimenti si aggiunge la keyword 'class'
	// NOTA: nessun controllo d'errore nel caso la classe sia  marcata abstract ed interface  
	if(classObj.values.isInterface == "true") {
		source += "interface ";
	}
	else {
		source += "class ";
	}

	// si aggiunge il nome della classe
	source += classObj.values._name + " ";

	// si aggiunge la classe padre, se esiste
	// dependencies è la proprietà che contiene le dipendenze OUT della classe
	// NOTA: nessun controllo d'errore nel caso ci sia più di una classe padre
	source += CoderClass.codeParentJava(classObj.id, parsedProgram);

	// di aggiungono le interfacce che implementa
	// NOTA: nessun controllo d'errore nel caso la classe padre sia effettivamente un'interfaccia
	var firstClass = true;
	relationshipsArray = parsedProgram.classes.relationshipsArray;
	for(var i=0; i<relationshipsArray.length; i++) { 
		var items = relationshipsArray[i].items;
		for(var j=0; j<items.length; j++) {
			if(items[j].type == 'classDiagram.items.Implementation' && items[j].source.id == classObj.id) {
				targetId = items[j].target.id;
				if(firstClass){
					source += "implements "+ getNameById(targetId,parsedProgram) + " ";
					firstClass = false;
				}
				else {
					source += "," + getNameById(targetId,parsedProgram) + " ";
				}				
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
	var source = "function " + classObj.values._name + "(";

	// constructorList : proprietà che contiene la lista dei parametri del costruttore
	//                   dell'oggetto.
	if(classObj.values.constructorList){
		for (var i=0; i<classObj.values.constructorList.length; i++) {
			source += classObj.values.constructorList[i];
			if(i!=classObj.values.constructorList.length-1) {
				source += ",";
			}
		}
	}
	source += ")";	
	return source;
};

/** Esportazione del modulo */
module.exports= CoderClass;