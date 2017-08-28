/**
 *	@file Contiene la classe CoderActivity
 *	@author Sanna Giovanni - KaleidosCode
 */

/** 
 *	@namespace
 *	@description Espone le funzionalità che permettono di codificare
 *	l'implementazione di una operazione in Java (CoderActivity.codeElementJava)
 *	o Javascript (CoderActivity.codeElementJavascipt), secondo le informazioni contenute 
 *  nell'oggetto di tipo ParsedActivity in input; entrambe le funzioni restituiscono la stringa del codice sorgente
 *	nel linguaggio scelto.
 */
var CoderActivity = function() {
	
};
/**
 *	@function CoderActivity.getBubbleLinks
 *	@param {!ParsedActivity} activityObj - Le informazioni necessarie a codificare l'implementazione di un'
 *	operazione.
 *	@return {ParsedBubbleLink[]} Le informazioni relative ai collegamenti fra tutti gli elementi di tipo ParsedBubble presenti
 *	nell'oggetto activityObj di input. 
 *	@description Estrae, per ogni ParsedBubble in activityObj, le informazioni relative al collegamento con un'atra bubble e
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
 *	@param {!string} bubbleId - Stringa identificativa della ParsedBubble che si vuole ottenere.
 *	@param {!ParsedActivity} activityObj - Le informazioni necessarie a codificare l'implementazione di un'
 *	operazione.
 *	@return {ParsedBubble} Le informazioni per codificare una bubble, il cui identificativo è bubbleId. Se
 *	tale bubble non fosse presente in activityObj, viene restituito il valore null.
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
 *	@param {!ParsedBubble} bubbleObj - Le informazioni necessarie a codificare una bubble.
 *	@param {!ParsedActivity} activityObj - Le informazioni necessarie a codificare l'implementazione di un'
 *	operazione.
 *	@return {ParsedBubble} Le informazioni per codificare una bubble, quella che in activityObj 
 *	è successiva alla bubbleObj di input; se non esiste, viene restituito il valore null. 
 *	@description Ritorna la ParsedBubble contenuta in activityObj, successiva alla bubbleObj di input.
 */
CoderActivity.getNextBubble = function(bubbleObj, activityObj) {
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
 *	@param {!ParsedBubble[]} bubbleArray - Le informazioni necessarie a codificare una parte 
 *	dell'implementazione di un' operazione.
 *	@return {ParsedBubbleStart} Le informazioni per codificare la bubble iniziale di bubbleArray;
 *	se non esiste, viene restituito il valore null. 
 *	@description Ritorna la ParsedBubbleStart contenuta in bubbleArray che rappresenta quella iniziale, da cui
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

//------------------------------------------------------------------- JAVACODERACTIVITY ---------------------------------------------------------------------------

/** 
 *	@namespace
 *	@description Espone le funzionalità che permettono di codificare
 *	l'implementazione di una operazione in Java (CoderActivity.codeElementJava)
 *	o Javascript (CoderActivity.codeElementJavascipt), secondo le informazioni contenute 
 *  nell'oggetto di tipo ParsedActivity in input; entrambe le funzioni restituiscono la stringa del codice sorgente
 *	nel linguaggio scelto.
 */
var JavaCoderActivity = function() {
	
};

/**
 *	@function CoderActivity.codeEmbeddedBubbles
 *	@param {!ParsedBubble} bubbleObj - Le informazioni necessarie a codificare una bubble.
 *	@param {!ParsedActivity} activityObj - Le informazioni necessarie a codificare l'implementazione di un'
 *	operazione.
 *	@param {!className} string - Nome della classe che possiede l'attività.
 *	@param {!operName} string - Nome del metodo/funzione relativo all'attività.
 *	@return {string} Il codice sorgente corrispondente alla bubbleObj di input, comprese le ParsedBubble innestate in essa. 
 *	@description Codifica la bubbleObj di input e tutte le ParsedBubble innestate in essa; tale bubbleObj dev'essere
 *	contenuta in activityObj.
 */
JavaCoderActivity.codeEmbeddedBubbles = function(bubbleObj, activityObj,className,operName) {
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
				source += JavaCoderActivity.codeBubble(nextBubble, activityObj, bubbleObj.id,className,operName);
				nextBubble = CoderActivity.getNextBubble(nextBubble, activityObj);
			}
		}
		else {
			throw "Nessuna classe iniziale trovata per le bubbles innestate in "+bubbleObj.type+" il metodo "+operName+" della classe "+className;
		}
	}

	return source;
}
/**
 *	@function CoderActivity.codeBubble
 *	@param {!ParsedBubble} bubbleObj - Le informazioni necessarie a codificare una bubble.
 *	@param {!ParsedActivity} activityObj - Le informazioni necessarie a codificare l'implementazione di un'
 *	operazione.
 *	@param {!className} string - Nome della classe che possiede l'attività.
 *	@param {!operName} string - Nome del metodo/funzione relativo all'attività.
 *	@return {string} Il codice sorgente corrispondente alla bubbleObj di input. 
 *	@description Codifica la bubbleObj di input; tale bubbleObj dev'essere contenuta in activityObj.
 */
