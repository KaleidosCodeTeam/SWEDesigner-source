/**
 *	@file Contiene Builder
 *	@author Pezzuto Francesco - KaleidosCode
 *
 *	@requires mkdirp
 *	@requires fs
 *	@requires ./zipper.js
 */

var mkdirp=require('mkdirp');
var fs=require('fs');
var Zipper=require('./zipper.js');		// !!!!!!!! DA CAMBIARE !!!!!!!!

/** @namespace */
var Builder = (function() {
	var _private = {
		/** 
		 *	@var {string} Builder.generalPath - Contiene il path alla directory dove vengono creati tutti i programmi (directories, file sorgenti, ...).
		 *	@private
		 */
		generalPath : __dirname+'/',	// !!!!!!!! DA CAMBIARE !!!!!!!!
		/**
		 *	@function Builder.deleteFolderRecursive
		 *	@param {!string} path - Il percorso alla directory da rimuovere.
		 *	@summary Rimuove la directory passata in input se esistente e tutto il suo contenuto ricorsivamente.
		 *	@private
		 *	@throws fs exceptions.
		 */
		deleteFolderRecursive : function(path) {
			if (fs.existsSync(path)) {
				fs.readdirSync(path).forEach(function(file, index) {
					var curPath=path+'/'+file;
					if (fs.lstatSync(curPath).isDirectory()) {
						_private.deleteFolderRecursive(curPath);
					} else {
						fs.unlinkSync(curPath);
					}
				});
				fs.rmdirSync(path);
			}
		},
		/**
		 *	@function Builder.mkFile
		 *	@param {!string} name - Il nome del file.
		 *	@param {!string} pkg - Il package del file.
		 *	@param {!string[]} dependencies - L'array delle dipendenze del package.
		 *	@param {!string} source - Il codice sorgente da scrivere nel file.
		 *	@summary Crea un file sorgente e/o scrive ulteriore codice in append se già esistente.
		 *	@private
		 *	@throws fs exceptions.
		 */
		mkFile : function(name, pkg, dependencies, source) {
			console.log('In mkFile');
			var path=_private.generalPath+pkg.replace(/\./g, '/')+'/';
			var filePath=path+name+'.java';
			console.log('path: '+path+'\nfilePath: '+filePath+'\n');
			if (!fs.existsSync(filePath)) {
				mkdirp.sync(path);
				console.log('Directory created');
				/** SCRIVE il nome del package, le dipendenze ed il codice sorgente nel nuovo file. */
				var str='package '+pkg+';\n';
				for (var i=0; i<dependencies.length; ++i) {
					str=str+'import '+dependencies[i]+';\n';
				}
				str=str+source;
				fs.writeFileSync(filePath, str);
			} else {
				/** SCRIVE il codice sorgente in append nel file già esistente. */
				fs.appendFileSync(filePath, '\n'+source);
			}
		}
	};
	return {
		/**
		 *	@function Builder.build
		 *	@param {!CodedProgram} program - L'oggetto generato da CodedProgram, contente le informazioni necessarie alla creazione di file e directory.
		 *	@summary Crea directory e file del progetto passato in input dal package CodedProgram ed invoca il metodo zip della classe Zipper.
		 *	@throws fs exceptions.
		 *	@throws Zipper exceptions.
		 *	@throws {NO_FILES_TO_BUILD} Se non ci sono file da creare.
		 */
		build : function(program) {
			/**
			 *	@function
			 *	@return Stringa contenente il nome della directory principale del programma da creare.
			 *	@ignore
			 */
			programDirectory=(function() {
				if (program._classes.length>0) {
					var pkgName=program._classes[0]._package;
					var index=pkgName.indexOf('.');
					var dir=pkgName;
					if (index!=-1) {
						dir=pkgName.substr(0, index);
					}
					return dir;
				}
				return '';
			}());
			if (programDirectory==='') {
				throw 'NO_FILES_TO_BUILD';
			} else {
				var programPath=_private.generalPath+programDirectory;
				_private.deleteFolderRecursive(programPath);
				for (var i=0; i<program._classes.length; ++i) {
					var fileName=program._classes[i]._name;
					var filePkg=program._classes[i]._package;
					var fileDep=program._classes[i]._dependencies;
					var fileSrcCode=program._classes[i]._source;
					_private.mkFile(fileName, filePkg, fileDep, fileSrcCode);
				}
				/* // COMMENTARE CHIAMATA A 'zip' PER EFFETTUARE TEST DI UNITÀ
				Zipper.zip(programDirectory, programPath, function(err) {
					if (err) throw err;
					else console.log('PROGRAM CREATION: DONE');
				});
				*/
			}
		}
	};
}());

/** Esportazione del modulo */
module.exports=Builder;