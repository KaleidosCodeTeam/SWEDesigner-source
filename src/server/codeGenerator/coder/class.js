
function Class(name, source, pack, file, dependencies) {
	// nome della classe
	this._name = name;

	// codice sorgente della classe
	this._source = source;

	// package della classe (path completo)
	this._package = pack;

	// file in cui dev'essere inserita la classe 
	this._file = file;

	// array delle classi da cui dipende (path completo)
	this._dependencies = dependencies;
}


module.exports = Class;