/**
 *	@file Contiene la classe statica CoderActivity
 *	@author Sanna Giovanni - KaleidosCode
 */

/** 
 *	@namespace
 *	@description Espone le funzionalità (statiche) che permettono di codificare
 *	l'implementazione di una operazione in Java (CoderActivity.codeElementJava)
 *	o Javascript (CoderActivity.codeElementJavascipt), secondo le informazioni contenute 
 *  nell'oggetto activityObj in input; entrambe le funzioni restituiscono la stringa del codice sorgente
 *	nel linguaggio scelto.
 */
var CoderActivity = function() {
	
};
/**
 *	@function CoderActivity.getBubbleLinks
 *	@param {!Object} activityObj - Le informazioni necessarie a codificare l'implementazione di un'
 *	operazione.ubble
 *	@return {Object[]} Le informazioni relative ai collegamenti fra tutti gli elementi 'bubble' presenti
 *	nell'oggetto activityObj di input. 
 *	@description Estrae, per ogni bubble in activityObj, le informazioni relative al collegamento con un'atra bubble e
 *  le inserisce in un array.
 */
CoderActivity.getBubbleLinks = function(activityObj) {
	var bubbleLinks = new Array();
	var count=0;
	for(var i=0; i<activityObj.length; i++) {
		if(activityObj[i].type == "bubbleDiagram.items.bubbleLink") {
			bubbleLinks[count] = activityObj[i];
			count++;
		}
	}
	return bubbleLinks;
}
/**
 *	@function CoderActivity.getBubbleById
 *	@param {!string} bubbleId - Stringa identificativa della bubble che si vuole ottenere.
 *	@param {!Object} activityObj - Le informazioni necessarie a codificare l'implementazione di un'
 *	operazione.
 *	@return {Object} Le informazioni per codificare una bubble, il cui identificativo è bubbleId. Se
 *	tale bubble non fosse presente in activityObj, viene restituito il valore null.
 *	@description Ritorna la bubble contenuta in activityObj, corrispondente al bubbleId di input.
 */
CoderActivity.getBubbleById = function(bubbleId, activityObj) {
	for(var i=0; i<activityObj.length; i++) {
		if(activityObj[i].id == bubbleId) {
			return activityObj[i];
		}
	}
	return null;
}
/**
 *	@function CoderActivity.getNextBubble
 *	@param {!Object} bubbleObj - Le informazioni necessarie a codificare una bubble.
 *	@param {!Object} activityObj - Le informazioni necessarie a codificare l'implementazione di un'
 *	operazione.
 *	@return {Object} Le informazioni per codificare una bubble, quella che in activityObj 
 	è successiva alla bubbleObj di input; se non esiste, viene restituito il valore null. 
 *	@description Ritorna la bubble contenuta in activityObj, successiva alla bubbleObj di input.
 */
CoderActivity.getNextBubble = function(bubbleObj,activityObj) {
	var bubbleLinks = CoderActivity.getBubbleLinks(activityObj);
	for(var i=0; i<bubbleLinks.length; i++) {
		if(bubbleLinks[i].source.id == bubbleObj.id) {
			var nextBubbleId = bubbleLinks[i].target.id;
			var nextBubble = CoderActivity.getBubbleById(nextBubbleId,activityObj);
			return nextBubble;
		}
	}
	return null;
}
/**
 *	@function CoderActivity.getStartBubble
 *	@param {!string} parent - L'identificativo della bubble le cui bubble innestate sono quelle
 *	presenti in bubbleArray.
 *	@param {!Object} bubbleArray - Le informazioni necessarie a codificare una parte 
 *	dell'implementazione di un' operazione.
 *	@return {Object} Le informazioni per codificare la bubble iniziale di bubbleArray;
 *	se non esiste, viene restituito il valore null. 
 *	@description Ritorna la bubble contenuta in bubbleArray che rappresenta quella iniziale, da cui
 *	comincia la sottoattività.
 */
CoderActivity.getStartBubble = function(bubbleArray, parent) {
	for(var i=0; i<bubbleArray.length; i++) {
		if(bubbleArray[i].type == "bubbleDiagram.items.bubbleStart" && bubbleArray[i].parent==parent) {
			return bubbleArray[i];
		}
	}
	return null;
}
/**
 *	@function CoderActivity.codeEmbeddedBubbles
  *	@param {!Object} bubbleObj - Le informazioni necessarie a codificare una bubble.
 *	@param {!Object} activityObj - Le informazioni necessarie a codificare l'implementazione di un'
 *	operazione.
 *	@return {string} Il codice sorgente corrispondente alla bubbleObj di input, comprese le bubble innestate in essa. 
 *	@description Codifica la bubbleObj di input e tutte le bubble innestate in essa; tale bubbleObj dev'essere
 *	contenuta in activityObj.
 */
