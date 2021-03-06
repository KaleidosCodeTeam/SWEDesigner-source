/*
 *	@file Contiene test per Parser
 *	@author  Bonato Enrico - KaleidosCode
 *
 *	@requires fs
 *	@requires ./parser.js
 *	@requires json-fn
 */
var JSONfn = require('json-fn');
var fs = require('fs');
var Parser = require('./../parser.js');	
/* ---------------- TEST DI UNITÀ ----------------- */
/* Esegue il test su tutti i file json contenuti sella cartella JsonTest, chiama il parser per ottenere gli oggetti */

const testFolder = './JsonTest/';       
console.log("\n *STARTING* \n");
var diagrams;
var files=[];
files = fs.readdirSync(testFolder);
console.log(files);
var lung=files.length;
var superati=0;
for (var i = 0; i < lung; i++) {
    console.log("\n Test file "+(i+1)+" di "+lung );
    element = files[i];
    var leggi=require(testFolder+element);
    var tutto = Parser.parse(JSONfn.stringify(leggi));    
    if(tutto){
        console.log(' Parser Test: SUCCESS');
        superati++;
    }
    else{
        console.log(' Parser Test: FAILED');
    }
}
console.log('\n Superati '+superati+' test su '+lung);
