/**
 *	@file Contiene test per CoderClass
 *	@author Sanna Giovanni - KaleidosCode
 *
 *	@requires ./../CoderElement/coderClass.js
 */

var coderClass = require('./../CoderElement/coderClass.js');

/** ---------------- TEST DI UNITÀ ----------------- */
/** Crea due oggetti che rappresentano una classe e ognuno di essi viene 
 *  usato come parametro di input per le due funzioni statiche di CoderClass, 'codeElementJava(classObj)' e
 *  codeElementJavascript(classObj), le quali restuiscono la stringa del codice sorgente, in Java o Javascript, corrispondente all'
 *  intestazione della classe in input.
  */

/** oggetto che rappresenta un classe da codificare */
var classObj1 = {
				_name : "A",
				_visibility : "public",
				isAbstract : true,
				isInterface : false,
				dependencies : [
					{
						_name : "B",
						_type : "Generalization"
					},
					{
						_name : "C",
						_type : "Implementation"
					},
					{
						_name : "D",
						_type : "Implementation"
					}
				]
};
;

/** oggetto che rappresenta un classe da codificare */
var classObj2 = {
				_name : "E",
				_visibility : "protected",
				isAbstract : false,
				isInterface : true,
				dependencies : [
					{
						_name : "F",
						_type : "Implementation"
					},
					{
						_name : "G",
						_type : "Implementation"
					}
				],
				constructorList : ["param1","param2","paramN"]
};

/** viene chiamata la funzione statica di CoderClass che traduce l'oggetto in input
* nella corrispondente stringa, del codice sorgente in linguaggio Java, relativa all'intestazione della
* classe in input. 
*/
console.log("Risultato funzione codeElementJava(classObj)");
console.log(coderClass.codeElementJava(classObj1));
console.log(coderClass.codeElementJava(classObj2));
console.log("");

/** viene chiamata la funzione statica di CoderClass che traduce l'oggetto in input
* nella corrispondente stringa, del codice sorgente in linguaggio Javascript, relativa all'intestazione della
* classe in input. 
*/
console.log("Risultato funzione codeElementJavascript(classObj)");
console.log(coderClass.codeElementJavascript(classObj1));
console.log(coderClass.codeElementJavascript(classObj2));
console.log("");

