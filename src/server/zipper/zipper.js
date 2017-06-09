/**
 *	@file Contiene Zipper
 *	@author Pezzuto Francesco - KaleidosCode
 *
 *	@requires fs
 *	@requires archiver
 */

var fs=require('fs');
var archiver=require('archiver');

/** @namespace */
var Zipper = {
	/**
	 *	@callback zipCallback
	 *	@param {?string} err - Contiene l'eventuale stringa di errore.
	 */
	/**
	 *	@public
	 *	@function Zipper.zip
	 *	@param {!string} name - Il nome dell'archivio da creare.
	 *	@param {!string} path - Il percorso alla directory del progetto da comprimere.
	 *	@param {!zipCallback} callback - Callback di risposta.
	 *	@summary Comprime la directory passata in input in un file .zip.
	 */
	zip: function(name, path, callback) {
		var output=fs.createWriteStream(name+'.zip');
		var archive=archiver('zip');
		output.on('close', function() {
			console.log(archive.pointer()+' total bytes');
			console.log('archiver has been finalized and the output file descriptor has closed');
			callback();
		});
		archive.on('error', function(err) {
			callback(err);
		});
		archive.pipe(output);
		archive.directory(path, name);
		archive.finalize();
	}
};

/** Esportazione del modulo */
module.exports=Zipper;