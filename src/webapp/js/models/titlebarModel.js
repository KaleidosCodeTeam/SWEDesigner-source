define ([
    'jquery',
    'underscore',
    'backbone',
    'joint',
], function ($, _, Backbone, joint) {
	var titlebarModel = Backbone.Model.extend({
		initialize: function() {
		},
        newProject: function() {
        },
        /*openProject: function() {

        },*/
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