JavaCoderActivity.codeBubble = function(bubbleObj, activityObj,className,operName) {
	var source = "";
	if(bubbleObj.type == "bubbleDiagram.items.bubbleIf") {
		source += "if(" + bubbleObj.values.condition + "){  \n  ";
		source += JavaCoderActivity.codeEmbeddedBubbles(bubbleObj, activityObj,className,operName);
		source += "}  \n  ";
	}
	else if(bubbleObj.type == "bubbleDiagram.items.bubbleElse") {
		source += "else {  \n  ";
		source += JavaCoderActivity.codeEmbeddedBubbles(bubbleObj, activityObj,className,operName);
		source += "}  \n  ";
	}
	else if(bubbleObj.type == "bubbleDiagram.items.bubbleFor") {
		source += "for(" + bubbleObj.values.initialization + ";" + bubbleObj.values.termination + ";" + bubbleObj.values.increment + ") {  \n ";
		source += JavaCoderActivity.codeEmbeddedBubbles(bubbleObj, activityObj,className,operName);
		source += "}  \n  ";
	}
	else if(bubbleObj.type == "bubbleDiagram.items.bubbleWhile") {
		source += "while(" + bubbleObj.values.condition + "){  \n  ";
		source += JavaCoderActivity.codeEmbeddedBubbles(bubbleObj, activityObj,className,operName);
		source += "}  \n  ";
	}
	else if(bubbleObj.type == "bubbleDiagram.items.customBubble") {
		source += bubbleObj.values.bubbleJavaCode.replace(/\n/g, " \n ") + "  \n  ";
		source += JavaCoderActivity.codeEmbeddedBubbles(bubbleObj, activityObj,className,operName);
	}
	else if(bubbleObj.type == "bubbleDiagram.items.bubbleReturn") {
		source += "return " + bubbleObj.values.value + ";  \n ";
	}
	else if(bubbleObj.type == "bubbleDiagram.items.bubbleDefinition") {
		source +=  bubbleObj.values._vType + " " + bubbleObj.values._name;
		if(bubbleObj.values._value != "") {
			source += " = " + bubbleObj.values._value;
		}
		source += ";  \n ";
	}
	else if(bubbleObj.type == "bubbleDiagram.items.bubbleAssignment") {
		source +=  bubbleObj.values._name + " = " + bubbleObj.values._value + "; \n ";
	}

	return source;
}
/**
 *	@function CoderClass.CoderActivity.codeElementJava
 *	@static
 *	@param {!ParsedActivity} activityObj - Le informazioni necessarie a codificare l'implementazione di un'
 *	operazione.
 *	@param {!className} string - Nome della classe che possiede l'attività.
 *	@param {!operName} string - Nome del metodo/funzione relativo all'attività.
 *	@return {string} Stringa del codice sorgente, in Java, dell'implementazione della operazione activityObj di input.
 *	@description Riceve in input activityObj, un oggetto che rappresenta l'implementazione di una operazione;  
 *	restituisce la stringa del codice sorgente, in Java, relativa all'implentazione dell'attività.
 */
JavaCoderActivity.codeElement = function(activityObj,className,operName) {
	var source = "";
	var startBubble = CoderActivity.getStartBubble(activityObj.items); // oggetto bubble
	if(startBubble == null) {
		throw "Nessuna classe iniziale trovata per il metodo "+operName+" della classe "+className;
	}
	var nextBubble = CoderActivity.getNextBubble(startBubble,activityObj.items);

	while(nextBubble) {
		source += JavaCoderActivity.codeBubble(nextBubble, activityObj.items,className,operName);
		nextBubble = CoderActivity.getNextBubble(nextBubble, activityObj.items);
	}

	return source;
};


//------------------------------------------------------------------- JAVASCRIPTCODERACTIVITY ---------------------------------------------------------------------------
/** 
 *	@namespace
 *	@description Espone le funzionalità che permettono di codificare
 *	l'implementazione di una operazione in Java (CoderActivity.codeElementJava)
 *	o Javascript (CoderActivity.codeElementJavascipt), secondo le informazioni contenute 
 *  nell'oggetto di tipo ParsedActivity in input; entrambe le funzioni restituiscono la stringa del codice sorgente
 *	nel linguaggio scelto.
 */
var JavascriptCoderActivity = function() {
	
};
/**
 *	@function CoderActivity.codeEmbeddedBubbles
 *	@param {!ParsedBubble} bubbleObj - Le informazioni necessarie a codificare una bubble.
 *	@param {!ParsedActivity} activityObj - Le informazioni necessarie a codificare l'implementazione di un'
 *	operazione.
 *	@param {!className} string - Nome della classe che possiede l'attività.
 *	@param {!operName} string - Nome del metodo/funzione relativo all'attività.
 *	@return {string} Il codice sorgente corrispondente alla bubbleObj di input, comprese le ParsedBubble innestate in essa. 
 *	@description Codifica la bubbleObj di input e tutte le ParsedBubble innestate in essa; tale bubbleObj dev'essere
 *	contenuta in activityObj.
 */
