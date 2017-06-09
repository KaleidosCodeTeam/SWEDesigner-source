


function CodedProgram() {
	this._classes = new Array();

	this.add = function(_class) {
		this._classes[this._classes.length] = _class;
	}

	this. getSource = function(i) { return this._classes[i]._source; }
}

module.exports = CodedProgram;