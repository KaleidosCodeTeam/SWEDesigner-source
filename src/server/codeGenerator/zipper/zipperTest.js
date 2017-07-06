/*
 *	@file Contiene test per Zipper
 *	@author Pezzuto Francesco - KaleidosCode
 *
 *	@requires fs
 *	@requires ./zipper.js
 */

var fs=require('fs');
var Zipper=require('./zipper.js');

/* ---------------- TEST DI UNITÀ ----------------- */
/* Data il path di una directory esistente, chiama lo Zipper per comprimerla. */

var name='ZipperTest';
var path=__dirname+'/ZipperTest';	// !!!!!!!! DA CAMBIARE !!!!!!!!
Zipper.zip(name, path, function(err) {
	if (err) {
		console.log(err);
	}
	else {
		fs.unlink(path+'.zip', function(err) {
			if (err) console.error(err);
			else console.log('ZIPPER TEST: SUCCESS');
		});
	}
});