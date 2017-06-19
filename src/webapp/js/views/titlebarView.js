define ([
	'jquery',
	'underscore',
	'backbone',
	'joint',
	'js/models/titlebarModel'
	//'js/views/' riferimento alla view principale del progetto 
	/** ecc. */
], function ($, _, Backbone, joint, TitlebarModel) {
	var TitlebarView = Backbone.View.extend({
		el: 'body',
		events: {
			'click #openFileButton': 'openProject',
			'click #newProject': 'newProject',
			'click save-project': 'saveProject',
			'click save-project-with-name': 'this.model.saveProjectWithName',
			'click close-project': 'this.model.closeProject', //MAYBE NOT
			'click undo': 'this.model.undo',
			'click redo': 'this.model.redo',
			'click zoom-in': 'this.model.zoomIn',
			'click zoom-out': 'this.model.zoomOut',
			'click upper-layer': 'this.model.upperLayer', //MAYBE NOT
			'click lower-layer': 'this.model.lowerLayer', //MAYBE NOT
			'click generate-java': 'this.model.generateJava',
			'click generate-js': 'this.model.generateJavascript',
			'click view-generated-code': 'this.model.viewGeneratedCode'
		},
		initialize: function(param) {
			this.model = new TitlebarModel({projModel:param.model});
			this.parent = param.parent;
			this.projModel = param.model;
			//$('#newProject').click(this.model.newProject);
            //$('#openFileButton').click(this.model.openProject);
		},
		render: function() {
		},
		openProject: function (event) {
			console.log(event.currentTarget);
			this.model.openProject();
		},
        newProject: function (event) {
            console.log(event.currentTarget);
            this.model.newProject();
        },
        saveProject: function (event) {
            console.log(event.currentTarget);
            this.model.saveProject();
        }
	});
	return TitlebarView;
});
