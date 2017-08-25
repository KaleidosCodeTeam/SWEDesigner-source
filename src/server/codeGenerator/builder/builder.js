/**
 *	@file Contiene la classe statica Builder
 *	@author Pezzuto Francesco - KaleidosCode
 *
 *	@requires mkdirp
 *	@requires fs
 *  @requires ./../zipper/zipper.js
 *  @requires child_process
 */

var mkdirp=require('mkdirp');
var fs=require('fs');
var Zipper=require('../zipper/zipper.js');
var cp = require('child_process');

/** @namespace */
var Builder = (function() {
	var _private = {
		/** 
		 *	@var {string} Builder.generalPath - Contiene il path alla directory dove vengono creati tutti i programmi (directories, file sorgenti, ...).
		 *	@private
		 */
		generalPath : __dirname+'/../',	// !!!!!!!! DA CAMBIARE !!!!!!!!
		/**
		 *	@function Builder.mkJavaFile
		 *	@param {!string} progDir - La directory indicante dove creare i file sorgenti del programma.
		 *	@param {!string} name - Il nome del file.
		 *	@param {!string} pkg - Il package del file.
		 *	@param {!string[]} dependencies - L'array delle dipendenze del package.
		 *	@param {!string} source - Il codice sorgente da scrivere nel file.
		 *	@summary Crea un file sorgente e/o scrive ulteriore codice in append se già esistente.
		 *	@private
		 *	@throws fs exceptions.
		 */
		mkJavaFile : function(progDir, name, pkg, dependencies, source) {
			console.log('In mkJavaFile');
			var path=_private.generalPath+progDir+'/'+pkg.replace(/\./g, '/')+'/';
			var filePath=path+name+'.java';
			console.log('path: '+path+'\nfilePath: '+filePath+'\n');
			if (!fs.existsSync(filePath)) {
				mkdirp.sync(path);
				console.log('Directory created');
				/** SCRIVE il nome del package, le dipendenze ed il codice sorgente nel nuovo file. */
				var str='package '+progDir+"."+pkg+';\n';
				for (var i=0; i<dependencies.length; ++i) {
					console.log("****** "+dependencies[i].isLibrary+"  -  "+dependencies[i].name);
					if(dependencies[i].isLibrary==false){
						str=str+'import '+progDir+"."+dependencies[i].name+'.*;\n';
					}
					else {
						str=str+'import '+dependencies[i].name+'.*;\n';
					}
					
				}
				str=str+source;
				fs.writeFileSync(filePath, str);
			} else {
				/** SCRIVE il codice sorgente in append nel file già esistente. */
				fs.appendFileSync(filePath, '\n'+source);
			}
		},
		/**
		 *	@function Builder.mkJavascriptFile
		 *	@param {!string} progDir - La directory indicante dove creare i file sorgenti del programma.
		 *	@param {!string} name - Il nome del file.
		 *	@param {!string} pkg - Il package del file (identifica solamente la posizione del file all'interno delle directory del programma).
		 *	@param {!string} source - Il codice sorgente da scrivere nel file.
		 *	@summary Crea un file sorgente e/o scrive ulteriore codice in append se già esistente.
		 *	@private
		 *	@throws fs exceptions.
		 */
		mkJavascriptFile : function(progDir, name, pkg, source) {
			console.log('In mkJavascriptFile');
			var path=_private.generalPath+progDir+'/'+pkg.replace(/\./g, '/')+'/';
			var filePath=path+name+'.js';
			console.log('path: '+path+'\nfilePath: '+filePath+'\n');
			if (!fs.existsSync(filePath)) {
				mkdirp.sync(path);
				console.log('Directory created');
				/** SCRIVE il codice sorgente nel nuovo file. */
				fs.writeFileSync(filePath, source);
			} else {
				/** SCRIVE il codice sorgente in append nel file già esistente. */
				fs.appendFileSync(filePath, '\n'+source);
			}
		}
	};
	return {
		/**
		 *	@function Builder.javaBuild
		 *	@param {!CodedProgram} program - L'oggetto generato da CodedProgram, contente le informazioni necessarie alla creazione di file e directory.
		 *	@summary Crea directory e file del progetto passato in input dal package CodedProgram ed invoca il metodo zip della classe Zipper.
		 *	@throws fs exceptions.
		 *	@throws {NO_FILES_TO_BUILD} Se non ci sono file da creare.
		 */
		javaBuild : function(program) {
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
			var report = "ERRORI DI COMPILAZIONE: \n\n";
			if (programDirectory==='') {
				throw 'NO_FILES_TO_BUILD';
			} else {
				var filesPath = new Array();
				var count = 0;
				programDirectory=programDirectory+'_JavaCode';
				var programPath=_private.generalPath+programDirectory;
				for (var i=0; i<program._classes.length; ++i) {
					var fileName=program._classes[i]._name;
					var filePkg=program._classes[i]._package;
					var fileDep=program._classes[i]._dependencies;
					var fileSrcCode=program._classes[i]._source;
					_private.mkJavaFile(programDirectory, fileName, filePkg, fileDep, fileSrcCode);

					filesPath[count] = programDirectory+"/"+filePkg+"/"+fileName+".java";
					count++;
				}	
					/
				for(var j=0; j<filesPath.length;j++) {
					try {
						var currentDir = process.cwd();
						process.chdir(__dirname+"/../");
						var compile = cp.execFileSync('javac', [filesPath[j]]);
						process.chdir(currentDir);
					}
					catch(Error) {
						report += Error+"\n\n";
					}
				}	
				for(var w=0; w<filesPath.length;w++) {
					fs.unlinkSync(__dirname+"/../"+filesPath[w]);
				}	
				
				fs.writeFileSync(programPath+"/report.txt", report);
				return {
					progDirectory : programDirectory,
					progPath : programPath,			
				};
			}
		},
		/**
		 *	@function Builder.javascriptBuild
		 *	@param {!CodedProgram} program - L'oggetto generato da CodedProgram, contente le informazioni necessarie alla creazione di file e directory.
		 *	@summary Crea directory e file del progetto passato in input dal package CodedProgram ed invoca il metodo zip della classe Zipper.
		 *	@throws fs exceptions.
		 *	@throws {NO_FILES_TO_BUILD} Se non ci sono file da creare.
		 */
		javascriptBuild : function(program) {
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
				programDirectory=programDirectory+'_JavascriptCode';
				var programPath=_private.generalPath+programDirectory;
				for (var i=0; i<program._classes.length; ++i) {
					var fileName=program._classes[i]._name;
					var filePkg=program._classes[i]._package;
					var fileSrcCode=program._classes[i]._source;
					_private.mkJavascriptFile(programDirectory, fileName, filePkg, fileSrcCode);
				}
				return {
					progDirectory : programDirectory,
					progPath : programPath
				};				
			}
		}
	};
}());

/** Esportazione del modulo */
module.exports=Builder;