/**
 *	@file Contiene test per CoderOperation
 *	@author Sanna Giovanni - KaleidosCode
 *
 *	@requires ./../CoderElement/coderOperation.js
 */

var coderOperation = require('./../CoderElement/coderOperation.js');


/** ---------------- TEST DI UNITÀ ----------------- */
/** Crea tre oggetti che rappresentano un metodo/funzione e ognuno di essi viene 
 *  usato come parametro di input per le due funzioni statiche di CoderOperation, 'codeElementJava(operationObj)' e
 *  codeElementJavascript(operationObj), le quali restuiscono la stringa  del codice sorgente, in Java o Javascript, corrispondente all'
 *  intestazione del metodo/funzione in input.
  */

/** oggetto contenente le informazioni necessarie a codificare l'intestazione di un metodo/funzione. */
var operationObj1 = {
				_name : "getInfo",
				_visibility : "public",
				returnType : "T",
				isStatic : true,
				isAbstract : true,
				isFinal : true
};

/** oggetto contenente le informazioni necessarie a codificare l'intestazione di un metodo/funzione. */
var operationObj2 = {
				_name : "getInfo",
				_visibility : "private",
				returnType : "T",
				isStatic : false,
				isAbstract : true,
				isFinal : true
};			

/** oggetto contenente le informazioni necessarie a codificare l'intestazione di un metodo/funzione. */
var operationObj3 = {
				_name : "getInfo",
				_visibility : "public",
				returnType : "T",
				isStatic : false,
				isAbstract : true,
				isFinal : true
};

/** viene chiamata la funzione statica di CoderOperation che traduce l'oggetto in input
* nella corrispondente stringa, del codice sorgente in linguaggio Java, relativa all'intestazione del
* metodo/funzione in input. 
*/
console.log("Risultato funzione codeElementJava(operationObj)");
console.log(coderOperation.codeElementJava(operationObj1, "className"));
console.log(coderOperation.codeElementJava(operationObj2));
console.log(coderOperation.codeElementJava(operationObj3));
console.log("");

/** viene chiamata la funzione statica di CoderOperation che traduce l'oggetto in input
* nella corrispondente stringa, del codice sorgente in linguaggio Javascript, relativa all'intestazione del
* metodo/funzione in input. 
*/
console.log("Risultato funzione codeElementJavascript(operationObj)");
console.log(coderOperation.codeElementJavascript(operationObj1, "className"));
console.log(coderOperation.codeElementJavascript(operationObj2));
console.log(coderOperation.codeElementJavascript(operationObj3));
console.log("");