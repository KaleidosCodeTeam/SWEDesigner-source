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
		el: 'titlebar',
		events: {
			'click new-project': 'this.model.newProject',
			//'click open-project': 'this.model.openProject',
			'click save-project': 'this.model.saveProject',
			'click save-poject-with-name': 'this.model.saveProjectWithName',
			'click close-project': 'this.model.closeProject', //MAYBE NOT
			'click undo': 'this.model.undo',
			'click redo': 'this.model.redo',
			'click zoom-in': 'this.model.zoomIn',
			'click zoom-out': 'this.model.zoomOut',
			'click upper-layer': 'this.model.upperLayer', //MAYBE NOT
			'click lower-layer': 'this.model.lowerLayer', //MAYBE NOT
			'click generate-java': 'this.model.generateJava',
			'click generate-js': 'this.model.generateJavascript',
			'click view-generated-code': 'this.model.viewGeneratedCode',
		},
		initialize: function() {
			this.model = new TitlebarModel();
		},
		render: function() {
		},
	});
	return TitlebarView;
});