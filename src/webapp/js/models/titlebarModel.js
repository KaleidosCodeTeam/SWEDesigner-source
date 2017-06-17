define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'jsonfn'
], function ($, _, Backbone, joint, jsonfn) {
	var titlebarModel = Backbone.Model.extend({
        projModel: {},
		initialize: function(param) {
		    this.projModel = param.model;
		},
        newProject: function() {
		    console.log('newProject clicked [model]');
        },
        openProject: function() {
            myFile = document.getElementById("selectedFile").files[0];
            var myFileRead = {};
            var reader = new FileReader();
            onloadFunction = function(event) {
                myFileRead = event.target.result;
                this.projModel.project.projectPkgDiagram = jsonfn.parse(myFileRead);
                this.projModel.project.currentGraph = this.projModel.project.projectPkgDiagram;
                console.log('project loaded');
            };
            reader.onload = onloadFunction(event);
            reader.readAsText(myFile);
        },
        saveProject: function() {
        },
        saveProjectWithName: function() {
        },
        closeProject: function() { //MAYBE NOT
        },
        undo: function() {
        },
        redo: function() {
        },
        zoomIn: function() {
        },
        zoomOut: function() {
        },
        upperLayer: function() { //MAYBE NOT
        },
        lowerLayer: function() { //MAYBE NOT
        },
        generateJava: function() {
        },
        generateJavascript: function() {
        },
        viewGeneratedCode: function() { //MAYBE NOT
        }
	});
	return titlebarModel;
});
