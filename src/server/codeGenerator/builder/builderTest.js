/**
 *	@file Contiene test per Builder
 *	@author Pezzuto Francesco - KaleidosCode
 *
 *	@requires fs
 *	@requires ./builder.js
 */

var fs=require('fs');
var Builder=require('./builder.js');	// !!!!!!!! DA CAMBIARE !!!!!!!!

/** ---------------- TEST DI UNITÀ ----------------- */
/** Crea un oggetto CodedProgram e chiama il Builder per la creazione dei file. */

/** @class Contiene del codice da scrivere su file */
function Class(name, source, pkg, file, dependencies) {
	this._name=name;
	this._source=source;
	this._package=pkg;
	this._file=file;
	this._dependencies=dependencies;
}
/** @class Contiene il programma da creare */
function CodedProgram() {
	this._classes = new Array();
	this.add = function(cl) {
		this._classes[this._classes.length]=cl;
	}
}
/** Creazione di oggetti Class */

/** 'tree' e 'iterator' sono classi appartenenti allo stesso package */
/** 'tree' e 'iterator' sono classi appartenenti allo stesso file 'Tree' */
var tree=new Class('Tree', 'public class Tree {}', 'BuilderTest.Tree', 'Tree', []);
var iterator=new Class('Iterator', 'public class Iterator {}', 'BuilderTest.Tree', 'Tree', []);

/** Classe 'emptyTree' */
var emptyTree=new Class('EmptyTree', 'public class EmptyTree {}', 'BuilderTest.EmptyTree', 'EmptyTree', ['BuilderTest.Tree.*', 'BuilderTest.TreeImpl.TreeImpl']);

/** 'treeImpl', 'printTreeImpl' e 'utilityTreeImpl' sono classi appartenenti allo stesso package */
/** 'treeImpl', 'printTreeImpl' sono classi appartenenti allo stesso file */
var treeImpl=new Class('TreeImpl', 'public class TreeImpl {}', 'BuilderTest.TreeImpl', 'TreeImpl', ['BuilderTest.Tree.*', 'BuilderTest.EmptyTree.EmptyTree']);
var printTreeImpl=new Class('PrintTreeImpl', 'public class PrintTreeImpl {}', 'BuilderTest.TreeImpl', 'TreeImpl', ['BuilderTest.Tree.*', 'BuilderTest.EmptyTree.EmptyTree']);
var utilityTreeImpl=new Class('UtilityTreeImpl', 'public class UtilityTreeImpl {}', 'BuilderTest.TreeImpl', 'UtilityTreeImpl', []);

/** Classe 'main' */
var main=new Class('main', 'public class Test {\n\tpublic static void main(String[] args) {}\n}', 'BuilderTest', 'main', ['BuilderTest.Tree.*', 'BuilderTest.TreeImpl.TreeImpl']);

/** Costruzione programma da creare */
var prog=new CodedProgram();
prog.add(tree);
prog.add(iterator);
prog.add(emptyTree);
prog.add(treeImpl);
prog.add(printTreeImpl);
prog.add(utilityTreeImpl);
prog.add(main);

/** Chiamata a Builder */
Builder.javaBuild(prog);

/** Eliminazione della directory del progetto creato */
path=__dirname+'/BuilderTest_JavaCode';	// !!!!!!!! DA CAMBIARE !!!!!!!!
function deleteFolderRecursive(path) {
			if (fs.existsSync(path)) {
				fs.readdirSync(path).forEach(function(file, index) {
					var curPath=path+'/'+file;
					if (fs.lstatSync(curPath).isDirectory()) {
						deleteFolderRecursive(curPath);
					} else {
						fs.unlinkSync(curPath);
					}
				});
				fs.rmdirSync(path);
			}
		
}
deleteFolderRecursive(path);

/** Chiamata a Builder */
Builder.javascriptBuild(prog);

/** Eliminazione della directory del progetto creato */
path=__dirname+'/BuilderTest_JavascriptCode';	// !!!!!!!! DA CAMBIARE !!!!!!!!
function deleteFolderRecursive(path) {
			if (fs.existsSync(path)) {
				fs.readdirSync(path).forEach(function(file, index) {
					var curPath=path+'/'+file;
					if (fs.lstatSync(curPath).isDirectory()) {
						deleteFolderRecursive(curPath);
					} else {
						fs.unlinkSync(curPath);
					}
				});
				fs.rmdirSync(path);
			}
		
}
deleteFolderRecursive(path);
console.log('BUILDER TEST: SUCCESS');