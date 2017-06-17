define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
    'js/models/DAOclient'
], function ($, _, Backbone, joint, DAOclient) {
	var titlebarModel = Backbone.Model.extend({
        projModel: {},
		initialize: function(param) {
		    this.projModel = param.model;
		},
        newProject: function() {
		    console.log('newProject clicked [model]');
        },
        openProject: function() {
            DAOclient.openProject()
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