CoderActivity.codeEmbeddedBubbles = function(bubbleObj, activityObj) {
	source = "";
	var EmbeddedBubbles = new Array();
	var count = 0;
	if(bubbleObj.embeds != undefined) {
		for(var i=0; i<bubbleObj.embeds.length; i++) {
			EmbeddedBubbles[count] = CoderActivity.getBubbleById(bubbleObj.embeds[i], activityObj);
			count++;
		}
		var startBubble = CoderActivity.getStartBubble(EmbeddedBubbles, bubbleObj.id); 
		if(startBubble) {
			var nextBubble = CoderActivity.getNextBubble(startBubble, activityObj);
			while(nextBubble) {
				source += CoderActivity.codeBubble(nextBubble, activityObj, bubbleObj.id);
				nextBubble = CoderActivity.getNextBubble(nextBubble, activityObj);
			}
		}
	}

	return source;
}
/**
 *	@function CoderActivity.codeBubble
  *	@param {!Object} bubbleObj - Le informazioni necessarie a codificare una bubble.
 *	@param {!Object} activityObj - Le informazioni necessarie a codificare l'implementazione di un'
 *	operazione.
 *	@param {!string} parent - L'identificativo della bubble padre della bubbleObj di input (innestata).
 *	@return {string} Il codice sorgente della bubbleObj di input. 
 *	@description Codifica la bubbleObj di input; tale bubbleObj dev'essere contenuta in activityObj.
 */
CoderActivity.codeBubble = function(bubbleObj, activityObj, parent) {
	var source = "";
	if(bubbleObj.type == "bubbleDiagram.items.bubbleIf") {
		source += "if(" + bubbleObj.values.condition + "){ \n";
		source += CoderActivity.codeEmbeddedBubbles(bubbleObj, activityObj);
		source += "}\n";
	}
	else if(bubbleObj.type == "bubbleDiagram.items.bubbleElse") {
		source += "else { \n";
		source += CoderActivity.codeEmbeddedBubbles(bubbleObj, activityObj);
		source += "} \n";
	}
	else if(bubbleObj.type == "bubbleDiagram.items.bubbleFor") {
		source += "for(" + bubbleObj.values.initialization + ";" + bubbleObj.values.termination + ";" + bubbleObj.values.increment + ") { \n";
		source += CoderActivity.codeEmbeddedBubbles(bubbleObj, activityObj);
		source += "} \n";
	}
	else if(bubbleObj.type == "bubbleDiagram.items.bubbleWhile") {
		source += "while(" + bubbleObj.values.condition + "){ \n";
		source += CoderActivity.codeEmbeddedBubbles(bubbleObj, activityObj);
		source += "}\n";
	}
	else if(bubbleObj.type == "bubbleDiagram.items.customBubble") {
		source += bubbleObj.values.bubbleCode + "\n";
		source += CoderActivity.codeEmbeddedBubbles(bubbleObj, activityObj);
	}
	else if(bubbleObj.type == "bubbleDiagram.items.bubbleReturn") {
		source += "return " + bubbleObj.values.value + "; \n";
	}

	return source;
}
/**
 *	@function CoderClass.CoderActivity.codeElementJava
 *	@static
 *	@param {!Object} activityObj - Le informazioni necessarie a codificare l'implementazione di un'
 *	operazione.
 *	@return {string} Stringa del codice sorgente, in Java, dell'implementazione della operazione activityObj di input.
 *	@description Riceve in input activityObj, un oggetto che rappresenta l'implementazione di una operazione;  
 *	restituisce la stringa del codice sorgente, in Java, relativa all'implentazione dell'attività.
 */
CoderActivity.codeElementJava = function(activityObj) {
	var source = "";
	var startBubble = CoderActivity.getStartBubble(activityObj.items); // oggetto bubble
	if(startBubble == null) {
		throw "Nessuna classe iniziale trovata per il metodo "+ activityObj.id;
	}
	var nextBubble = CoderActivity.getNextBubble(startBubble,activityObj.items);

	while(nextBubble) {
		source += CoderActivity.codeBubble(nextBubble, activityObj.items);
		nextBubble = CoderActivity.getNextBubble(nextBubble, activityObj.items);
	}

	return source;
};
/**
 *	@function CoderClass.CoderActivity.codeElementJavascript
 *	@static
 *	@param {!Object} activityObj - Le informazioni necessarie a codificare l'implementazione di un'
 *	operazione.
 *	@return {string} Stringa del codice sorgente, in Javascript, dell'implementazione della operazione activityObj di input.
 *	@description Riceve in input activityObj, un oggetto che rappresenta l'implementazione di una operazione;  
 *	restituisce la stringa del codice sorgente, in Javascript, relativa all'implentazione dell'attività.
 */
CoderActivity.codeElementJavascript = function(activityObj) {
	var source = "";
	var startBubble = CoderActivity.getStartBubble(activityObj); // oggetto bubble
	if(startBubble == null) {
		throw "Nessuna classe iniziale trovata per il metodo ";
	}
	var nextBubble = CoderActivity.getNextBubble(startBubble,activityObj);

	while(nextBubble) {
		source += CoderActivity.codeBubble(nextBubble, activityObj);
		nextBubble = CoderActivity.getNextBubble(nextBubble, activityObj);
	}

	return source;
};
/** Esportazione del modulo */
module.exports = CoderActivity;