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
            this.projModel = param.projModel;
            console.log(this.projModel);
		},
        newProject: function() {
		    console.log('newProject clicked [model]');
        },
        openProject: function() {
            console.log('titleBarModel openProj ='+this.projModel);
            DAOclient.openProject(this.projModel);
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