JavascriptCoderActivity.codeEmbeddedBubbles = function(bubbleObj, activityObj,className,operName) {
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
				source += JavascriptCoderActivity.codeBubble(nextBubble, activityObj,className,operName);
				nextBubble = CoderActivity.getNextBubble(nextBubble, activityObj);
			}
		}
		else {
			throw "Nessuna classe iniziale trovata per le bubbles innestate in "+bubbleObj.type+" il metodo "+operName+" della classe "+className;
		}
	}

	return source;
}
/**
 *	@function CoderActivity.codeBubble
  *	@param {!ParsedBubble} bubbleObj - Le informazioni necessarie a codificare una bubble.
 *	@param {!ParsedActivity} activityObj - Le informazioni necessarie a codificare l'implementazione di un'
 *	operazione.
 *	@param {!className} string - Nome della classe che possiede l'attività.
 *	@param {!operName} string - Nome del metodo/funzione relativo all'attività.
 *	@return {string} Il codice sorgente della bubbleObj di input. 
 *	@description Codifica la bubbleObj di input; tale bubbleObj dev'essere contenuta in activityObj.
 */
JavascriptCoderActivity.codeBubble = function(bubbleObj, activityObj,className,operName) {
	var source = "";
	if(bubbleObj.type == "bubbleDiagram.items.bubbleIf") {
		source += "if(" + bubbleObj.values.condition + "){  \n ";
		source += JavascriptCoderActivity.codeEmbeddedBubbles(bubbleObj, activityObj,className,operName);
		source += "} \n ";
	}
	else if(bubbleObj.type == "bubbleDiagram.items.bubbleElse") {
		source += "else {  \n ";
		source += JavascriptCoderActivity.codeEmbeddedBubbles(bubbleObj, activityObj,className,operName);
		source += "}  \n ";
	}
	else if(bubbleObj.type == "bubbleDiagram.items.bubbleFor") {
		source += "for(" + bubbleObj.values.initialization + ";" + bubbleObj.values.termination + ";" + bubbleObj.values.increment + ") {  \n ";
		source += JavascriptCoderActivity.codeEmbeddedBubbles(bubbleObj, activityObj,className,operName);
		source += "}  \n ";
	}
	else if(bubbleObj.type == "bubbleDiagram.items.bubbleWhile") {
		source += "while(" + bubbleObj.values.condition + "){  \n ";
		source += JavascriptCoderActivity.codeEmbeddedBubbles(bubbleObj, activityObj,className,operName);
		source += "} \n ";
	}
	else if(bubbleObj.type == "bubbleDiagram.items.customBubble") {
		source += bubbleObj.values.bubbleJSCode.replace(/\n/g, " \n ")  + " \n ";
		source += JavascriptCoderActivity.codeEmbeddedBubbles(bubbleObj, activityObj,className,operName);
	}
	else if(bubbleObj.type == "bubbleDiagram.items.bubbleReturn") {
		source += "return " + bubbleObj.values.value + ";  \n ";
	}
	else if(bubbleObj.type == "bubbleDiagram.items.bubbleDefinition") {
		source += "var " + bubbleObj.values._name;
		if(bubbleObj.values._value != "") {
			source += " = " + bubbleObj.values._value;
		}
		source += ";  \n ";
	}
	else if(bubbleObj.type == "bubbleDiagram.items.bubbleAssignment") {
		source +=  bubbleObj.values._name + " = " + bubbleObj.values._value + "; \n ";
	}

	return source;
}

/**
 *	@function CoderClass.CoderActivity.codeElementJavascript
 *	@static
 *	@param {!ParsedActivity} activityObj - Le informazioni necessarie a codificare l'implementazione di un'
 *	operazione.
 *	@param {!className} string - Nome della classe che possiede l'attività.
 *	@param {!operName} string - Nome del metodo/funzione relativo all'attività.
 *	@return {string} Stringa del codice sorgente, in Javascript, dell'implementazione della operazione activityObj di input.
 *	@description Riceve in input activityObj, un oggetto che rappresenta l'implementazione di una operazione;  
 *	restituisce la stringa del codice sorgente, in Javascript, relativa all'implentazione dell'attività.
 */
JavascriptCoderActivity.codeElement = function(activityObj,className,operName) {
	var source = "";
	var startBubble = CoderActivity.getStartBubble(activityObj); // oggetto bubble
	if(startBubble == null) {
		throw "Nessuna classe iniziale trovata per il metodo "+operName+" della classe "+className;
	}
	var nextBubble = CoderActivity.getNextBubble(startBubble,activityObj);

	while(nextBubble) {
		source += JavascriptCoderActivity.codeBubble(nextBubble, activityObj,className,operName);
		nextBubble = CoderActivity.getNextBubble(nextBubble, activityObj);
	}

	return source;
};
/** Esportazione del modulo */
module.exports = {
	codeElementJava : JavaCoderActivity.codeElement,
	codeElementJavascript : JavascriptCoderActivity.codeElement
};
